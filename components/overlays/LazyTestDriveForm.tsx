"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useKiosk } from "@/lib/kiosk/KioskProvider";

const TestDriveFormOverlay = dynamic(
  () => import("./TestDriveFormOverlay").then((m) => m.TestDriveFormOverlay),
  { ssr: false },
);

/** Loads the form overlay on first open only (Stage 5), then keeps it for its fade-out. */
export function LazyTestDriveForm() {
  const { state } = useKiosk();
  const [wanted, setWanted] = useState(false);
  if (state.formOpen && !wanted) setWanted(true);
  return wanted ? <TestDriveFormOverlay /> : null;
}
