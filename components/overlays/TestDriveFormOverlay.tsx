"use client";

import { SITE_SETTINGS } from "@/content/site-settings";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { useOnlineStatus } from "@/lib/kiosk/useOnlineStatus";
import { CircleIconButton } from "@/components/ui/CircleIconButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

/**
 * Test-drive form in a full-screen iframe ("Open form here").
 * Not in the design – built in its style (plan §1.4). Only shown while online.
 */
export function TestDriveFormOverlay() {
  const { state, actions } = useKiosk();
  const online = useOnlineStatus();
  const open = state.formOpen && online;
  const url = SITE_SETTINGS.testDriveFormUrl;

  return (
    <div
      data-screen-label="Test Drive Form"
      inert={!open}
      className="absolute inset-0 bg-[rgba(6,6,7,0.94)] backdrop-blur-[12px] transition-opacity duration-500"
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
    >
      <Eyebrow className="absolute left-[120px] top-[50px]">Book Test Drive</Eyebrow>
      <div className="absolute inset-x-[120px] top-[124px] bottom-14 overflow-hidden rounded-3xl border border-white/8 bg-kiosk-bg">
        {url ? (
          open && <iframe src={url} title="Test drive booking form" className="h-full w-full border-0 bg-white" />
        ) : (
          <MediaPlaceholder kind="iframe" label="[IFRAME: test-drive form – URL TBC]" radius={24} />
        )}
      </div>
      <CircleIconButton variant="close" label="Close form" onClick={actions.closeForm} className="absolute right-12 top-6">
        <CloseIcon size={28} />
      </CircleIconButton>
    </div>
  );
}
