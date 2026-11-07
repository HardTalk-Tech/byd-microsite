import Image from "next/image";

/** Transparent PNGs rebuilt from the client's logo files (575 × 122). */
const LOGO = {
  white: "/brand/byd-logo-white.png",
  black: "/brand/byd-logo-black.png",
} as const;
const LOGO_WIDTH = 575;

interface BrandLogoProps {
  /** Slot size from the design (the logo is fitted inside, keeping its proportions). */
  width: number;
  height: number;
  /** White on the dark kiosk screens; black for light backgrounds. */
  tone?: "white" | "black";
  /** Horizontal placement inside the slot. */
  align?: "left" | "center";
  /** First visible image on screen (e.g. the Loading screen). */
  priority?: boolean;
}

/** BYD logo. Served from /public, so it is part of the app (and works offline later). */
export function BrandLogo({ width, height, tone = "white", align = "center", priority = false }: BrandLogoProps) {
  return (
    <div className="relative" style={{ width, height }}>
      <Image
        src={LOGO[tone]}
        alt="BYD"
        fill
        unoptimized
        priority={priority}
        sizes={`${Math.min(width, LOGO_WIDTH)}px`}
        style={{ objectFit: "contain", objectPosition: align === "left" ? "left center" : "center" }}
      />
    </div>
  );
}
