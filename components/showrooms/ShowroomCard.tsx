import type { Showroom } from "@/lib/types/content";
import { QrCode } from "@/components/ui/QrCode";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="text-[22px] uppercase tracking-[0.18em] text-ink-4">{label}</div>
      <div className="text-[26px]">{value}</div>
    </div>
  );
}

/** 05 Showrooms – details of the selected showroom. */
export function ShowroomCard({ showroom }: { showroom: Showroom }) {
  return (
    <div className="absolute left-24 top-[300px] flex w-[504px] flex-col gap-[22px] rounded-[28px] border border-[rgba(201,162,74,0.4)] bg-[rgba(22,23,26,0.55)] px-10 py-9 shadow-[inset_0_1px_0_rgba(255,255,255,0.06),inset_0_0_40px_rgba(201,162,74,0.06),0_24px_60px_rgba(0,0,0,0.45)] backdrop-glass">
      <div className="flex flex-col gap-[10px]">
        <div className="text-[22px] uppercase tracking-[0.3em] text-gold">BYD {showroom.type}</div>
        <div className="font-display text-[40px] leading-[1.1]">{showroom.city}</div>
      </div>
      <div className="h-px" style={{ background: "linear-gradient(90deg, rgba(201,162,74,0.5), transparent)" }} />
      <div className="flex flex-col gap-5">
        <DetailRow label="Address" value={showroom.address} />
        <DetailRow label="Phone" value={showroom.phone} />
        <DetailRow label="Opening hours" value={showroom.hours} />
      </div>
      <div className="flex items-center gap-6">
        <QrCode label="[QR: directions]" size={132} value={showroom.directionsUrl} />
        <div className="text-[24px] leading-[1.3] text-ink-2">Scan for directions</div>
      </div>
    </div>
  );
}
