import type { Metadata } from "next";
import { ShowroomsScreen } from "@/components/showrooms/ShowroomsScreen";
import { ScreenTransition } from "@/components/ui/ScreenTransition";

export const metadata: Metadata = {
  title: "Showrooms",
  description: "Find a BYD showroom near you in Sri Lanka – addresses, opening hours and directions.",
  openGraph: { type: "website", siteName: "BYD Showroom Sri Lanka", locale: "en_LK", title: "Showrooms | BYD Sri Lanka", url: "/showrooms" },
  alternates: { canonical: "/showrooms" },
};

/** 05 Showrooms */
export default function ShowroomsPage() {
  return (
    <ScreenTransition duration={700}>
      <ShowroomsScreen />
    </ScreenTransition>
  );
}
