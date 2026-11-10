import { renderOgImage, OG_SIZE } from "@/lib/og/og-image";

export const alt = "BYD Showroom Sri Lanka – Drive the Future";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "BYD Sri Lanka",
    title: "Drive the Future",
    subtitle: "Explore every model, inside and out",
    accent: "#C9A24A",
  });
}
