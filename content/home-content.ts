import type { BatteryPoint, CommonFeature } from "@/lib/types/content";

/**
 * 02 Home – Blade Battery section, over the Blade Battery film.
 * REVIEW (client): lead line condensed from the earlier section text; no figures claimed.
 */
export const BLADE_BATTERY_SECTION = {
  eyebrow: "BYD Blade Battery",
  title: "The battery is the structure",
  lead: "Long, thin LFP cells fit straight into the pack, with no bulky modules in between.", // REVIEW
} as const;

/** 02 Home – Blade Battery points (copy from the design). */
export const BATTERY_POINTS: readonly BatteryPoint[] = [
  {
    title: "LFP chemistry",
    description:
      "Lithium iron phosphate cells, chosen for thermal stability and a long service life.",
  },
  {
    title: "Cell-to-pack design",
    description:
      "Blade cells sit directly in the pack with no module layer, freeing up space for energy.",
  },
  {
    title: "Safety tested",
    description:
      "Designed to pass the nail penetration test, one of the toughest battery abuse tests.",
  },
];

/** 02 Home – "In every BYD" items. XXX values are placeholders (TBC). */
export const COMMON_FEATURES: readonly CommonFeature[] = [
  {
    title: "Blade Battery",
    description: "Every model on display today is built around Blade Battery cells.",
  },
  {
    title: "Vehicle-to-Load",
    description: "Power appliances, tools and devices directly from the car’s battery.",
  },
  {
    title: "Over-the-air updates",
    description: "New features and improvements arrive by software update, without a service visit.",
  },
  {
    title: "DC fast charging",
    description: "Up to XXX kW DC charging, depending on model.",
  },
  {
    title: "Driver assistance",
    description: "Adaptive cruise, lane support and a 360° camera, depending on model.",
  },
  {
    title: "Battery warranty",
    description: "X years or XXX,XXX km battery warranty in Sri Lanka.",
  },
];
