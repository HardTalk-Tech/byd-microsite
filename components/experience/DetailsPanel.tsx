"use client";

import type { ReactNode } from "react";
import { getVariant } from "@/content/models";
import { SITE_SETTINGS } from "@/content/site-settings";
import { rgba } from "@/lib/style/rgba";
import type { Model } from "@/lib/types/content";
import { AccentDot } from "@/components/ui/AccentDot";
import { CircleIconButton } from "@/components/ui/CircleIconButton";
import { CloseIcon } from "@/components/ui/icons/CloseIcon";
import { QrCode } from "@/components/ui/QrCode";
import { VariantSelector } from "@/components/ui/VariantSelector";
import { VehicleName } from "@/components/ui/VehicleName";
import { DetailsGallery } from "./DetailsGallery";
import { DetailsSpecGrid } from "./DetailsSpecGrid";

interface DetailsPanelProps {
  model: Model;
  variantIndex: number;
  open: boolean;
  onClose: () => void;
  onSelectVariant: (index: number) => void;
  onOpenGallery: (index: number) => void;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <div className="text-[22px] uppercase tracking-[0.22em] text-ink-4">{children}</div>;
}

/** 04b Details Panel – slides in from the right over 04 Experience. */
export function DetailsPanel({
  model,
  variantIndex,
  open,
  onClose,
  onSelectVariant,
  onOpenGallery,
}: DetailsPanelProps) {
  const variant = getVariant(model, variantIndex);

  return (
    <div
      data-screen-label="04b Details Panel"
      inert={!open}
      className="absolute inset-y-0 right-0 w-[768px] border-l border-[rgba(201,162,74,0.4)] bg-[rgba(16,17,20,0.78)] backdrop-glass-heavy transition-transform duration-650 ease-kiosk"
      style={{
        transform: `translateX(${open ? "0%" : "104%"})`,
        boxShadow:
          "-30px 0 80px rgba(0,0,0,0.5), inset 1px 0 0 rgba(232,200,117,0.15), inset 0 0 60px rgba(201,162,74,0.05)",
      }}
    >
      <div
        className="pointer-events-none absolute right-[-120px] top-[-120px] h-[520px] w-[620px]"
        style={{ background: `radial-gradient(ellipse at 50% 50%, ${rgba(model.accent, 0.35)} 0%, transparent 65%)` }}
      />

      <div className="scrollbar-none absolute inset-0 flex flex-col gap-11 overflow-y-auto px-14 pt-14 pb-[72px]">
        <div className="flex flex-col gap-[14px] pr-24">
          <div className="text-[22px] font-medium uppercase tracking-[0.32em] text-gold">Details</div>
          <VehicleName
            model={model}
            short
            textClassName="font-display text-[56px] leading-[1.05]"
            artworkHeight={36}
            artworkMaxWidth={315}
          />
          <div className="flex items-center gap-3 text-[24px] text-ink-2">
            <AccentDot colour={model.accent} size={16} glow={14} />
            {model.colourName}
          </div>
        </div>

        {(model.variants.length > 1 || variant.name) && (
          <div className="flex flex-col gap-[18px]">
            <SectionLabel>Variant</SectionLabel>
            <VariantSelector
              variants={model.variants}
              selectedIndex={variantIndex}
              onSelect={onSelectVariant}
              compact
            />
          </div>
        )}

        <p className="text-[24px] leading-[1.5] text-pretty text-ink-2">{variant.description}</p>

        <div className="flex flex-col gap-[18px]">
          <SectionLabel>Specifications</SectionLabel>
          <DetailsSpecGrid variant={variant} />
        </div>

        <div className="flex flex-col gap-[18px]">
          <SectionLabel>Gallery</SectionLabel>
          <DetailsGallery model={model} onOpen={onOpenGallery} />
        </div>

        <div className="flex items-center gap-9 rounded-3xl border border-[rgba(201,162,74,0.35)] bg-[rgba(201,162,74,0.06)] p-7">
          <QrCode label="[QR: test drive]" size={190} value={SITE_SETTINGS.testDriveFormUrl} />
          <div className="flex flex-col gap-[14px]">
            <div className="text-[32px] font-medium leading-[1.25] text-pretty">Scan to book a test drive</div>
            <div className="text-[22px] text-ink-4">Hotline {SITE_SETTINGS.contact.phone}</div>
          </div>
        </div>
      </div>

      <CircleIconButton variant="close" label="Close details" onClick={onClose} className="absolute right-10 top-11">
        <CloseIcon size={28} />
      </CircleIconButton>
    </div>
  );
}
