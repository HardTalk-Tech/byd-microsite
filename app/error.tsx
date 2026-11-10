"use client";

import { RestartingScreen } from "@/components/kiosk/RestartingScreen";

/** A screen crashed: show "Restarting…" and go back to the start (Stage 5). */
export default function Error() {
  return <RestartingScreen />;
}
