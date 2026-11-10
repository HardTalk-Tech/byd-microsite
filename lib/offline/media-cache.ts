/**
 * Page-side media downloader (DEVELOPMENT_PLAN Appendix A, renamed).
 * Owns ALL writes to the media cache; the service worker (public/sw.js) only reads it.
 * <video> elements keep using the original URL – the service worker serves it from cache.
 */

export const MEDIA_CACHE = "byd-media-v1"; // must match public/sw.js

export interface DownloadProgress {
  done: number;
  total: number;
  failed: string[];
  /** The browser refused the cross-origin download (bucket CORS not set). */
  corsBlocked: boolean;
}

/**
 * Firebase download URLs carry ?token=…; key without it so a rotated token doesn't
 * force a re-download. Must match cacheKey() in public/sw.js.
 */
export function cacheKey(url: string): string {
  const u = new URL(url);
  u.searchParams.delete("token");
  return u.toString();
}

export async function isMediaCached(url: string): Promise<boolean> {
  if (!url || !("caches" in window)) return false;
  const cache = await caches.open(MEDIA_CACHE);
  return Boolean(await cache.match(cacheKey(url)));
}

/** URLs from the list that are not in the cache yet. */
export async function missingMedia(urls: string[]): Promise<string[]> {
  if (!("caches" in window)) return [...urls];
  const cache = await caches.open(MEDIA_CACHE);
  const missing: string[] = [];
  for (const url of urls) if (!(await cache.match(cacheKey(url)))) missing.push(url);
  return missing;
}

class CorsBlockedError extends Error {}

async function downloadOne(cache: Cache, url: string, timeoutMs = 300_000): Promise<void> {
  const key = cacheKey(url);
  if (await cache.match(key)) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    let res: Response;
    try {
      // No Range header → the server returns the whole file (200), which is what we cache.
      res = await fetch(url, { mode: "cors", cache: "no-store", signal: controller.signal });
    } catch (err) {
      // A TypeError while online (and not our own timeout) means the browser blocked
      // the cross-origin response – the bucket has no CORS rule for this site.
      if (err instanceof TypeError && navigator.onLine && !controller.signal.aborted) throw new CorsBlockedError(url);
      throw err;
    }
    if (res.status !== 200) throw new Error(`HTTP ${res.status}`);

    // Read fully BEFORE writing, so a dropped connection never leaves a truncated video.
    const blob = await res.blob();
    const expected = Number(res.headers.get("Content-Length") || 0);
    if (expected && blob.size !== expected) throw new Error("Incomplete download");
    if (blob.size === 0) throw new Error("Empty file");

    await cache.put(
      key,
      new Response(blob, {
        status: 200,
        headers: {
          "Content-Type": res.headers.get("Content-Type") || "video/mp4",
          "Content-Length": String(blob.size),
        },
      }),
    );
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Downloads every URL not yet cached, `concurrency` at a time, with 3 attempts each.
 * If the first download shows the bucket blocks CORS, the rest are skipped at once
 * (no point retrying – the kiosk still streams them while online).
 */
export async function downloadAllMedia(
  urls: string[],
  onProgress?: (p: DownloadProgress) => void,
  concurrency = 2,
): Promise<DownloadProgress> {
  // Ask the browser not to evict the media when storage gets tight.
  await navigator.storage?.persist?.().catch(() => false);

  const cache = await caches.open(MEDIA_CACHE);
  const unique = [...new Set(urls.filter(Boolean))];
  const progress: DownloadProgress = { done: 0, total: unique.length, failed: [], corsBlocked: false };
  const queue = [...unique];
  const report = () => onProgress?.({ ...progress, failed: [...progress.failed] });

  const worker = async () => {
    while (queue.length > 0) {
      const url = queue.shift()!;
      if (progress.corsBlocked) {
        progress.failed.push(url);
        report();
        continue;
      }
      let ok = false;
      for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
        try {
          await downloadOne(cache, url);
          ok = true;
        } catch (err) {
          if (err instanceof CorsBlockedError) {
            progress.corsBlocked = true;
            break;
          }
          if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 3000));
        }
      }
      if (ok) progress.done++;
      else progress.failed.push(url);
      report();
    }
  };

  await Promise.all(Array.from({ length: Math.min(concurrency, unique.length) }, () => worker()));
  return progress;
}

/** Removes cached media that is no longer in the list (call after a content update). */
export async function pruneMedia(keepUrls: string[]): Promise<void> {
  const cache = await caches.open(MEDIA_CACHE);
  const keep = new Set(keepUrls.filter(Boolean).map(cacheKey));
  for (const req of await cache.keys()) {
    if (!keep.has(req.url)) await cache.delete(req);
  }
}
