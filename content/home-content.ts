import type { BatteryPoint, ChassisPart, CommonFeature } from "@/lib/types/content";

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

/** 02 Home – interactive chassis (public/media/home/chassis.webp, trimmed from the client's battery.png). */
export const CHASSIS_IMAGE = { path: "home/chassis.webp", width: 1221, height: 721 } as const;

/**
 * 02 Home – tappable chassis parts. Outlines are in px of CHASSIS_IMAGE.
 * REVIEW (client): headline and part texts were drafted for the kiosk – no specs or
 * figures are claimed; please confirm or replace the wording.
 */
export const CHASSIS_SECTION = {
  eyebrow: "Under the skin", // REVIEW
  title: "Power, laid out", // REVIEW
  hint: "Tap a part to explore", // REVIEW
} as const;

export const CHASSIS_PARTS: readonly ChassisPart[] = [
  {
    title: "Engine & transmission", // REVIEW
    description:
      "The petrol engine and transmission sit up front, working together with the electric motors in the plug-in hybrid system.", // REVIEW
    outline: [
      [118, 96], [140, 40], [178, 16], [268, 14], [300, 58], [332, 108], [402, 146], [458, 190],
      [478, 246], [446, 300], [392, 316], [322, 294], [254, 254], [206, 206], [160, 192], [128, 150],
    ],
  },
  {
    title: "Blade Battery pack", // REVIEW
    description:
      "Long, thin Blade cells packed into one flat battery that sits low in the chassis, between the axles.", // REVIEW
    outline: [[492, 222], [724, 288], [606, 420], [376, 332]],
  },
  {
    title: "Fuel tank", // REVIEW
    description:
      "Behind the battery, the fuel tank feeds the engine for longer journeys in hybrid mode.", // REVIEW
    outline: [[612, 412], [642, 330], [702, 300], [782, 298], [832, 328], [822, 372], [760, 384], [700, 404], [652, 424]],
  },
  {
    title: "Rear electric drive", // REVIEW
    description:
      "An electric drive unit on the rear axle turns battery power straight into motion at the rear wheels.", // REVIEW
    outline: [[820, 372], [880, 340], [982, 344], [1032, 380], [1042, 432], [992, 472], [900, 482], [840, 452], [814, 410]],
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
