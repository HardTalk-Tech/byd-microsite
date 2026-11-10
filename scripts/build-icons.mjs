// Builds the app icons and the link-preview (OG) car images, using headless Chrome
// as a canvas (no project dependency).
//
//   node scripts/build-icons.mjs [path-to-chrome]
//
// Writes:
//   public/icons/icon-192.png, icon-512.png, icon-512-maskable.png, apple-touch-icon.png
//   app/icon.png                       (browser-tab icon)
//   assets/og/<slug>.png               (car cut-outs as PNG – next/og can't read WebP)
//
// Re-run after changing the logo or a car cut-out.

import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CHROME =
  process.argv[2] ||
  process.env.CHROME_PATH ||
  {
    win32: "C:/Program Files/Google/Chrome/Application/chrome.exe",
    darwin: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  }[process.platform] ||
  "google-chrome";
const PORT = 9355;
const BG = "#0A0A0B";
const GOLD = ["#E8C875", "#C9A24A"];
const SLUGS = ["atto-1", "atto-2", "atto-3", "dolphin", "racco", "sealion-5", "sealion-6", "sealion-8", "shark-6"];
const OG_CAR_WIDTH = 1000;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const dataUrl = (file, type) => `data:${type};base64,${fs.readFileSync(file).toString("base64")}`;
const write = (rel, base64) => {
  const file = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, Buffer.from(base64, "base64"));
  console.log("wrote", rel);
};

const profile = fs.mkdtempSync(path.join(os.tmpdir(), "byd-icons-"));
const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`, "about:blank"]);

try {
  let targets;
  for (let i = 0; i < 50 && !targets; i++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json();
    } catch {
      await sleep(200);
    }
  }
  if (!targets) throw new Error(`Could not start Chrome at ${CHROME}`);
  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) {
      pending.get(m.id)(m.result);
      pending.delete(m.id);
    }
  });
  const send = (method, params = {}) =>
    new Promise((r) => {
      pending.set(++id, r);
      ws.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expr) => {
    const r = await send("Runtime.evaluate", { expression: expr, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };

  const helpers = `
    const load = (src) => new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
    const png = (c) => c.toDataURL('image/png').split(',')[1];
  `;

  // --- App icons: white BYD logo on the kiosk black, with a soft gold glow and gold base line.
  const logo = dataUrl(path.join(ROOT, "public/brand/byd-logo-white.png"), "image/png");
  const icons = await evaluate(`(async () => {
    ${helpers}
    const logo = await load(${JSON.stringify(logo)});
    // size: canvas px; safe: share of the width the logo may use (maskable icons need ≤ 0.8 safe zone)
    const icon = (size, safe, rounded) => {
      const c = document.createElement('canvas'); c.width = c.height = size;
      const x = c.getContext('2d');
      if (rounded) { const r = size * 0.22; x.beginPath(); x.roundRect(0, 0, size, size, r); x.clip(); }
      x.fillStyle = ${JSON.stringify(BG)}; x.fillRect(0, 0, size, size);
      const glow = x.createRadialGradient(size / 2, size * 0.5, 0, size / 2, size * 0.5, size * 0.6);
      glow.addColorStop(0, 'rgba(201,162,74,0.22)'); glow.addColorStop(1, 'rgba(201,162,74,0)');
      x.fillStyle = glow; x.fillRect(0, 0, size, size);
      const w = size * safe, h = w * logo.naturalHeight / logo.naturalWidth;
      const top = size / 2 - h / 2 - size * 0.03;
      x.drawImage(logo, (size - w) / 2, top, w, h);
      const lw = w * 0.42, ly = top + h + size * 0.075, lh = Math.max(2, size * 0.014);
      const g = x.createLinearGradient((size - lw) / 2, 0, (size + lw) / 2, 0);
      g.addColorStop(0, ${JSON.stringify(GOLD[1])}); g.addColorStop(0.5, ${JSON.stringify(GOLD[0])}); g.addColorStop(1, ${JSON.stringify(GOLD[1])});
      x.fillStyle = g; x.beginPath(); x.roundRect((size - lw) / 2, ly, lw, lh, lh / 2); x.fill();
      return png(c);
    };
    return {
      i192: icon(192, 0.7, false),
      i512: icon(512, 0.7, false),
      maskable: icon(512, 0.56, false),
      apple: icon(180, 0.68, false),
      tab: icon(256, 0.78, true),
    };
  })()`);
  write("public/icons/icon-192.png", icons.i192);
  write("public/icons/icon-512.png", icons.i512);
  write("public/icons/icon-512-maskable.png", icons.maskable);
  write("public/icons/apple-touch-icon.png", icons.apple);
  write("app/icon.png", icons.tab);

  // --- OG car images: the WebP cut-outs as PNG, OG_CAR_WIDTH px wide.
  for (const slug of SLUGS) {
    const src = dataUrl(path.join(ROOT, `public/media/models/${slug}/${slug}-cutout.webp`), "image/webp");
    const out = await evaluate(`(async () => {
      ${helpers}
      const img = await load(${JSON.stringify(src)});
      const w = ${OG_CAR_WIDTH}, h = Math.round(w * img.naturalHeight / img.naturalWidth);
      const c = document.createElement('canvas'); c.width = w; c.height = h;
      const x = c.getContext('2d'); x.imageSmoothingQuality = 'high'; x.drawImage(img, 0, 0, w, h);
      return png(c);
    })()`);
    write(`assets/og/${slug}.png`, out);
  }

  ws.close();
} finally {
  chrome.kill();
  await sleep(300);
  fs.rmSync(profile, { recursive: true, force: true });
}
