import type { Metadata, Viewport } from "next";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site/site-url";
import { STAGE_BOOT_SCRIPT } from "@/lib/kiosk/stage-math";
import { JetBrains_Mono, Michroma, Sora } from "next/font/google";
import { KioskProvider } from "@/lib/kiosk/KioskProvider";
import { KioskStage } from "@/components/ui/KioskStage";
import { LoadingScreen } from "@/components/loading/LoadingScreen";
import { AutoTour } from "@/components/kiosk/AutoTour";
import { KioskGuards } from "@/components/kiosk/KioskGuards";
import { LazyTestDriveForm } from "@/components/overlays/LazyTestDriveForm";
import { StatusLayer } from "@/components/status/StatusLayer";
import { IdleWarning } from "@/components/overlays/IdleWarning";
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

// Stage 4: metadata, link previews (app/opengraph-image.tsx) and the installable app (app/manifest.ts).
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: "%s | BYD Sri Lanka" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: "/",
    locale: "en_LK",
  },
  twitter: { card: "summary_large_image", title: SITE_NAME, description: SITE_DESCRIPTION },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "256x256" }],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180" }],
  },
  appleWebApp: { capable: true, title: "BYD Showroom", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false, email: false, address: false },
};

// Kiosk: no pinch / double-tap zoom (Stage 5 lock-down).
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#0A0A0B",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${michroma.variable} ${sora.variable} ${jetBrainsMono.variable}`}>
      <head>
        {/* Sizes the kiosk canvas before the first paint (no layout shift). */}
        <script dangerouslySetInnerHTML={{ __html: STAGE_BOOT_SCRIPT }} />
      </head>
      <body>
        <KioskProvider>
          <KioskStage>
            {children}
            <TopNav />
            <TestDriveModal />
            <LazyTestDriveForm />
            <IdleWarning />
            <LoadingScreen />
            <StatusLayer />
            <KioskGuards />
            <AutoTour />
          </KioskStage>
        </KioskProvider>
      </body>
    </html>
  );
}
