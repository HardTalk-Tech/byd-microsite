"use client";

import { useEffect } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";

const RESTART_AFTER_MS = 5000;

/**
 * Shown when something breaks (Stage 5). The kiosk is unattended, so it never shows
 * an error – it says "Restarting…" and reloads the start screen after 5 s.
 * Self-contained styles: it must work even if the app's CSS did not load.
 */
export function RestartingScreen() {
  useEffect(() => {
    const t = setTimeout(() => location.replace("/"), RESTART_AFTER_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      role="alert"
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4vh",
        background: "radial-gradient(ellipse at 50% 46%, #16171A 0%, #0A0A0B 62%)",
        color: "#F2F0EB",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <BrandLogo width={240} height={51} />
      <div style={{ fontSize: "2.4vw", fontWeight: 300, letterSpacing: "0.02em" }}>Restarting…</div>
      <div style={{ fontSize: "1.2vw", color: "#8A8D95", letterSpacing: "0.06em" }}>One moment please</div>
    </div>
  );
}
