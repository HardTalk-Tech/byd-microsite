"use client";

import { useEffect, useRef, useState } from "react";
import { experienceVideo } from "@/lib/media/experience-video";
import { mediaUrl, placeholderLabel } from "@/lib/media/media-url";
import type { ClipKey, Model } from "@/lib/types/content";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";

/** Colour wash the design lays over each clip. */
const CLIP_OVERLAY: Record<ClipKey, string> = {
  "exterior-day": "transparent",
  "interior-day": "rgba(40,30,15,0.12)",
  "exterior-night": "linear-gradient(180deg, rgba(8,12,30,0.55), rgba(4,6,14,0.35))",
  "interior-night": "linear-gradient(180deg, rgba(8,12,30,0.55), rgba(4,6,14,0.35))",
};

const CROSSFADE_MS = 900;
/** If the next clip isn't ready by then, switch anyway (its placeholder shows until it loads). */
const SWITCH_TIMEOUT_MS = 1500;

type SlotIndex = 0 | 1;

interface StageState {
  /** Clip loaded in each of the two stacked slots. */
  clips: [ClipKey, ClipKey];
  /** Visible slot. */
  active: SlotIndex;
  /** Slot that is loading the next clip, waiting to fade in. */
  pending: SlotIndex | null;
  /** Clip the stage was last asked to show. */
  requested: ClipKey;
}

interface ExperienceVideoStageProps {
  model: Model;
  clip: ClipKey;
}

/**
 * Full-screen clip player with two stacked slots.
 * A new clip loads into the hidden slot, jumps to the visible clip's
 * currentTime (same drive, another camera), and fades in once it can play,
 * so there is never a black frame. Placeholders swap straight away.
 * The labelled placeholder sits under every video: it shows while a link is slow to
 * load, and stays when a link fails (e.g. a dummy link).
 */
export function ExperienceVideoStage({ model, clip }: ExperienceVideoStageProps) {
  const [stage, setStage] = useState<StageState>({
    clips: [clip, clip],
    active: 0,
    pending: null,
    requested: clip,
  });
  /** URLs that failed to load; their slots show the placeholder instead. */
  const [failed, setFailed] = useState<ReadonlySet<string>>(() => new Set());
  const videos = useRef<[HTMLVideoElement | null, HTMLVideoElement | null]>([null, null]);

  const playableUrl = (c: ClipKey) => {
    const { url } = experienceVideo(model, c);
    return url && !failed.has(url) ? url : null;
  };

  // Adjust the slots when the requested clip changes (during render, per React docs).
  if (stage.requested !== clip) {
    if (stage.clips[stage.active] === clip) {
      setStage({ ...stage, requested: clip, pending: null });
    } else {
      const target: SlotIndex = stage.active === 0 ? 1 : 0;
      const clips: [ClipKey, ClipKey] = [...stage.clips];
      clips[target] = clip;
      const hasVideo = playableUrl(clip) !== null;
      setStage({
        clips,
        requested: clip,
        active: hasVideo ? stage.active : target,
        pending: hasVideo ? target : null,
      });
    }
  }

  // Prepare the pending slot: carry over currentTime, play, fade in when ready.
  const { pending, active } = stage;
  useEffect(() => {
    if (pending === null) return;
    const next = videos.current[pending];
    const current = videos.current[active];
    if (!next) return;

    const syncTime = () => {
      if (current && Number.isFinite(next.duration) && next.duration > 0) {
        next.currentTime = current.currentTime % next.duration;
      }
      next.play().catch(() => {});
    };
    const reveal = () =>
      setStage((s) => (s.pending === pending ? { ...s, active: pending, pending: null } : s));

    let revealTimer: ReturnType<typeof setTimeout> | undefined;
    if (next.readyState >= HTMLMediaElement.HAVE_METADATA) syncTime();
    else next.addEventListener("loadedmetadata", syncTime, { once: true });
    if (next.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) revealTimer = setTimeout(reveal, 0);
    else next.addEventListener("canplay", reveal, { once: true });
    // Slow or broken link: don't leave the tap without a visible response.
    const fallbackTimer = setTimeout(reveal, SWITCH_TIMEOUT_MS);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(fallbackTimer);
      next.removeEventListener("loadedmetadata", syncTime);
      next.removeEventListener("canplay", reveal);
    };
  }, [pending, active, stage.clips]);

  // Pause the hidden slot once the crossfade has finished.
  useEffect(() => {
    const hidden = videos.current[active === 0 ? 1 : 0];
    const timer = setTimeout(() => {
      if (stage.pending === null) hidden?.pause();
    }, CROSSFADE_MS);
    return () => clearTimeout(timer);
  }, [active, stage.pending]);

  /** A slot's video failed: remember it, and if it was about to fade in, show its placeholder now. */
  const handleError = (slot: SlotIndex, url: string) => {
    setFailed((f) => new Set(f).add(url));
    setStage((s) => (s.pending === slot ? { ...s, active: slot, pending: null } : s));
  };

  return (
    <>
      {([0, 1] as const).map((slot) => {
        const slotClip = stage.clips[slot];
        const { source } = experienceVideo(model, slotClip);
        const url = playableUrl(slotClip);
        return (
          <div
            key={slot}
            className="absolute inset-0 transition-opacity duration-900"
            style={{ opacity: stage.active === slot ? 1 : 0 }}
          >
            {/* Always underneath: shows until the video has a frame (slow / dummy links never show black). */}
            <MediaPlaceholder kind="video" label={placeholderLabel("video", source)} tint={model.accent} />
            {url && (
              <video
                key={url}
                ref={(el) => {
                  videos.current[slot] = el;
                }}
                className="absolute inset-0 h-full w-full object-cover"
                src={url}
                poster={mediaUrl(model.media.posters[slotClip]) ?? undefined}
                muted
                playsInline
                loop
                autoPlay={slot === stage.active}
                preload="auto"
                onError={() => handleError(slot, url)}
              />
            )}
            <div className="pointer-events-none absolute inset-0" style={{ background: CLIP_OVERLAY[slotClip] }} />
          </div>
        );
      })}
    </>
  );
}
