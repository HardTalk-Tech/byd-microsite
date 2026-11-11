import Image from "next/image";
import type { Model } from "@/lib/types/content";

interface VehicleNameProps {
  model: Model;
  textClassName: string;
  artworkHeight: number;
  artworkMaxWidth?: number;
  short?: boolean;
}

interface NameplateArtwork {
  src: string;
  minX: number;
  minY: number;
  width: number;
  height: number;
}

const SOURCE_WIDTH = 2172;
const SOURCE_HEIGHT = 724;

const NAMEPLATES: Partial<Record<string, NameplateArtwork>> = {
  "atto-1": { src: "/media/nameplates/Atto 1.png", minX: 72, minY: 274, width: 2024, height: 160 },
  "atto-2": { src: "/media/nameplates/Atto 2.png", minX: 74, minY: 282, width: 2024, height: 154 },
  "atto-3": { src: "/media/nameplates/Atto 3.png", minX: 92, minY: 274, width: 1990, height: 164 },
  dolphin: { src: "/media/nameplates/Dolphin.png", minX: 78, minY: 284, width: 2022, height: 148 },
  racco: { src: "/media/nameplates/Racco.png", minX: 166, minY: 282, width: 1842, height: 154 },
  "sealion-5": { src: "/media/nameplates/sealion5.png", minX: 92, minY: 298, width: 1988, height: 124 },
  "sealion-6": { src: "/media/nameplates/sealion6.png", minX: 106, minY: 294, width: 1978, height: 120 },
  "sealion-8": { src: "/media/nameplates/sealion8.png", minX: 94, minY: 296, width: 1986, height: 124 },
  "shark-6": { src: "/media/nameplates/shark.png", minX: 180, minY: 260, width: 1820, height: 208 },
};

/** Uses supplied vehicle nameplate artwork when available, with text as the fallback. */
export function VehicleName({
  model,
  textClassName,
  artworkHeight,
  artworkMaxWidth,
  short = false,
}: VehicleNameProps) {
  const artwork = NAMEPLATES[model.slug];

  if (!artwork) {
    return <span className={textClassName}>{short ? model.name : model.fullName}</span>;
  }

  const aspectRatio = artwork.width / artwork.height;
  const isSealion = model.slug === "sealion-5" || model.slug === "sealion-6" || model.slug === "sealion-8";
  const sizeMultiplier = isSealion ? 1.25 : model.slug === "dolphin" ? 1.12 : model.slug === "racco" ? 0.9 : 1;
  const widthLimit = (artworkMaxWidth ?? Number.POSITIVE_INFINITY) * sizeMultiplier;
  const renderedWidth = Math.min(artworkHeight * aspectRatio, widthLimit);
  const renderedHeight = renderedWidth / aspectRatio;

  return (
    <span
      className="relative inline-block overflow-hidden align-middle"
      style={{ width: renderedWidth, height: renderedHeight }}
    >
      <Image
        src={artwork.src}
        alt={model.fullName}
        width={SOURCE_WIDTH}
        height={SOURCE_HEIGHT}
        unoptimized
        className="absolute max-w-none"
        style={{
          width: `${(SOURCE_WIDTH / artwork.width) * 100}%`,
          height: `${(SOURCE_HEIGHT / artwork.height) * 100}%`,
          left: `${(-artwork.minX / artwork.width) * 100}%`,
          top: `${(-artwork.minY / artwork.height) * 100}%`,
          right: "auto",
          bottom: "auto",
        }}
      />
    </span>
  );
}
