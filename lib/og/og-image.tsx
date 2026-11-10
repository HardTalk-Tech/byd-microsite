import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/** Link-preview images (Stage 4). Everything is read from disk so builds need no network. */
export const OG_SIZE = { width: 1200, height: 630 };

// Each path is spelled out under its own folder so the build only bundles those files.
const pngDataUrl = (data: Buffer) => `data:image/png;base64,${data.toString("base64")}`;
const readFont = () => readFile(join(process.cwd(), "assets", "fonts", "Michroma-Regular.ttf"));
const readLogo = () => readFile(join(process.cwd(), "public", "brand", "byd-logo-white.png")).then(pngDataUrl);
const readCar = (slug: string) => readFile(join(process.cwd(), "assets", "og", `${slug}.png`)).then(pngDataUrl);

interface OgOptions {
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Glow colour (model accent or gold). */
  accent: string;
  /** Model slug: draws its car cut-out (assets/og/<slug>.png). */
  carSlug?: string;
}

export async function renderOgImage({ eyebrow, title, subtitle, accent, carSlug }: OgOptions) {
  const [michroma, logo, car] = await Promise.all([
    readFont(),
    readLogo(),
    carSlug ? readCar(carSlug) : Promise.resolve(null),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          background: "#0A0A0B",
          color: "#F2F0EB",
          fontFamily: "Michroma",
        }}
      >
        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            left: car ? 420 : 200,
            top: car ? 120 : -40,
            width: car ? 900 : 800,
            height: car ? 600 : 700,
            display: "flex",
            background: `radial-gradient(ellipse at center, ${accent}55 0%, ${accent}00 65%)`,
          }}
        />
        {/* Gold horizon */}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 96,
            height: 2,
            display: "flex",
            background: "linear-gradient(90deg, rgba(201,162,74,0) 0%, rgba(232,200,117,0.85) 50%, rgba(201,162,74,0) 100%)",
          }}
        />
        {car && (
          // eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img>
          <img src={car} alt="" width={720} height={304} style={{ position: "absolute", right: 30, bottom: 70, objectFit: "contain" }} />
        )}
        <div
          style={{
            position: "absolute",
            left: 72,
            top: 64,
            bottom: 140,
            width: car ? 560 : 1056,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
          <img src={logo} alt="" width={170} height={36} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 20, letterSpacing: 6, color: "#D9B865", textTransform: "uppercase" }}>{eyebrow}</div>
            <div style={{ fontSize: car ? 64 : 76, lineHeight: 1.1, marginTop: 18 }}>{title}</div>
            {subtitle && <div style={{ fontSize: 22, color: "#9A9DA5", marginTop: 20, letterSpacing: 2 }}>{subtitle}</div>}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: [{ name: "Michroma", data: michroma, weight: 400, style: "normal" }] },
  );
}
