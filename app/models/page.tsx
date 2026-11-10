import type { Metadata } from "next";
import { ModelsScreen } from "@/components/models/ModelsScreen";
import { ScreenTransition } from "@/components/ui/ScreenTransition";

export const metadata: Metadata = {
  title: "Models",
  description: "Every BYD model available in Sri Lanka, with specs for each version.",
  openGraph: { type: "website", siteName: "BYD Showroom Sri Lanka", locale: "en_LK", title: "Models | BYD Sri Lanka", url: "/models" },
  alternates: { canonical: "/models" },
};

/** 03 Models */
export default function ModelsPage() {
  return (
    <ScreenTransition duration={700}>
      <ModelsScreen />
    </ScreenTransition>
  );
}
