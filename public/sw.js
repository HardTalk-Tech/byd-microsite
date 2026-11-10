/* BYD Showroom Kiosk – service worker (DEVELOPMENT_PLAN Stage 3).
 *
 * Two caches:
 *  - byd-media-v1  Remote media (videos). Written ONLY by the page (lib/offline/media-cache.ts);
 *                  this worker just reads it and answers Range requests from it.
 *  - byd-shell-v2  The app itself: pages, RSC payloads, JS/CSS, fonts, local images.
 *
 * Never cached: link-preview images, robots.txt, sitemap.xml, this file.
 */

const MEDIA_CACHE = "byd-media-v1"; // must match lib/offline/media-cache.ts
const SHELL_CACHE = "byd-shell-v2"; // bump to drop every cached page/file (old caches are deleted on activate)
const NETWORK_TIMEOUT_MS = 3000;
const NEVER_CACHE = /\/(opengraph-image|twitter-image)(\b|$)|^\/(robots\.txt|sitemap\.xml|sw\.js)$/;

// Must match cacheKey() in lib/offline/media-cache.ts
function cacheKey(url) {
  const u = new URL(url);
  u.searchParams.delete("token");
  return u.toString();
}

// ---------------------------------------------------------------------------
// Install / activate
// ---------------------------------------------------------------------------

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(SHELL_CACHE);
      try {
        const res = await fetch("/offline-manifest.json", { cache: "no-store" });
        const { routes = [], assets = [] } = await res.json();
        // Best effort: one missing file must not stop the install.
        await Promise.all(
          [...routes, ...assets].map(async (path) => {
            try {
              const r = await fetch(path, { cache: "no-store" });
              const u = new URL(path, self.location.origin);
              if (storable(u, r)) await cache.put(shellKey(u, "html"), r);
            } catch {}
          }),
        );
      } catch {}
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((k) => (k.startsWith("byd-media-") && k !== MEDIA_CACHE) || (k.startsWith("byd-shell-") && k !== SHELL_CACHE))
          .map((k) => caches.delete(k)),
      );
      await self.clients.claim();
    })(),
  );
});

// ---------------------------------------------------------------------------
// Fetch routing
// ---------------------------------------------------------------------------

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);

  // Remote media played by <video>/<audio>: read-only cache with Range support.
  // The page downloader's own fetch() calls are left alone (they go straight to the network).
  if (url.origin !== self.location.origin) {
    if (request.destination === "video" || request.destination === "audio") event.respondWith(handleMedia(request));
    return;
  }

  if (NEVER_CACHE.test(url.pathname)) return;

  // Content-hashed build files and local static files: cache-first.
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/media/") ||
    url.pathname.startsWith("/brand/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname === "/manifest.webmanifest" ||
    url.pathname === "/offline-manifest.json" ||
    /\.(png|ico|svg|webp|woff2?)$/.test(url.pathname)
  ) {
    event.respondWith(cacheFirst(request, url));
    return;
  }

  // Pages and RSC payloads: network-first (3 s), falling back to the cache.
  const isRsc = request.headers.get("RSC") === "1" || url.searchParams.has("_rsc");
  if (request.mode === "navigate" || isRsc) {
    event.respondWith(networkFirst(request, url, isRsc ? "rsc" : "html"));
  }
});

// ---------------------------------------------------------------------------
// Shell strategies
// ---------------------------------------------------------------------------

/**
 * Cache key for pages and RSC payloads. The `_rsc` cache-buster is dropped, and
 * RSC variants are told apart by kind and segment-prefetch header instead, so a
 * payload cached during warm-up is found again offline.
 */
function shellKey(url, kind, request) {
  const u = new URL(url.pathname, self.location.origin);
  if (kind === "rsc") {
    u.searchParams.set("__kind", "rsc");
    const segment = request && request.headers.get("Next-Router-Segment-Prefetch");
    const prefetch = request && request.headers.get("Next-Router-Prefetch");
    if (segment) u.searchParams.set("__segment", segment);
    else if (prefetch) u.searchParams.set("__prefetch", "1");
  }
  return u.toString();
}

async function cacheFirst(request, url) {
  const cache = await caches.open(SHELL_CACHE);
  // Path only: build files are content-hashed, and a deployment query (?dpl=…) must not miss.
  const key = shellKey(url, "html");
  const hit = await cache.match(key, { ignoreVary: true });
  if (hit) return hit;
  const res = await fetch(request);
  if (storable(url, res)) cache.put(key, res.clone());
  return res;
}

/**
 * Build files (/_next/static) are kept only when the server marks them immutable –
 * production does (content-hashed names); the dev server never does, so a worker left
 * over from a production run can't serve stale code to `next dev`.
 */
function storable(url, res) {
  if (!res.ok || res.type !== "basic") return false;
  if (!url.pathname.startsWith("/_next/static/")) return true;
  return /immutable/.test(res.headers.get("Cache-Control") || "");
}

async function networkFirst(request, url, kind) {
  const cache = await caches.open(SHELL_CACHE);
  const key = shellKey(url, kind, request);
  try {
    const res = await withTimeout(fetch(request), NETWORK_TIMEOUT_MS);
    if (res.ok && res.type === "basic") cache.put(key, res.clone());
    return res;
  } catch {
    const hit = (await cache.match(key, { ignoreVary: true })) || (kind === "rsc" ? await rscFallback(cache, url) : null);
    if (hit) return hit;
    if (kind === "html") {
      const home = await cache.match(shellKey(new URL("/", self.location.origin), "html"), { ignoreVary: true });
      if (home) return home;
    }
    return new Response("Offline", { status: 503, headers: { "Content-Type": "text/plain" } });
  }
}

/** Any cached RSC variant of the same page (better than failing offline). */
async function rscFallback(cache, url) {
  const full = await cache.match(shellKey(url, "rsc"), { ignoreVary: true });
  if (full) return full;
  for (const req of await cache.keys()) {
    const u = new URL(req.url);
    if (u.pathname === url.pathname && u.searchParams.get("__kind") === "rsc") return cache.match(req, { ignoreVary: true });
  }
  return null;
}

function withTimeout(promise, ms) {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error("timeout")), ms);
    promise.then(
      (v) => { clearTimeout(t); resolve(v); },
      (e) => { clearTimeout(t); reject(e); },
    );
  });
}

// ---------------------------------------------------------------------------
// Media (DEVELOPMENT_PLAN Appendix B)
// ---------------------------------------------------------------------------

async function handleMedia(request) {
  const cache = await caches.open(MEDIA_CACHE);
  const cached = await cache.match(cacheKey(request.url));

  // Not downloaded yet: plain network passthrough (the page owns caching).
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
    // Multi-range or malformed: serve the whole file.
    return new Response(blob, {
      status: 200,
      headers: { "Content-Type": contentType, "Content-Length": String(size), "Accept-Ranges": "bytes" },
    });
  }

  let start;
  let end;
  if (m[1] === "") {
    // Suffix range "bytes=-500" = last 500 bytes.
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
