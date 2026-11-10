import { OG_SIZE, renderModelOgImage } from "./og";

export { generateStaticParams } from "./og";
export const alt = "BYD model – BYD Showroom Sri Lanka";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function Image({ params }: { params: Promise<{ slug: string }> }) {
  return renderModelOgImage(params);
}
