import { MAP_CLUSTERS, SHOWROOMS, showroomName } from "@/content/showrooms";
import { MAP_VIEWBOX, projectToMap } from "@/lib/geo/map-projection";
import { PROVINCE_BORDERS, PROVINCES } from "@/lib/geo/sri-lanka-provinces";
import type { MapLabel } from "@/lib/types/content";
import { RippleRings } from "@/components/ui/RippleRings";
import { MapPin } from "./MapPin";

/** Map outline from the design, in a 560 × 860 viewBox. */
const SRI_LANKA_PATH =
  "M102.8,49.8L89.7,52.1L78.8,37.7L76.5,31.2L78.8,27.1L81.9,24.8L85.8,25.6L90.4,39.2L102.8,49.8ZM82.7,176.4L88.9,192.7L71.0,181.7L59.4,172.2L54.8,164.7L79.6,173.0L82.7,176.4ZM105.9,10.0L126.1,11.1L148.6,10.4L164.1,13.4L190.4,47.2L262.6,107.5L302.1,168.8L305.2,182.1L310.6,193.4L319.9,196.8L328.5,202.1L367.2,261.1L371.9,272.9L371.1,285.7L373.4,295.2L384.3,300.1L396.7,302.4L405.2,311.4L416.1,358.3L416.1,373.0L418.4,379.4L468.0,452.3L471.1,461.4L470.3,468.2L471.9,473.8L481.2,486.6L496.7,521.3L503.7,529.3L513.0,559.8L513.8,617.8L510.7,643.8L501.4,675.4L490.5,705.9L478.1,728.1L461.8,747.0L406.8,786.8L390.5,795.1L318.4,819.9L265.7,843.6L216.0,850.0L167.2,837.2L130.0,806.0L111.4,760.1L98.2,712.3L78.8,659.3L64.8,495.3L57.9,449.3L46.2,390.8L47.8,365.5L55.5,341.3L55.5,394.5L62.5,401.0L67.9,394.2L73.4,339.0L77.2,315.6L96.6,254.7L97.4,243.8L93.5,220.7L94.3,209.3L123.8,166.5L130.7,141.5L134.6,116.2L133.1,88.5L127.6,61.2L151.7,69.9L164.9,79.4L178.0,85.8L188.9,82.4L201.3,82.4L192.8,67.7L164.9,54.0L119.1,45.7L105.2,34.7L99.7,25.2L102.1,14.2L105.9,10.0Z";

const MAP_WIDTH = 504;
const MAP_HEIGHT = 774;
/** viewBox units → px (504 / 560). */
const MAP_SCALE = MAP_WIDTH / MAP_VIEWBOX.width;

interface Marker {
  key: string;
  name: string;
  /** Indexes into SHOWROOMS behind this pin. */
  members: number[];
  x: number;
  y: number;
  label: MapLabel;
}

/** One marker per showroom, except clustered showrooms, which share a pin at their average position. */
function buildMarkers(): Marker[] {
  const markers: Marker[] = [];
  const clusters = new Map<string, Marker>();

  SHOWROOMS.forEach((showroom, index) => {
    const { x, y } = projectToMap(showroom.location.lat, showroom.location.lng);
    const px = { x: x * MAP_SCALE, y: y * MAP_SCALE };
    const cluster = showroom.mapCluster ? MAP_CLUSTERS.find((c) => c.id === showroom.mapCluster) : undefined;

    if (!cluster) {
      markers.push({ key: showroom.id, name: showroom.city, members: [index], ...px, label: showroom.label });
      return;
    }
    const existing = clusters.get(cluster.id);
    if (existing) {
      const n = existing.members.length;
      existing.x = (existing.x * n + px.x) / (n + 1);
      existing.y = (existing.y * n + px.y) / (n + 1);
      existing.members.push(index);
    } else {
      const marker = { key: cluster.id, name: cluster.name, members: [index], ...px, label: cluster.label };
      clusters.set(cluster.id, marker);
      markers.push(marker);
    }
  });
  return markers;
}

const MARKERS = buildMarkers();

interface SriLankaMapProps {
  selectedIndex: number;
  onSelect: (index: number) => void;
}

/**
 * 05 Showrooms – outline map with province borders and a pin at each showroom's real location.
 * The selected showroom's province is softly highlighted.
 * Tapping a cluster pin selects its first showroom, then steps through the others.
 */
export function SriLankaMap({ selectedIndex, onSelect }: SriLankaMapProps) {
  const selectedMarker = MARKERS.find((m) => m.members.includes(selectedIndex)) ?? MARKERS[0];
  const selectedProvince = SHOWROOMS[selectedIndex]?.province;

  const handleTap = (marker: Marker) => {
    const at = marker.members.indexOf(selectedIndex);
    onSelect(at === -1 ? marker.members[0] : marker.members[(at + 1) % marker.members.length]);
  };

  return (
    <div className="absolute left-[760px] top-[150px]" style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
      <svg
        width={MAP_WIDTH}
        height={MAP_HEIGHT}
        viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
        className="absolute inset-0 overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="mapGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#C9A24A" />
            <stop offset="1" stopColor="#E8C875" />
          </linearGradient>
          {/* Warm centre fading to the coast, for depth. */}
          <radialGradient id="mapIslandFill" cx="45%" cy="60%" r="65%">
            <stop offset="0" stopColor="rgba(232,200,117,0.09)" />
            <stop offset="1" stopColor="rgba(201,162,74,0.02)" />
          </radialGradient>
          {/* Fine gold dot texture inside the island. */}
          <pattern id="mapIslandDots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="0.8" fill="rgba(232,200,117,0.16)" />
          </pattern>
          <clipPath id="mapIslandClip">
            <path d={SRI_LANKA_PATH} />
          </clipPath>
        </defs>

        <path d={SRI_LANKA_PATH} fill="none" stroke="rgba(201,162,74,0.12)" strokeWidth="14" strokeLinejoin="round" />
        <path d={SRI_LANKA_PATH} fill="url(#mapIslandFill)" />

        <g clipPath="url(#mapIslandClip)">
          <rect width={MAP_VIEWBOX.width} height={MAP_VIEWBOX.height} fill="url(#mapIslandDots)" />
          {/* The selected showroom's province glows softly. */}
          {PROVINCES.map((province) => (
            <path
              key={province.id}
              d={province.path}
              fill="#E8C875"
              style={{
                opacity: province.id === selectedProvince ? 0.14 : 0,
                transition: "opacity 600ms ease",
              }}
            />
          ))}
          <path
            d={PROVINCE_BORDERS}
            fill="none"
            stroke="rgba(232,200,117,0.34)"
            strokeWidth="1.1"
            strokeDasharray="4 3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        <path
          d={SRI_LANKA_PATH}
          fill="none"
          stroke="url(#mapGold)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 8px rgba(232,200,117,0.45))" }}
        />
      </svg>

      <RippleRings x={selectedMarker.x} y={selectedMarker.y} size={120} />

      {MARKERS.map((marker) => {
        const count = marker.members.length;
        return (
          <MapPin
            key={marker.key}
            name={marker.name}
            count={count}
            x={marker.x}
            y={marker.y}
            label={marker.label}
            selected={marker.members.includes(selectedIndex)}
            ariaLabel={
              count > 1
                ? `${marker.name} – ${count} showrooms: ${marker.members.map((i) => showroomName(SHOWROOMS[i])).join(", ")}`
                : showroomName(SHOWROOMS[marker.members[0]])
            }
            onClick={() => handleTap(marker)}
          />
        );
      })}
    </div>
  );
}
