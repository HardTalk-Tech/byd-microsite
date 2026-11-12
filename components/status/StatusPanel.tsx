"use client";

import { SITE_SETTINGS } from "@/content/site-settings";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { useOnlineStatus } from "@/lib/kiosk/useOnlineStatus";
import { CircleIconButton } from "@/components/ui/CircleIconButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";

/**
 * Read-only kiosk status (opened by tapping the BYD logo 5 times). For staff to check
 * the kiosk is ready before going offline. Not in the design – built in its style.
 */
export function StatusPanel() {
  const { state, actions } = useKiosk();
  const online = useOnlineStatus();
  const { offline } = state;

  const videos = !offline.active
    ? "Not available in this build"
    : offline.total === 0
      ? "No videos to save yet"
      : `${offline.cached} of ${offline.total}`;
  const allSaved = offline.active && offline.cached >= offline.total;

  const rows: { label: string; value: string; ok: boolean }[] = [
    { label: "Videos saved for offline", value: videos, ok: allSaved },
    { label: "Network", value: online ? "Online" : "Offline", ok: true },
    { label: "Content version", value: SITE_SETTINGS.contentVersion, ok: true },
  ];

  return (
    <div data-screen-label="Kiosk Status" className="absolute inset-0 z-50 bg-[rgba(6,6,7,0.94)] backdrop-blur-[12px]">
      <Eyebrow className="absolute left-[120px] top-[50px]">Kiosk status</Eyebrow>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex w-[880px] flex-col">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between border-b border-white/8 py-6">
              <span className="text-[28px] text-ink-3">{row.label}</span>
              <span className={`text-[32px] ${row.ok ? "text-ink" : "text-gold-light"}`}>{row.value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Last, so it sits above the full-screen centring layer and receives taps. */}
      <CircleIconButton variant="close" label="Close status" onClick={actions.closeStatus} className="absolute right-12 top-6">
        <CloseIcon size={28} />
      </CircleIconButton>
    </div>
  );
}
