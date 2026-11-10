"use client";

import dynamic from "next/dynamic";
import { useKiosk } from "@/lib/kiosk/KioskProvider";

/** Loaded only when opened (keeps the kiosk bundle lean). */
const StatusPanel = dynamic(() => import("./StatusPanel").then((m) => m.StatusPanel), { ssr: false });

/** Kiosk status screen – opened by tapping the BYD logo in the nav 5 times (see TopNav). */
export function StatusLayer() {
  const { state } = useKiosk();
  return state.statusOpen ? <StatusPanel /> : null;
}
