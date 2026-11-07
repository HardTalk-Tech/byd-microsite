# BYD Sri Lanka Showroom Kiosk – Development Plan

> **For Claude Code.** Build this project stage by stage. **Stop at the end of every stage**, summarise what you did, list anything you were unsure about, and wait for approval before starting the next stage. Commit at the end of each stage.

---

## 0. Project context

A touch-screen kiosk web app for a BYD electric vehicle showroom event in Sri Lanka.

- **Screen:** 1920×1080 landscape touch display, used standing at arm's length. No mouse, no keyboard, no hover.
- **Content:** 9 BYD models. Each model has 4 videos (Exterior/Interior × Day/Night, 10 s each, 36 total), plus images.
- **Hosting:** Next.js 16 on Vercel. Videos and images in Firebase Storage.
- **Offline:** after the first launch the kiosk must work with **no internet**. All pages, fonts, images and all 36 videos are stored in the browser.
- **Installable:** the site is a PWA that can be installed from Chrome and run full screen.

### The 9 models

| # | slug | Name | Colour name | Accent (placeholder, replace with official) |
|---|---|---|---|---|
| 1 | `racco` | BYD Racco | Midnight Blue | `#1E2A4A` |
| 2 | `atto-1` | BYD Atto 1 | Sprout Green | `#A3C45A` |
| 3 | `atto-2` | BYD Atto 2 | Bubblegum Green | `#8FD9C4` |
| 4 | `dolphin` | BYD Dolphin | Atlantis Grey | `#6B7280` |
| 5 | `sealion-5` | BYD Sealion 5 | Cosmos Black | `#8A92A0` (silver glow) |
| 6 | `sealion-6` | BYD Sealion 6 | Arctic White | `#E8ECEF` |
| 7 | `shark-6` | BYD Shark 6 | Outback Orange | `#E07A2F` |
| 8 | `sealion-8` | BYD Sealion 8 | Dark Aquamarine | `#2E6B66` |
| 9 | `atto-3` | BYD Atto 3 | Red | `#C8102E` |

### Source of truth for the design

The approved design is a standalone HTML file exported from Claude Design, placed at:

```
design/byd-kiosk-design.html
```

**The HTML file is the only source of truth for screens.** Take every screen, screen name, layout, component, interaction, navigation flow, animation, colour, font and piece of text from it. Match it closely.

**This plan does not describe the screens on purpose.** It only covers technical requirements: project structure, data, media, Firebase, offline support, metadata, kiosk rules and performance. If anything in this plan seems to describe a screen differently from the HTML file, **follow the HTML file**. If the HTML file does not cover something this plan requires (for example a loading screen for offline downloads), build it in the same visual style as the design and mention it in your stage summary.

### Ground rules (all stages)

1. **Never invent car specs, prices, addresses or phone numbers.** Use clearly marked placeholders (`XXX km`, `TBC`) until real data is supplied.
2. Do not use real BYD logos or car photos until Stage 2. Use labelled placeholders.
3. Ask before adding any dependency not listed in this plan.
4. The project was created by the user with `create-next-app` (Next.js 16, App Router, TypeScript, Tailwind, ESLint). **Do not re-create or re-initialise it.** Check `package.json` first and follow the installed versions.
5. Next.js 16 notes – check the installed docs when unsure:
   - Turbopack is the default for `dev` and `build`. Do not add webpack-only plugins (this is why we use a hand-written service worker, not `next-pwa` / `@serwist/next`).
   - Route `params` and `searchParams` are **Promises** – `await` them.
   - `middleware.ts` is now `proxy.ts` (we should not need it).
   - Tailwind is v4: design tokens go in `app/globals.css` with `@theme`, not in `tailwind.config.js`.
6. Use TypeScript everywhere, strict mode. Server Components by default; add `"use client"` only where needed (video, touch, timers, carousel).
7. Animate only `transform` and `opacity`. Keep `backdrop-filter` blur limited (see Stage 5).
8. Every touch target is at least **64×64 px**. Body text is at least **22 px**.

---

## Stage 1 – Build the static site from the design (placeholders only)

**Goal:** a pixel-faithful, fully working Next.js version of the design, with placeholder media and placeholder data. No Firebase, no offline support yet.

### 1.1 Audit the design first

Before writing code, read `design/byd-kiosk-design.html` and write a design inventory document in `docs/` containing:

- Every screen and state, **using the screen names exactly as they appear in the design** (including modals, open panels, pressed states)
- The navigation flow: what each tap, swipe or timeout does and where it leads
- Any behaviour coded in the design's JavaScript (timers, auto-hide, toggles, carousels)
- Design tokens: colours, gradients, font families and sizes, radii, shadows, glows, blur values, spacing scale
- Every reusable component and its variants
- Every animation (what moves, duration, easing, trigger)
- Every media slot (video / image / logo / QR) with its aspect ratio and label

### 1.2 Folder structure and file naming

**You choose the file and folder names.** Do not wait for names from this plan. Follow standard, well-known Next.js App Router conventions and keep the project easy for another developer to understand.

Rules:

1. **Routes** live in `app/` and follow Next.js file conventions (`layout`, `page`, `loading`, `error`, `not-found`, `manifest`, `opengraph-image`, `robots`, `sitemap`). These names are required by the framework.
2. **Routes:** create the routes needed for the screens in the design, named after the design's screen names. Overlays and panels that appear on top of a screen in the design stay as overlays (state), not separate routes. Any per-model screen uses **one dynamic route per model slug**.
3. **Components** are grouped by feature (one folder per screen in the design, named after it, plus one for global overlays), plus a shared folder for reusable UI building blocks. One component per file, PascalCase file names that match the component name.
4. **Content data** (models, showrooms, site settings) is kept in its own folder, separate from components, so it can be edited without touching UI code.
5. **Shared logic** (types, media URL helper, kiosk state and timers, offline code) lives in a library folder, grouped by purpose.
6. **Hooks** start with `use` and live next to the feature that uses them, or in a shared hooks folder if used in several places.
7. **Static files** (icons, local placeholders) go in `public/`, grouped in sub-folders.
8. **Documentation** written by you goes in a `docs/` folder.
9. Keep names descriptive and consistent (no `utils2`, `newComponent`, `temp`). Avoid deep nesting.
10. Before writing code, **add your planned folder tree with file names to the design inventory document**, then follow it. Update it if the structure changes.

**What must exist:**

- Every screen, component, state and interaction listed in your design inventory
- A content data folder: the 9 models, showrooms and site settings (hotline, test-drive form URL, idle timeout, content version)
- Shared types and a media URL helper (returns placeholders now, Firebase URLs in Stage 2)
- A kiosk state provider for app-wide state (idle timer, global overlays)

### 1.3 Data model (shared types)

A starting point. **Add, rename or remove fields so the data matches what the design actually displays** (for example, if the design shows different spec items, use those).

```ts
export type ViewKey = 'exterior' | 'interior';
export type TimeKey = 'day' | 'night';

export interface Model {
  slug: string;
  name: string;
  colourName: string;
  accent: string;              // hex
  tagline?: string;
  specs: { range: string; battery: string; power: string; seats: string };
  highlights: string[];
  media: {
    cutout: string;            // car image, transparent PNG/WebP
    thumb: string;
    videos: Record<`${ViewKey}-${TimeKey}`, string>;
    posters: Record<`${ViewKey}-${TimeKey}`, string>;
    gallery?: string[];        // only if the design has image slots
    featureVideo?: string;     // only if the design has an extra video slot
  };
}
```

All media fields hold **storage paths** (for example `models/atto-3/atto-3-exterior-day.mp4`), never full URLs. Components always get URLs through the media URL helper. In Stage 1 the helper returns `null` and components render a labelled placeholder with the path as its label.

### 1.4 Technical requirements for features in the design

Screens and behaviour come from the design. Apply these rules **wherever the design contains the matching feature**:

- **Car videos (Exterior/Interior × Day/Night):**
  - Use **two stacked `<video>` elements** and crossfade between them when the clip changes, so there is never a black flash.
  - When switching between views or times of day for the same car, **carry over `currentTime`**, so it feels like the same drive from another camera.
  - Videos are `muted`, `playsInline`, `loop`, `autoPlay`, `preload="auto"`, with a poster image.
  - Video URLs always come from the model data through the media URL helper.
- **Per-model route:** `generateStaticParams` returns all 9 slugs; set `dynamicParams = false`.
- **Map / showroom locations:** pin positions and showroom details come from the showroom data, never hard-coded in the component.
- **Test-drive form link:** the primary way is a QR code (works offline). If the design has a button that opens the form on the kiosk, show it **only when `navigator.onLine` is true**, open it in a full-screen overlay `<iframe>` with a large close button, and hide the button if the form site blocks iframes.
- **Swipe gestures:** use Pointer Events with distance and angle thresholds so taps never trigger swipes.
- **Overlay auto-hide, timers and carousels:** reproduce the timings from the design. If the design does not specify one, choose a sensible value and list it in your stage summary.

### 1.5 QR codes

Generate QR codes **at build time / on the client from data** (no external QR service – it would not work offline). Ask before adding a QR library; `qrcode` (npm) rendering to SVG is the suggested choice.

### 1.6 Acceptance criteria – Stage 1

- [ ] All screens and states from the design are implemented, with the design's screen names, and match it visually at 1920×1080
- [ ] Every media slot shows a labelled placeholder with the correct storage path
- [ ] Navigation works by touch only (test in Chrome DevTools device mode with touch emulation)
- [ ] Every interaction and navigation path in the design works, matching the design inventory
- [ ] No text under 22 px, no touch target under 64 px
- [ ] `npm run build` passes with no type or lint errors

**Stop and wait for review.**

---

## Stage 2 – Real content and Firebase Storage

**Goal:** replace placeholders with real images and videos served from Firebase Storage, and real data.

### 2.1 Storage layout

Create this structure in the Firebase Storage bucket (document it in an assets document in `docs/`). **The 4 model video names are fixed.** Adjust the other folders and files to match the media slots in your design inventory (the ones below are examples):

```
public/
  brand/            byd-logo.svg, byd-logo-gold.svg
  showreel/         showreel.mp4, showreel-poster.webp   (example)
  models/{slug}/
    {slug}-exterior-day.mp4      {slug}-exterior-day.webp      (poster)
    {slug}-interior-day.mp4      {slug}-interior-day.webp
    {slug}-exterior-night.mp4    {slug}-exterior-night.webp
    {slug}-interior-night.mp4    {slug}-interior-night.webp
    {slug}-cutout.webp           (transparent car image)
    {slug}-thumb.webp
    {slug}-gallery-1.webp … {slug}-gallery-4.webp
    {slug}-feature.mp4           (optional)
  showrooms/        (optional photos)
```

The video file names match the names in `BYD_Video_Prompts.md`.

### 2.2 Public URLs without tokens

- Storage rules: allow public **read** on `public/**` only; no public writes.
- Media URL helper (example):
  ```ts
  const BUCKET = process.env.NEXT_PUBLIC_FIREBASE_BUCKET!; // e.g. my-project.appspot.com
  export function mediaUrl(path?: string | null): string | null {
    if (!path) return null;
    return `https://firebasestorage.googleapis.com/v0/b/${BUCKET}/o/${encodeURIComponent('public/' + path)}?alt=media`;
  }
  ```
  No Firebase SDK is needed for reading public files. Add `NEXT_PUBLIC_FIREBASE_BUCKET` to `.env.local` and to Vercel, and document it in `.env.example`.
- Set **CORS** on the bucket (required for offline caching in Stage 3):
  ```json
  [{ "origin": ["https://YOUR-APP.vercel.app", "http://localhost:3000"],
     "method": ["GET", "HEAD"],
     "responseHeader": ["Content-Type", "Content-Length", "Content-Range", "Accept-Ranges"],
     "maxAgeSeconds": 3600 }]
  ```
  `gsutil cors set cors.json gs://YOUR-BUCKET`

### 2.3 Media preparation (write a media preparation script in a `scripts/` folder; do not run it on the user's files without asking)

- **Videos:** H.264 MP4, 1920×1080, no audio (kiosk plays muted), fast start:
  ```bash
  ffmpeg -i in.mp4 -c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -vf "scale=1920:1080" -an -movflags +faststart out.mp4
  ```
  Target roughly 6–12 MB per 10 s clip.
- **Posters:** first frame of each video as WebP: `ffmpeg -i out.mp4 -frames:v 1 -q:v 80 poster.webp`
- **Images:** WebP, sized for their display slot (no 4000 px images for a 400 px thumbnail). Car cut-outs keep transparency.

### 2.4 Images in Next.js

Use `next/image` with `unoptimized` for Firebase media (or plain `<img>` with explicit width/height). Reason: the original Firebase URL must stay the same so the service worker in Stage 3 can serve it from the cache offline. Always set `width`, `height` and `alt`; mark the first visible image `priority`.

### 2.5 Real data

Fill the model and showroom data files with data supplied by the user (spec sheets, showroom list, hotline, test-drive form URL). Anything not supplied stays as `TBC` – **do not guess**.

### 2.6 Acceptance criteria – Stage 2

- [ ] All placeholders replaced by real media from Firebase (missing files fall back gracefully to the poster or placeholder, never a broken element)
- [ ] Video switching crossfades smoothly with real files and keeps `currentTime`
- [ ] No console CORS errors
- [ ] The assets document lists every expected file and which ones are still missing

**Stop and wait for review.**

---

## Stage 3 – Offline support

**Goal:** after one online launch, the kiosk works fully offline – pages, fonts, styles, scripts, images and all videos.

### 3.1 Approach

Use the hand-written service worker and downloader in the **Appendix** as the starting point (they were reviewed earlier for this project). Extend them as follows:

1. **Rename** the cache from `byd-videos-v1` to `byd-media-v1` and use it for **all Firebase media** (videos, posters, images), not only videos.
2. **Asset list:** add a helper in the offline library code that builds the full list of media URLs from the model and site data (via the media URL helper). This list is what the downloader fetches.
3. **App shell caching** in the service worker (second cache, `byd-shell-v1`):
   - On `install`, precache **every page route** of the app (including all 9 model routes) and `/manifest.webmanifest`. Build the list from the route structure and model data, not by hand.
   - Same-origin `/_next/static/*` (JS, CSS, fonts): **cache-first** (files are content-hashed).
   - Navigations and RSC requests (`RSC` header / `_rsc` query): **network-first with a 3 s timeout, falling back to cache**, so navigation keeps working offline. Strip the `_rsc` query when building the cache key for fallbacks if needed, and test client-side navigation offline carefully.
   - Firebase media: **read-only cache lookup with range support**, exactly as in the Appendix.
4. **Registration:** a small client component registers the service worker (served from the site root, e.g. `/sw.js`) at scope `/` in production only.
5. **Headers:** in `next.config.ts`, serve `/sw.js` with `Cache-Control: no-cache` and `Service-Worker-Allowed: /`.
6. **First-launch flow:** use the design's loading screen if it has one; otherwise build one in the same style.
   - On app start, check which assets are missing from the cache.
   - If any are missing **and** the device is online, show the loading screen and run `downloadAllVideos()` (rename to `downloadAllMedia()`), driving its progress indicator and an item counter (e.g. "23 of 36").
   - If all are cached, go straight to the design's start screen.
   - If offline with missing assets, show the app anyway with posters/placeholders for missing items, and a small admin-only warning.
7. **Content updates:** the site settings data has a `contentVersion`. When it changes, download only new/changed URLs, then call `pruneVideos()` (rename to `pruneMedia()`) to delete old ones.
8. **Persistent storage:** call `navigator.storage.persist()` (already in the downloader).
9. **Hidden admin panel:** 5 taps in the top-left corner within 3 s, then PIN (from `NEXT_PUBLIC_ADMIN_PIN`). Shows: cached items x/total, storage used/quota, persisted yes/no, online status, content version, and buttons "Re-download missing", "Clear and re-download all", "Reload app".

### 3.2 Acceptance criteria – Stage 3

Test with `npm run build && npm start` (the service worker is production-only):

- [ ] First load online shows the loading screen and reaches 100%
- [ ] DevTools → Application → Cache Storage shows all media and shell entries
- [ ] With DevTools **Offline** checked: reload works, all routes open, all 36 videos play, seeking and looping work, images and fonts load
- [ ] Closing and reopening the browser offline still works
- [ ] Changing `contentVersion` downloads only what changed
- [ ] Admin panel shows correct numbers

**Stop and wait for review.**

---

## Stage 4 – PWA install, metadata and OG images

**Goal:** installable full-screen app, correct metadata, good link previews.

1. **`app/manifest.ts`:** name "BYD Showroom Sri Lanka", short name "BYD Showroom", `display: "fullscreen"`, `orientation: "landscape"`, `background_color` and `theme_color` `#0A0A0B`, `start_url: "/"`, icons 192, 512 and 512 maskable in `public/icons/`.
2. **Root metadata** in `app/layout.tsx`: `metadataBase` (from `NEXT_PUBLIC_SITE_URL`), title template `%s | BYD Sri Lanka`, description, Open Graph and Twitter defaults, `icons`, `appleWebApp`.
3. **Viewport export:** `width=device-width`, `initialScale: 1`, `maximumScale: 1`, `userScalable: false`, `themeColor: '#0A0A0B'` (kiosk: no pinch zoom).
4. **Per-model metadata:** `generateMetadata` in the per-model route with the model name, colour and a short description.
5. **OG images (1200×630):**
   - A site-wide `opengraph-image` in the root of `app/` (in the design's colours and fonts, with logo and headline) using `ImageResponse` from `next/og`.
   - An `opengraph-image` in the per-model route (model name, colour name, accent glow, car image from Firebase if available).
   - Add matching `twitter-image` files or reuse.
6. **`robots`** and **`sitemap`** route files in `app/` (all public routes).
7. Make sure the service worker does **not** cache OG image routes.

### Acceptance criteria – Stage 4

- [ ] Chrome shows "Install app"; the installed app opens full screen in landscape
- [ ] Link preview checks show correct title, description and image for the home page and a model page
- [ ] Lighthouse PWA/installability checks pass

**Stop and wait for review.**

---

## Stage 5 – Kiosk usability and performance

**Goal:** stable for a full event day on modest kiosk hardware, and effortless to use.

### 5.1 Kiosk behaviour

- **Idle reset:** after the idle timeout from site settings (default 90 s, unless the design specifies one) without touch, show a short warning countdown (use the design's if it has one), then reset state (close panels and overlays) and return to the design's start/idle screen.
- **Screen Wake Lock** (`navigator.wakeLock.request('screen')`), re-requested on `visibilitychange`.
- **Disable:** context menu, text selection, image dragging, pinch zoom, double-tap zoom, pull-to-refresh and overscroll bounce (`touch-action`, `overscroll-behavior: none`, `user-select: none`, `-webkit-touch-callout: none`).
- **Touch feedback:** every tappable element has an immediate pressed state (gold glow, slight scale-down) on `pointerdown`.
- **Swipe:** use Pointer Events with a minimum distance and angle threshold, so taps never trigger swipes.
- **Error safety:** `error` and `global-error` files show a styled "Restarting…" screen in the design's style and return to the start screen after 5 s. A video `error` event falls back to the poster and retries once.

### 5.2 Performance

- **Video:** keep at most 2 `<video>` elements mounted at a time on any screen. Preload only the next likely clip. Pause and release (`removeAttribute('src'); load()`) videos that leave the screen.
- **Blur:** `backdrop-filter` is expensive over playing video on weak GPUs. Use it only on small panels, keep blur ≤ 16 px, and provide a solid semi-transparent fallback. Measure in DevTools Performance; if frames drop, replace blur with a static gradient.
- **Animations:** `transform` and `opacity` only; use `will-change` sparingly; respect `prefers-reduced-motion`.
- **Fonts:** `next/font` with `display: 'swap'`, only the weights actually used.
- **JS:** keep client components small; dynamic-import heavy overlays and panels and the admin panel.
- **Images:** correct sizes, WebP, `priority` only for the first large image on screen.
- **Memory soak test:** leave the app cycling through all models (write a small dev-only auto-tour mode, `?autotour=1`) for 2+ hours and check memory stays flat in DevTools.
- **Targets:** smooth 60 fps transitions on the target hardware; Lighthouse Performance ≥ 90 on the main model screen (desktop profile).

### 5.3 Accessibility and usability

- Every icon button has an `aria-label`.
- Text over video always has a gradient or glass backing (contrast ≥ 4.5:1).
- Clear "you are here" indicators (active navigation item, selected model, selected option), as in the design.
- Keep the design's hierarchy of primary and secondary actions.

### 5.4 Deployment notes (write a kiosk setup guide in `docs/`)

- Deploy to Vercel; set env vars `NEXT_PUBLIC_FIREBASE_BUCKET`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_ADMIN_PIN`.
- On the kiosk: open the site in Chrome, install the app, let the loading screen reach 100%, then launch the installed app (or `chrome --kiosk --app=https://YOUR-APP.vercel.app`).
- Disable OS sleep, notifications and auto-updates during the event.
- Pre-event checklist: admin panel shows 36/36 videos and all images cached; pull the network cable and test every model.

### Acceptance criteria – Stage 5

- [ ] Idle reset, wake lock and all kiosk restrictions work on the real touch screen
- [ ] No dropped frames during video switching and panel animations on the target hardware
- [ ] 2-hour auto-tour soak test with flat memory
- [ ] Kiosk setup guide written

**Stop and wait for final review.**

---

## Appendix A – Media downloader (starting point, page side)

> Reviewed earlier for this project. Place it in the offline library code with a suitable file name, and rename the cache and functions as described in Stage 3.

```ts
// Page-side video downloader. Owns ALL writes to the video cache.
// The service worker (public/sw.js) only reads from this cache.
// <video> elements keep using the original Firebase URL; the SW serves it from cache.

export const VIDEO_CACHE = "byd-videos-v1"; // must match public/sw.js

export type DownloadProgress = {
  done: number;
  total: number;
  failed: string[];
};

// Firebase download URLs carry ?token=...; key without it so a rotated token
// doesn't force a re-download. Must match cacheKey() in public/sw.js.
export function cacheKey(url: string): string {
  const u = new URL(url);
  u.searchParams.delete("token");
  return u.toString();
}

export async function isVideoCached(url: string): Promise<boolean> {
  if (!url || !("caches" in window)) return false;
  const cache = await caches.open(VIDEO_CACHE);
  return !!(await cache.match(cacheKey(url)));
}

async function downloadOne(cache: Cache, url: string, timeoutMs = 300_000): Promise<void> {
  const key = cacheKey(url);
  if (await cache.match(key)) return;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    // No Range header -> Firebase returns the full file (200), which is what we cache.
    const res = await fetch(url, { mode: "cors", cache: "no-store", signal: controller.signal });
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
      })
    );
  } finally {
    clearTimeout(timer);
  }
}

export async function downloadAllVideos(
  urls: string[],
  onProgress?: (p: DownloadProgress) => void,
  concurrency = 2
): Promise<DownloadProgress> {
  // Ask the browser not to evict our ~400 MB when storage gets tight.
  await navigator.storage?.persist?.().catch(() => false);

  const cache = await caches.open(VIDEO_CACHE);
  const unique = [...new Set(urls.filter(Boolean))];
  const progress: DownloadProgress = { done: 0, total: unique.length, failed: [] };
  const queue = [...unique];

  const worker = async () => {
    while (queue.length > 0) {
      const url = queue.shift()!;
      let ok = false;
      for (let attempt = 1; attempt <= 3 && !ok; attempt++) {
        try {
          await downloadOne(cache, url);
          ok = true;
        } catch {
          if (attempt < 3) await new Promise((r) => setTimeout(r, attempt * 3000));
        }
      }
      if (ok) progress.done++;
      else progress.failed.push(url);
      onProgress?.({ ...progress, failed: [...progress.failed] });
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, unique.length) }, () => worker())
  );
  return progress;
}

// Remove videos that are no longer in models.json (call after a content update).
export async function pruneVideos(keepUrls: string[]): Promise<void> {
  const cache = await caches.open(VIDEO_CACHE);
  const keep = new Set(keepUrls.filter(Boolean).map(cacheKey));
  for (const req of await cache.keys()) {
    if (!keep.has(req.url)) await cache.delete(req);
  }
}

// For the hidden admin panel.
export async function getStorageInfo() {
  const est = await navigator.storage?.estimate?.();
  const persisted = (await navigator.storage?.persisted?.()) ?? false;
  return { usageMB: (est?.usage ?? 0) / 1e6, quotaMB: (est?.quota ?? 0) / 1e6, persisted };
}
```

## Appendix B – Service worker (starting point, served from the site root)

> Media part reviewed earlier. Extend with app-shell caching as described in Stage 3. Keep the cache name and `cacheKey()` identical to Appendix A.

```js
// public/sw.js — read-only video cache server.
// Caching is done by videoCache.ts (downloadAllVideos); this file never writes.

const VIDEO_CACHE = "byd-videos-v1"; // must match videoCache.ts
const FIREBASE_ORIGIN = "https://firebasestorage.googleapis.com";

// Must match cacheKey() in videoCache.ts
function cacheKey(url) {
  const u = new URL(url);
  u.searchParams.delete("token");
  return u.toString();
}

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((k) => k.startsWith("byd-videos-") && k !== VIDEO_CACHE)
            .map((k) => caches.delete(k))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  if (!request.url.startsWith(FIREBASE_ORIGIN)) return;
  event.respondWith(handleVideoRequest(request));
});

async function handleVideoRequest(request) {
  const cache = await caches.open(VIDEO_CACHE);
  const cached = await cache.match(cacheKey(request.url));

  // Not downloaded yet: plain network passthrough (the downloader owns caching).
  if (!cached) return fetch(request);

  const range = request.headers.get("Range");
  if (!range) return cached;
  return rangeResponse(cached, range);
}

async function rangeResponse(full, rangeHeader) {
  const contentType = full.headers.get("Content-Type") || "video/mp4";
  const blob = await full.blob(); // disk-backed in Chrome; slicing is cheap
  const size = blob.size;

  const m = /^bytes=(\d*)-(\d*)$/.exec(rangeHeader.trim());
  if (!m || (m[1] === "" && m[2] === "")) {
    // Multi-range or malformed: serve the whole file
    return new Response(blob, {
      status: 200,
      headers: { "Content-Type": contentType, "Content-Length": String(size), "Accept-Ranges": "bytes" },
    });
  }

  let start;
  let end;
  if (m[1] === "") {
    // Suffix range "bytes=-500" = last 500 bytes
    start = Math.max(size - parseInt(m[2], 10), 0);
    end = size - 1;
  } else {
    start = parseInt(m[1], 10);
    end = m[2] ? Math.min(parseInt(m[2], 10), size - 1) : size - 1;
  }

  if (start >= size || start > end) {
    return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
  }

  const chunk = blob.slice(start, end + 1);
  return new Response(chunk, {
    status: 206,
    statusText: "Partial Content",
    headers: {
      "Content-Type": contentType,
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(chunk.size),
      "Accept-Ranges": "bytes",
    },
  });
}
```
