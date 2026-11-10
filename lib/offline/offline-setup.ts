import { SITE_SETTINGS } from "@/content/site-settings";
import { mediaDownloadList, placeholderLinkCount, shellRoutes } from "./asset-list";
import { downloadAllMedia, missingMedia, pruneMedia } from "./media-cache";

/** What the kiosk knows about its offline readiness (shown on the kiosk status screen). */
export interface OfflineStatus {
  /** Service worker + Cache Storage available and running (production build). */
  active: boolean;
  /** Real media links (dummies excluded). */
  total: number;
  /** Of those, saved for offline use. */
  cached: number;
  /** Downloads that failed in the last run. */
  failed: number;
  /** The bucket refused the download (CORS not set for this site). */
  corsBlocked: boolean;
  /** Dummy / empty links that were skipped. */
  placeholders: number;
  /** Started offline with media still missing. */
  offlineMissing: boolean;
}

export const EMPTY_OFFLINE_STATUS: OfflineStatus = {
  active: false,
  total: 0,
  cached: 0,
  failed: 0,
  corsBlocked: false,
  placeholders: 0,
  offlineMissing: false,
};

const SHELL_CACHE = "byd-shell-v2"; // must match public/sw.js
const VERSION_KEY = "byd-content-version";
const SHELL_KEY = "byd-shell-ready";

export function offlineSupported(): boolean {
  return process.env.NODE_ENV === "production" && "serviceWorker" in navigator && "caches" in window;
}

/**
 * Development: remove a service worker left over from a production run on the same
 * address (it would otherwise keep answering requests), and its caches.
 */
export async function removeServiceWorker(): Promise<void> {
  if (!("serviceWorker" in navigator)) return;
  const regs = await navigator.serviceWorker.getRegistrations();
  await Promise.all(regs.map((r) => r.unregister()));
  if ("caches" in window) {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k.startsWith("byd-")).map((k) => caches.delete(k)));
  }
}

/** Registers /sw.js (scope /) and resolves once it controls this page (or after a timeout). */
export async function registerServiceWorker(timeoutMs = 15_000): Promise<boolean> {
  try {
    await navigator.serviceWorker.register("/sw.js", { scope: "/" });
  } catch {
    // Offline and the worker script can't be checked – an existing worker keeps running.
    return Boolean(navigator.serviceWorker.controller);
  }
  if (navigator.serviceWorker.controller) return true;
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve(Boolean(navigator.serviceWorker.controller)), timeoutMs);
    navigator.serviceWorker.addEventListener(
      "controllerchange",
      () => {
        clearTimeout(timer);
        resolve(true);
      },
      { once: true },
    );
  });
}

/**
 * Caches the whole app through the service worker: every page's HTML and RSC
 * payload, plus every script, stylesheet and font the HTML references.
 */
export async function warmShell(): Promise<void> {
  const files = new Set<string>();
  let fromManifest = false;
  // Every build file, including on-demand chunks (listed by app/offline-manifest.json).
  try {
    const manifest = (await (await fetch("/offline-manifest.json", { cache: "no-store" })).json()) as { assets?: string[] };
    for (const a of manifest.assets ?? []) files.add(a);
    fromManifest = (manifest.assets ?? []).some((a) => a.startsWith("/_next/static/"));
  } catch {
    // Fall back to the files the pages reference.
  }
  for (const route of shellRoutes()) {
    try {
      const html = await (await fetch(route, { cache: "no-store" })).text();
      for (const m of html.matchAll(/(?:src|href)="(\/_next\/static\/[^"?]+)/g)) files.add(m[1]);
      await fetch(route, { headers: { RSC: "1" }, cache: "no-store" });
    } catch {
      // Offline or a single page failed – keep going.
    }
  }
  await Promise.all([...files].map((f) => fetch(f).catch(() => undefined)));
  if (fromManifest) await pruneOldBuildFiles(files);
}

/** Drops build files from earlier deploys (they are content-hashed, so never reused). */
async function pruneOldBuildFiles(current: Set<string>): Promise<void> {
  const cache = await caches.open(SHELL_CACHE);
  for (const req of await cache.keys()) {
    const path = new URL(req.url).pathname;
    if (path.startsWith("/_next/static/") && !current.has(path)) await cache.delete(req);
  }
}

interface SetupCallbacks {
  /** Loading screen should show: total items to report. */
  onLoadingStart: (total: number, alreadyCached: number) => void;
  onProgress: (cached: number) => void;
}

/**
 * First-launch / start-up flow (DEVELOPMENT_PLAN §3.1.6–3.1.7):
 *  - everything cached → no loading screen (the shell is refreshed quietly);
 *  - media missing and online → loading screen with real progress;
 *  - media missing and offline → open anyway (the status screen shows what is missing);
 *  - content version changed → download new links only, then prune old ones.
 */
export async function runOfflineSetup(cb: SetupCallbacks): Promise<OfflineStatus> {
  const urls = mediaDownloadList();
  const status: OfflineStatus = { ...EMPTY_OFFLINE_STATUS, active: true, total: urls.length, placeholders: placeholderLinkCount() };

  const controlled = await registerServiceWorker();
  if (!controlled) return { ...status, active: false };

  const missing = await missingMedia(urls);
  status.cached = urls.length - missing.length;
  const shellReady = localStorage.getItem(SHELL_KEY) === "1";
  const versionChanged = localStorage.getItem(VERSION_KEY) !== SITE_SETTINGS.contentVersion;

  if (!navigator.onLine) {
    return { ...status, offlineMissing: missing.length > 0 || !shellReady };
  }

  if (missing.length === 0 && shellReady) {
    void warmShell(); // pick up a new deploy in the background
    if (versionChanged) {
      await pruneMedia(urls);
      localStorage.setItem(VERSION_KEY, SITE_SETTINGS.contentVersion);
    }
    return status;
  }

  cb.onLoadingStart(urls.length, status.cached);
  await warmShell();
  localStorage.setItem(SHELL_KEY, "1");

  const result = await downloadAllMedia(missing, (p) => cb.onProgress(status.cached + p.done));
  status.cached += result.done;
  status.failed = result.failed.length;
  status.corsBlocked = result.corsBlocked;

  if (result.failed.length === 0) {
    if (versionChanged) await pruneMedia(urls);
    localStorage.setItem(VERSION_KEY, SITE_SETTINGS.contentVersion);
  }
  return status;
}
