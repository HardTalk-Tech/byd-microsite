"use client";

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface MediaVideoProps {
  /** Video URL, or null to show only the fallback. */
  src: string | null;
  /** Shown underneath: visible while the video loads, and if it's missing or fails. */
  fallback: ReactNode;
  /** Optional poster image URL. */
  poster?: string;
  className?: string;
}

/**
 * Looping, muted background video (Home hero, Blade Battery).
 * - The fallback always sits underneath, so a slow or broken link never shows black.
 * - A failed load is retried once (after 1.5 s); after that the video is dropped and the
 *   fallback stays.
 * - It only plays while at least half of it is on screen, and releases its
 *   resources when it leaves (kiosk performance rule: few active videos).
 */
export function MediaVideo({ src, fallback, poster, className }: MediaVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const retried = useRef(false);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const playable = src && src !== failedSrc ? src : null;

  // Play only while ≥ 50 % visible (e.g. the hero pauses once Home is scrolled).
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.5) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: [0, 0.5, 1] },
    );
    observer.observe(video);
    return () => {
      observer.disconnect();
      // Release the decoder and network buffer when leaving the screen.
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [playable]);

  // Pending retry, cleared on unmount.
  const retryTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(retryTimer.current), []);

  const handleError = () => {
    if (!retried.current) {
      retried.current = true;
      // Short pause first, so a passing network blip is over before the retry.
      retryTimer.current = setTimeout(() => videoRef.current?.load(), 1500);
      return;
    }
    setFailedSrc(src);
  };

  return (
    <div className={className ?? "absolute inset-0"}>
      {fallback}
      {playable && (
        <video
          key={playable}
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={playable}
          poster={poster}
          muted
          playsInline
          loop
          preload="auto"
          onError={handleError}
        />
      )}
    </div>
  );
}
