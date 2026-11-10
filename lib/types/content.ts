/** Shared content types. All media fields hold storage paths, never full URLs. */

import type { ProvinceId } from "@/lib/geo/sri-lanka-provinces";

export type ViewKey = "exterior" | "interior";
export type TimeKey = "day" | "night";
export type ClipKey = `${ViewKey}-${TimeKey}`;

export const CLIP_KEYS: readonly ClipKey[] = [
  "exterior-day",
  "exterior-night",
  "interior-day",
  "interior-night",
];

/** What a spec item measures. Used to pick the key specs for the 03 Models strip. */
export type SpecKind =
  | "range"
  | "topSpeed"
  | "acceleration"
  | "charging"
  | "battery"
  | "seats"
  | "v2l"
  | "drivetrain"
  | "airbags"
  | "groundClearance"
  | "fuelTank";

export interface SpecItem {
  kind: SpecKind;
  /** Full label, shown in 04b Details Panel, e.g. "Combined range". */
  label: string;
  /** Number or text, e.g. "410" or "BYD Blade Battery". */
  value: string;
  /** Shown in gold after a numeric value, e.g. "km". Text values have no unit. */
  unit?: string;
  /** Qualifier shown under the value, e.g. "NEDC", "0–100 km/h", "20% to 80%". */
  note?: string;
  /** Qualifier for the 03 Models strip when its short label needs more context. */
  stripNote?: string;
}

/** One trim level of a model (e.g. "Premium"). Videos and images are shared by all variants. */
export interface ModelVariant {
  id: string;
  /** Variant name, or null when the model is sold in one version only. */
  name: string | null;
  description: string;
  /** Specs in the order the official spec sheet lists them. */
  specs: SpecItem[];
}

export interface ModelMedia {
  /** Transparent car cut-out (03 Models). */
  cutout: string;
  /** Rail thumbnail (03 Models). */
  thumb: string;
  /** The 4 experience clips (04 Experience). */
  videos: Record<ClipKey, string>;
  /** First-frame posters for the 4 clips. */
  posters: Record<ClipKey, string>;
  /** 4 gallery images (04b Details Panel, 04c Gallery Fullscreen). */
  gallery: string[];
}

export interface Model {
  slug: string;
  /** Name as shown in the design, e.g. "Racco". */
  name: string;
  /** Full name for metadata, e.g. "BYD Racco". */
  fullName: string;
  colourName: string;
  /** Accent hex (placeholder until official values are supplied). */
  accent: string;
  /** At least one. The first is selected by default. */
  variants: ModelVariant[];
  media: ModelMedia;
}

/** Where a pin's name sits relative to its dot on the 05 Showrooms map. */
export interface MapLabel {
  side: "left" | "right";
  /** Vertical nudge in px, to keep labels of nearby pins apart. */
  dy?: number;
}

export interface Showroom {
  id: string;
  /** Town, shown as the card title and the map label, e.g. "Colombo". */
  city: string;
  /** Distinguishes several locations in one town, e.g. "Altair". */
  area?: string;
  /** Shown as "BYD {type}" above the card title. */
  type: "Showroom" | "3S Facility";
  /** Real location, taken from the Google Maps link. */
  location: { lat: number; lng: number };
  /** Province the location is in; highlighted on the map when selected. */
  province: ProvinceId;
  /** Locations too close to tell apart on the map share one cluster pin. */
  mapCluster?: string;
  /** Map label placement (ignored when the showroom is in a cluster). */
  label: MapLabel;
  address: string;
  phone: string;
  hours: string;
  /** Google Maps share link, encoded in the "Scan for directions" QR. */
  directionsUrl: string | null;
}

/** One pin shared by several nearby showrooms. */
export interface MapCluster {
  id: string;
  name: string;
  label: MapLabel;
}

export interface BatteryPoint {
  title: string;
  description: string;
}

/** A tappable part of the chassis image on 02 Home. */
export interface ChassisPart {
  title: string;
  description: string;
  /** Outline of the part, in px of the chassis image (CHASSIS_IMAGE.width × height). */
  outline: ReadonlyArray<readonly [number, number]>;
}

export interface CommonFeature {
  title: string;
  description: string;
}

export interface ContactDetails {
  /** Main hotline / call centre number. */
  phone: string;
  email: string;
  /** Call centre service hours, e.g. "07:00 – 19:00". */
  callCentreHours: string;
  headOffice: {
    name: string;
    address: string;
  };
}

export interface SiteSettings {
  /** Main company contact details (John Keells CG Auto). */
  contact: ContactDetails;
  /** Test-drive form. Null until the URL is supplied. */
  testDriveFormUrl: string | null;
  /** Set to false if the form site blocks iframes; hides "Open form here". */
  testDriveFormEmbeddable: boolean;
  /** Seconds without touch before returning to 02 Home. */
  idleTimeoutSeconds: number;
  /** Longer timeout while the test-drive form is open (touches inside the iframe are not seen). */
  formIdleTimeoutSeconds: number;
  /** Bump to trigger a media re-download (Stage 3). */
  contentVersion: string;
}
