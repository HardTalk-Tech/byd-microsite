interface LoadingProgressRingProps {
  /** 0 – 1 */
  progress: number;
}

const RADIUS = 150;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** 320 px gold progress ring with the percentage in the middle. */
export function LoadingProgressRing({ progress }: LoadingProgressRingProps) {
  return (
    <div className="relative h-80 w-80">
      <svg width="320" height="320" viewBox="0 0 320 320" className="absolute inset-0 overflow-visible">
        <defs>
          <linearGradient id="ringGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#C9A24A" />
            <stop offset="1" stopColor="#E8C875" />
          </linearGradient>
        </defs>
        <circle cx="160" cy="160" r={RADIUS} fill="none" stroke="#24262B" strokeWidth="2" />
        <circle
          cx="160"
          cy="160"
          r={RADIUS}
          fill="none"
          stroke="url(#ringGold)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${(CIRCUMFERENCE * progress).toFixed(1)} ${CIRCUMFERENCE.toFixed(1)}`}
          transform="rotate(-90 160 160)"
          style={{
            filter: "drop-shadow(0 0 10px rgba(232,200,117,0.6))",
            transition: "stroke-dasharray 200ms linear",
          }}
        />
        <circle cx="160" cy="160" r="132" fill="none" stroke="rgba(201,162,74,0.12)" strokeWidth="1" />
      </svg>
      <div className="absolute inset-0 flex items-baseline justify-center gap-[6px] pt-[126px]">
        <span className="font-display text-[64px] text-ink">{Math.round(progress * 100)}</span>
        <span className="font-display text-[26px] text-gold">%</span>
      </div>
    </div>
  );
}
