import type { Metadata } from "next";
import { JetBrains_Mono, Michroma, Sora } from "next/font/google";
import { KioskProvider } from "@/lib/kiosk/KioskProvider";
import { KioskStage } from "@/components/ui/KioskStage";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { IdleWarning } from "@/components/overlays/IdleWarning";
import { TestDriveFormOverlay } from "@/components/overlays/TestDriveFormOverlay";
import { TestDriveModal } from "@/components/overlays/TestDriveModal";
import { TopNav } from "@/components/overlays/TopNav";
import "./globals.css";

const michroma = Michroma({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-michroma",
});

const sora = Sora({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

const jetBrainsMono = JetBrains_Mono({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

// Full metadata, manifest and OG images come in Stage 4.
export const metadata: Metadata = {
  title: "BYD Showroom Sri Lanka",
  description: "BYD Sri Lanka showroom kiosk.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${michroma.variable} ${sora.variable} ${jetBrainsMono.variable}`}>
      <body>
        <KioskProvider>
          <KioskStage>
            {children}
            <TopNav />
            <TestDriveModal />
            <TestDriveFormOverlay />
            <IdleWarning />
            <LoadingScreen />
          </KioskStage>
        </KioskProvider>
      </body>
    </html>
  );
}
