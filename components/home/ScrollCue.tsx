/** Gold dot sliding down a short line (design keyframe kScrollCue). */
export function ScrollCue() {
  return (
    <div className="relative h-14 w-[2px] rounded-[2px] bg-[rgba(232,200,117,0.25)]" aria-hidden="true">
      <div
        data-motion="loop"
        className="absolute left-[-5px] top-0 h-3 w-3 rounded-full bg-gold-light shadow-[0_0_16px_#E8C875]"
        style={{ animation: "kScrollCue 2.2s ease-in-out infinite" }}
      />
    </div>
  );
}
