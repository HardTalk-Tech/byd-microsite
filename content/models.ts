import { modelMediaPaths } from "@/lib/media/media-paths";
import type { Model, ModelVariant, SpecItem, SpecKind } from "@/lib/types/content";

/**
 * The 9 models on display and their variants.
 *
 * Specs come from the official John Keells CG Auto spec sheets supplied by the client.
 * Do not add or change values without a source. Labels are tidied for display
 * (consistent wording and capitalisation); values are as supplied.
 * Accent colours are placeholders – replace with official values.
 */

// ---------------------------------------------------------------------------
// Spec item builders (keep labels and formatting consistent across models)
// ---------------------------------------------------------------------------

const topSpeed = (kmh: string): SpecItem => ({
  kind: "topSpeed",
  label: "Top speed",
  value: kmh,
  unit: "km/h",
});

const acceleration = (seconds: string, note = "0–100 km/h"): SpecItem => ({
  kind: "acceleration",
  label: "Acceleration",
  value: seconds,
  unit: "s",
  note,
});

const fastCharging = (minutes: string, from: "20%" | "30%"): SpecItem => ({
  kind: "charging",
  label: "Fast charging",
  value: minutes,
  unit: "min",
  note: `${from} to 80%`,
});

const battery = (name: string): SpecItem => ({ kind: "battery", label: "Battery", value: name });

const seating = (seats: string): SpecItem => ({
  kind: "seats",
  label: "Seating",
  value: seats,
  unit: "seats",
});

const vehicleToLoad: SpecItem = { kind: "v2l", label: "On-the-go power", value: "Vehicle to Load" };

const range = (km: string, label: string, note?: string, stripNote?: string): SpecItem => ({
  kind: "range",
  label,
  value: km,
  unit: "km",
  note,
  stripNote,
});

const nedcRange = (km: string) => range(km, "Range", "NEDC");

// ---------------------------------------------------------------------------
// Descriptions (one per spec sheet)
// ---------------------------------------------------------------------------

const ATTO_1_TEXT =
  "An electric hatchback with sleek design, smart tech, strong performance, and energy efficiency — perfect for modern, eco-conscious urban lifestyles.";
const ATTO_2_TEXT =
  "Tech-packed electric crossover blends advanced safety and new energy innovation, offering a smart, seamless, and secure drive for modern urban explorers.";
const ATTO_3_TEXT =
  "The BYD ATTO 3 is a stylish, feature-rich electric SUV designed for urban drivers seeking sustainability, advanced technology, and efficient performance.";
const DOLPHIN_TEXT =
  "Experience the BYD DOLPHIN’s compact design, impressive range, smart technology, and eco-friendly performance — perfect for modern, sustainable urban driving.";
const RACCO_TEXT =
  "Explore key performance statistics, battery capacity, charging capabilities, and advanced driver assistance systems built into the BYD RACCO.";
const RACCO_DYNAMIC_TEXT =
  "Explore key performance statistics, battery capacity, charging capabilities, and safety systems engineered for the Dynamic.";
const SEALION_5_TEXT =
  "BYD Sealion 5 fuses bold design, hybrid power, and smart tech to deliver a dynamic drive that feels effortlessly extraordinary.";
const SEALION_6_TEXT =
  "A Plug-In Hybrid offering an Ocean Aesthetic design, impressive performance, advanced technology, and unimaginable combined range.";
const SEALION_8_DYNAMIC_TEXT =
  "Experience the pinnacle of family travel with distinctive luxury, rapid charging, and advanced monitoring for a secure, high-end journey.";
const SEALION_8_PREMIUM_TEXT =
  "Explore essential range and smart hybrid features designed for your family, highlighting reliable power and comprehensive safety.";
const SHARK_6_TEXT =
  "The BYD SHARK 6 delivers rugged performance, powerful towing capacity, advanced safety, and smart technology — perfect for adventure, and everyday driving.";

// ---------------------------------------------------------------------------
// Variants
// ---------------------------------------------------------------------------

const racco: ModelVariant[] = [
  {
    id: "advanced",
    name: "Advanced",
    description: RACCO_TEXT,
    specs: [
      { kind: "drivetrain", label: "Drivetrain", value: "Front Wheel Drive" },
      { kind: "airbags", label: "Airbags", value: "6", unit: "airbags" },
      fastCharging("25", "30%"),
      battery("Blade Battery"),
      // Supplied as "130" without a unit; mm is the standard unit for ground clearance (to confirm).
      { kind: "groundClearance", label: "Ground clearance", value: "130", unit: "mm" },
      range("320", "Electric range", "Up to", "Up to · electric"),
    ],
  },
  {
    id: "dynamic",
    name: "Dynamic",
    description: RACCO_DYNAMIC_TEXT,
    specs: [
      topSpeed("130"),
      acceleration("4.7", "0–50 km/h"),
      fastCharging("36", "30%"),
      battery("Blade Battery"),
      seating("4"),
      range("210", "Electric range", "Up to", "Up to · electric"),
    ],
  },
  {
    id: "premium",
    name: "Premium",
    description: RACCO_TEXT,
    specs: [
      { kind: "drivetrain", label: "Drivetrain", value: "Front Wheel Drive" },
      { kind: "airbags", label: "Airbags", value: "6", unit: "airbags" },
      fastCharging("25", "30%"),
      battery("Blade Battery"),
      // Supplied as "130" without a unit; mm is the standard unit for ground clearance (to confirm).
      { kind: "groundClearance", label: "Ground clearance", value: "130", unit: "mm" },
      range("320", "Electric range", "Up to", "Up to · electric"),
    ],
  },
];

const atto1Specs = (rangeKm: string): SpecItem[] => [
  topSpeed("130"),
  vehicleToLoad,
  seating("5"),
  battery("BYD Blade Battery"),
  fastCharging("30", "20%"),
  nedcRange(rangeKm),
];

const atto1: ModelVariant[] = [
  { id: "dynamic", name: "Dynamic", description: ATTO_1_TEXT, specs: atto1Specs("300") },
  { id: "premium", name: "Premium", description: ATTO_1_TEXT, specs: atto1Specs("380") },
];

const atto2: ModelVariant[] = [
  {
    id: "standard",
    name: null,
    description: ATTO_2_TEXT,
    specs: [
      topSpeed("160"),
      vehicleToLoad,
      seating("5"),
      battery("BYD Blade Battery"),
      fastCharging("30", "20%"),
      nedcRange("410"),
    ],
  },
];

const dolphinSpecs = (accel: string, rangeKm: string): SpecItem[] => [
  topSpeed("180"),
  acceleration(accel),
  fastCharging("30", "20%"),
  battery("BYD Blade Battery"),
  seating("5"),
  nedcRange(rangeKm),
];

const dolphin: ModelVariant[] = [
  { id: "dynamic-70", name: "Dynamic-70", description: DOLPHIN_TEXT, specs: dolphinSpecs("9.3", "410") },
  { id: "premium-150", name: "Premium-150", description: DOLPHIN_TEXT, specs: dolphinSpecs("7.0", "490") },
  { id: "premium-99", name: "Premium-99", description: DOLPHIN_TEXT, specs: dolphinSpecs("9.3", "490") },
];

const sealion5Specs = (rangeKm: string): SpecItem[] => [
  { kind: "fuelTank", label: "Fuel tank", value: "52", unit: "L" },
  // Supplied as "170" without a unit; km/h as for every other top speed (to confirm).
  topSpeed("170"),
  seating("5"),
  battery("BYD Blade Battery"),
  vehicleToLoad,
  range(rangeKm, "Combined range", "NEDC", "Combined · NEDC"),
];

const sealion5: ModelVariant[] = [
  { id: "dynamic", name: "Dynamic", description: SEALION_5_TEXT, specs: sealion5Specs("1001") },
  { id: "premium", name: "Premium", description: SEALION_5_TEXT, specs: sealion5Specs("1030") },
];

const sealion6Specs = (accel: string, rangeKm: string): SpecItem[] => [
  topSpeed("180"),
  acceleration(accel),
  fastCharging("30", "20%"),
  battery("BYD Blade Battery"),
  seating("5"),
  range(rangeKm, "Combined range", undefined, "Combined"),
];

const sealion6: ModelVariant[] = [
  { id: "premium", name: "Premium", description: SEALION_6_TEXT, specs: sealion6Specs("5.9", "961") },
  { id: "superior", name: "Superior", description: SEALION_6_TEXT, specs: sealion6Specs("8.5", "1092") },
];

const shark6: ModelVariant[] = [
  {
    id: "premium",
    name: "Premium",
    description: SHARK_6_TEXT,
    specs: [
      topSpeed("180"),
      acceleration("5.7"),
      fastCharging("30", "20%"),
      battery("BYD Blade Battery"),
      seating("5"),
      range("800", "Combined range", undefined, "Combined"),
    ],
  },
];

const sealion8Specs = (accel: string, chargeMin: string, rangeKm: string): SpecItem[] => [
  topSpeed("200"),
  acceleration(accel),
  fastCharging(chargeMin, "30%"),
  battery("BYD Blade Battery"),
  seating("7"),
  range(rangeKm, "Range per charge", "Up to"),
];

const sealion8: ModelVariant[] = [
  {
    id: "dynamic",
    name: "Dynamic",
    description: SEALION_8_DYNAMIC_TEXT,
    specs: sealion8Specs("8.6", "21", "1118"),
  },
  {
    id: "premium",
    name: "Premium",
    description: SEALION_8_PREMIUM_TEXT,
    specs: sealion8Specs("4.9", "26", "1017"),
  },
];

const atto3Specs = (rangeKm: string): SpecItem[] => [
  topSpeed("180"),
  acceleration("10.1"),
  fastCharging("30", "20%"),
  battery("BYD Blade Battery"),
  seating("5"),
  nedcRange(rangeKm),
];

const atto3: ModelVariant[] = [
  { id: "advanced", name: "Advanced", description: ATTO_3_TEXT, specs: atto3Specs("410") },
  { id: "superior", name: "Superior", description: ATTO_3_TEXT, specs: atto3Specs("480") },
];

// ---------------------------------------------------------------------------
// Models
// ---------------------------------------------------------------------------

function model(
  slug: string,
  name: string,
  colourName: string,
  accent: string,
  variants: ModelVariant[],
): Model {
  return { slug, name, fullName: `BYD ${name}`, colourName, accent, variants, media: modelMediaPaths(slug) };
}

/** In alphabetical order – this is the order of the rail, the counter and prev / next. */
export const MODELS: readonly Model[] = [
  model("atto-1", "Atto 1", "Sprout Green", "#A3C45A", atto1),
  model("atto-2", "Atto 2", "Bubblegum Green", "#8FD9C4", atto2),
  model("atto-3", "Atto 3", "Red", "#C8102E", atto3),
  model("dolphin", "Dolphin", "Atlantis Grey", "#6B7280", dolphin),
  model("racco", "Racco", "Midnight Blue", "#1E2A4A", racco),
  model("sealion-5", "Sealion 5", "Cosmos Black", "#8A92A0", sealion5),
  model("sealion-6", "Sealion 6", "Arctic White", "#E8ECEF", sealion6),
  model("sealion-8", "Sealion 8", "Dark Aquamarine", "#2E6B66", sealion8),
  model("shark-6", "Shark 6", "Outback Orange", "#E07A2F", shark6),
];

/** Model selected when the kiosk starts: the first in the list. */
export const DEFAULT_MODEL_INDEX = 0;

export function getModelIndex(slug: string): number {
  return MODELS.findIndex((m) => m.slug === slug);
}

/** Wraps an index into the model list (used for prev / next). */
export function wrapModelIndex(index: number): number {
  return (index + MODELS.length) % MODELS.length;
}

/** The selected variant, clamped so a stale index never breaks rendering. */
export function getVariant(model: Model, variantIndex: number): ModelVariant {
  return model.variants[Math.min(Math.max(variantIndex, 0), model.variants.length - 1)];
}

// ---------------------------------------------------------------------------
// 03 Models key-spec strip
// ---------------------------------------------------------------------------

/** Order in which specs are preferred for the strip. Only numeric specs (with a unit) qualify. */
const STRIP_PRIORITY: readonly SpecKind[] = [
  "range",
  "topSpeed",
  "acceleration",
  "charging",
  "seats",
  "groundClearance",
  "fuelTank",
  "airbags",
];

/** Short labels for the strip (full labels are used in 04b Details Panel). */
export const STRIP_LABEL: Partial<Record<SpecKind, string>> = {
  range: "Range",
  topSpeed: "Top speed",
  acceleration: "Acceleration",
  charging: "Charging",
  seats: "Seating",
  groundClearance: "Clearance",
  fuelTank: "Fuel tank",
  airbags: "Airbags",
};

/** The 3 key specs shown on 03 Models for a variant. */
export function stripSpecs(variant: ModelVariant, count = 3): SpecItem[] {
  return STRIP_PRIORITY.map((kind) => variant.specs.find((s) => s.kind === kind && s.unit))
    .filter((s): s is SpecItem => Boolean(s))
    .slice(0, count);
}
