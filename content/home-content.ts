import type { BatteryPoint, CommonFeature, PlatformHotspot } from "@/lib/types/content";

/** 02 Home – Blade Battery cards (copy from the design). */
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

/** 02 Home – e-Platform 3.0 hotspots. x / y = marker centre in the image box (px). */
export const PLATFORM_HOTSPOTS: readonly PlatformHotspot[] = [
  {
    title: "Blade Battery",
    description:
      "Blade cells form part of the floor structure, adding rigidity while storing energy.",
    x: 520,
    y: 430,
  },
  {
    title: "8-in-1 electric powertrain",
    description:
      "Motor, gearbox, inverter, on-board charger and control units combined in one compact unit.",
    x: 230,
    y: 330,
  },
  {
    title: "Heat pump thermal management",
    description:
      "One system manages cabin, battery and drivetrain temperatures to use energy efficiently.",
    x: 820,
    y: 250,
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
