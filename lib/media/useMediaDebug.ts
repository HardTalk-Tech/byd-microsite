"use client";

import { useSyncExternalStore } from "react";

/**
 * Debug view for media slots: open the kiosk with `?debug=1` to show the
 * developer labels (storage paths / links) on placeholders; `?debug=0` turns
 * it off. The choice is kept for the browser session, so it survives in-app
 * navigation. Visitors never see the labels.
 */
const KEY = "byd-media-debug";

function readDebug(): boolean {
  try {
    const param = new URLSearchParams(window.location.search).get("debug");
    if (param === "1") sessionStorage.setItem(KEY, "1");
    if (param === "0") sessionStorage.removeItem(KEY);
    return sessionStorage.getItem(KEY) === "1";
  } catch {
    return false;
  }
}

const subscribe = () => () => {};

export function useMediaDebug(): boolean {
  return useSyncExternalStore(subscribe, readDebug, () => false);
}
