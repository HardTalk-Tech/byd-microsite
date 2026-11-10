/** "Swipe" hint with a sliding gold dot (design keyframes kSwipe + kBreath). */
export function SwipeHint() {
  return (
    <div data-motion="loop" className="flex items-center gap-[22px]" style={{ animation: "kBreath 3s ease-in-out infinite" }}>
      <div className="relative h-[2px] w-[140px] rounded-[2px] bg-[rgba(232,200,117,0.25)]">
        <div
          data-motion="loop"
          className="absolute left-0 top-[-7px] h-4 w-4 rounded-full bg-gold-light shadow-[0_0_18px_#E8C875]"
          style={{ animation: "kSwipe 1.8s ease-in-out infinite alternate" }}
        />
      </div>
      <div className="text-[22px] uppercase tracking-[0.3em] text-gold-light">Swipe</div>
    </div>
  );
}
