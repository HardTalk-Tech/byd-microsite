"use client";

import { RestartingScreen } from "@/components/kiosk/RestartingScreen";

/** The whole app (layout) crashed: same "Restarting…" screen with its own document. */
export default function GlobalError() {
  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0A0A0B" }}>
        <RestartingScreen />
      </body>
    </html>
  );
}
