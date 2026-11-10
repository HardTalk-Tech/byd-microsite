"use client";

import { SITE_SETTINGS } from "@/content/site-settings";
import { useKiosk } from "@/lib/kiosk/KioskProvider";
import { useOnlineStatus } from "@/lib/kiosk/useOnlineStatus";
import { CircleIconButton } from "@/components/ui/CircleIconButton";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { GlassButton } from "@/components/ui/GlassButton";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { QrCode } from "@/components/ui/QrCode";
import { SweepShine } from "@/components/ui/SweepShine";

/** 06 Test Drive Modal – QR code and hotline; available from every main screen. */
export function TestDriveModal() {
  const { state, actions } = useKiosk();
  const online = useOnlineStatus();
  const open = state.modalOpen;
  const canOpenForm = online && SITE_SETTINGS.testDriveFormEmbeddable;

  return (
    <div
      data-screen-label="06 Test Drive Modal"
      inert={!open}
      onClick={actions.closeModal}
      className="absolute inset-0 bg-[rgba(5,5,6,0.62)] backdrop-blur-[10px] transition-opacity duration-500"
      style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Book Test Drive"
        onClick={(e) => e.stopPropagation()}
        className="absolute left-[420px] top-[calc(250px+var(--stage-shift))] flex h-[620px] w-[1080px] items-center gap-16 overflow-hidden rounded-[36px] border border-[rgba(201,162,74,0.45)] bg-[rgba(22,23,26,0.72)] p-16 backdrop-glass-heavy transition-transform duration-500 ease-kiosk"
        style={{
          transform: `scale(${open ? 1 : 0.96})`,
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.07), inset 0 0 60px rgba(201,162,74,0.07), 0 40px 120px rgba(0,0,0,0.6)",
        }}
      >
        <SweepShine variant="slow" />
        <div className="relative flex-none">
          <QrCode label="[QR: test drive]" size={380} value={SITE_SETTINGS.testDriveFormUrl} />
        </div>
        <div className="relative flex flex-col gap-7">
          <Eyebrow>Book Test Drive</Eyebrow>
          <div className="text-[44px] leading-[1.2] font-normal text-pretty">
            Scan with your phone to book your test drive
          </div>
          <div className="flex flex-col gap-[6px]">
            <div className="text-[22px] uppercase tracking-[0.24em] text-ink-4">Or call the hotline</div>
            <div className="font-display text-[30px] whitespace-nowrap text-gold-light">
              {SITE_SETTINGS.contact.phone}
            </div>
            <div className="text-[22px] text-ink-4">Call centre {SITE_SETTINGS.contact.callCentreHours}</div>
          </div>
          {canOpenForm && (
            <GlassButton
              onClick={actions.openForm}
              className="h-[72px] self-start border-white/18 bg-white/4 px-9 text-[22px] tracking-[0.14em]"
            >
              Open form here
            </GlassButton>
          )}
        </div>
        <CircleIconButton variant="close" label="Close" onClick={actions.closeModal} className="absolute right-8 top-8">
          <CloseIcon size={28} />
        </CircleIconButton>
      </div>
    </div>
  );
}
