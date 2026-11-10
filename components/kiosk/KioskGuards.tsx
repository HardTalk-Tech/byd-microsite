"use client";

import { useEffect } from "react";

/**
 * Kiosk lock-down and screen wake lock (Stage 5). Renders nothing.
 * The CSS side (no selection, callouts, overscroll, touch zoom) is in app/globals.css.
 */
export function KioskGuards() {
  // Block the long-press / right-click menu, image dragging and every zoom gesture.
  useEffect(() => {
    const prevent = (e: Event) => e.preventDefault();
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey) e.preventDefault(); // trackpad pinch / ctrl+wheel zoom
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && ["+", "-", "=", "0"].includes(e.key)) e.preventDefault();
    };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault(); // pinch
    };
    const opts: AddEventListenerOptions = { passive: false };
    document.addEventListener("contextmenu", prevent);
    document.addEventListener("dragstart", prevent);
    document.addEventListener("gesturestart", prevent, opts); // Safari pinch
    document.addEventListener("wheel", onWheel, opts);
    document.addEventListener("keydown", onKey);
    document.addEventListener("touchmove", onTouchMove, opts);
    return () => {
      document.removeEventListener("contextmenu", prevent);
      document.removeEventListener("dragstart", prevent);
      document.removeEventListener("gesturestart", prevent, opts);
      document.removeEventListener("wheel", onWheel, opts);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("touchmove", onTouchMove, opts);
    };
  }, []);

  // Keep the screen on. The lock is dropped whenever the page is hidden, so it is
  // requested again when the page becomes visible.
  useEffect(() => {
    if (!("wakeLock" in navigator)) return;
    let lock: WakeLockSentinel | null = null;
    let disposed = false;
    const request = async () => {
      if (disposed || document.visibilityState !== "visible" || (lock && !lock.released)) return;
      try {
        lock = await navigator.wakeLock.request("screen");
      } catch {
        // Not allowed (e.g. battery saver) – the OS sleep settings in docs/kiosk-setup.md cover it.
      }
    };
    void request();
    document.addEventListener("visibilitychange", request);
    return () => {
      disposed = true;
      document.removeEventListener("visibilitychange", request);
      void lock?.release().catch(() => undefined);
    };
  }, []);

  return null;
}
