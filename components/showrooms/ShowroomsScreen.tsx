"use client";

import type { ReactNode } from "react";
import { SHOWROOMS } from "@/content/showrooms";
import { SITE_SETTINGS } from "@/content/site-settings";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { DesignFrame } from "@/components/ui/DesignFrame";
import { GridBackdrop } from "@/components/ui/GridBackdrop";
import { QrCode } from "@/components/ui/QrCode";
import { ShowroomCard } from "./ShowroomCard";
import { ShowroomList } from "./ShowroomList";
import { SriLankaMap } from "./SriLankaMap";

/** One label / value pair in the bottom contact row; items after the first get a divider. */
function ContactItem({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-[6px] border-white/10 pr-8 [&+&]:border-l [&+&]:pl-8">
      <div className="text-[22px] uppercase tracking-[0.3em] text-ink-4">{label}</div>
      <div className="flex h-9 items-baseline text-[26px] whitespace-nowrap text-ink">{children}</div>
    </div>
  );
}

/** 05 Showrooms – map, details card, list and main contact details. */
export function ShowroomsScreen() {
  const { state, actions } = useKiosk();
  const selected = state.showroomIndex;
  const { contact } = SITE_SETTINGS;

  return (
    <div
      data-screen-label="05 Showrooms"
      className="absolute inset-0"
      style={{ background: "radial-gradient(ellipse at 47% 50%, #131416 0%, #0A0A0B 60%)" }}
    >
      <GridBackdrop lineAlpha={0.025} mask="ellipse at 47% 50%, #000 0%, transparent 60%" />

      <DesignFrame>
        <div className="absolute left-24 top-[176px] flex flex-col gap-[14px]">
        <h1 className="font-display text-[64px] leading-none">Showrooms</h1>
        <div className="text-[24px] text-ink-4">Tap a pin or a name for details</div>
      </div>

      <ShowroomCard showroom={SHOWROOMS[selected]} />
      <SriLankaMap selectedIndex={selected} onSelect={actions.selectShowroom} />
      <ShowroomList selectedIndex={selected} onSelect={actions.selectShowroom} />
      </DesignFrame>

      {/* Pinned to the real bottom edge (outside the centred frame). */}

      <div className="absolute left-24 bottom-10 flex items-start">
        <ContactItem label="Hotline">
          <span className="font-display text-gold-light">{contact.phone}</span>
          <span className="ml-4 text-[22px] text-ink-4">{contact.callCentreHours}</span>
        </ContactItem>
        <ContactItem label="Email">{contact.email}</ContactItem>
        <ContactItem label="Head office">{contact.headOffice.address}</ContactItem>
      </div>
      <div className="absolute right-24 bottom-8 flex items-center gap-[22px]">
        <div className="text-right text-[22px] leading-[1.3] text-ink-2">
          Scan to book
          <br />a test drive
        </div>
        <QrCode label="[QR: test drive]" size={104} value={SITE_SETTINGS.testDriveFormUrl} />
      </div>
    </div>
  );
}
