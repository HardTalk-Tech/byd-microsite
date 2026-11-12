"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { DEFAULT_MODEL_INDEX, MODELS, wrapModelIndex } from "@/content/models";
import { DEFAULT_SHOWROOM_INDEX } from "@/content/showrooms";
import { SITE_SETTINGS } from "@/content/site-settings";
import { GALLERY_SIZE } from "@/lib/media/media-paths";
import type { TimeKey, ViewKey } from "@/lib/types/content";
import { KIOSK_TIMINGS } from "@/lib/kiosk/timings";
import {
  EMPTY_OFFLINE_STATUS,
  offlineSupported,
  removeServiceWorker,
  runOfflineSetup,
} from "@/lib/offline/offline-setup";
import type { OfflineStatus } from "@/lib/offline/offline-setup";
import { useStage } from "@/lib/kiosk/useStage";

/** Route-level screens from the design. */
export type ScreenKey = "home" | "models" | "experience" | "showrooms";

export const SCREEN_HREF: Record<Exclude<ScreenKey, "experience">, string> = {
  home: "/",
  models: "/models",
  showrooms: "/showrooms",
};

export function experienceHref(modelIndex: number): string {
  return `/experience/${MODELS[modelIndex].slug}`;
}

function screenFromPath(pathname: string): ScreenKey | null {
  if (pathname === "/") return "home";
  if (pathname === "/models") return "models";
  if (pathname.startsWith("/experience/")) return "experience";
  if (pathname === "/showrooms") return "showrooms";
  return null;
}


export interface KioskState {
  /** 01 Loading overlay visible. */
  loading: boolean;
  /** Videos saved for offline use so far (01 Loading progress). */
  loadedCount: number;
  /** Videos to save in total (real links only). */
  loadTotal: number;
  /** Offline readiness, for the kiosk status screen. */
  offline: OfflineStatus;
  /** Kiosk status screen open (5 taps on the logo). */
  statusOpen: boolean;
  /** Selected model (shared by 03 Models, 04 Experience and the nav). */
  modelIndex: number;
  /** Selected variant of the selected model (resets to 0 when the model changes). */
  variantIndex: number;
  view: ViewKey;
  time: TimeKey;
  /** 03 Models swipe hint has been dismissed. */
  swipeHintSeen: boolean;
  showroomIndex: number;
  hotspotIndex: number;
  /** 02 Home scrolled past the threshold (idle timer runs). */
  homeScrolled: boolean;
  /** Bumped to ask 02 Home to scroll back to the top. */
  homeScrollToken: number;
  /** 04 Experience controls visible (auto-hide). */
  controlsVisible: boolean;
  /** 04b Details Panel open. */
  detailsOpen: boolean;
  /** 04c Gallery Fullscreen image, or null when closed. */
  galleryIndex: number | null;
  /** Dip to black while 04 Experience changes model. */
  dip: boolean;
  /** 06 Test Drive Modal open. */
  modalOpen: boolean;
  /** Test-drive form iframe overlay open. */
  formOpen: boolean;
  /** "Still there?" countdown, or null when hidden. */
  idleSecondsLeft: number | null;
}

const INITIAL_STATE: KioskState = {
  loading: true,
  loadedCount: 0,
  loadTotal: 0,
  offline: EMPTY_OFFLINE_STATUS,
  statusOpen: false,
  modelIndex: DEFAULT_MODEL_INDEX,
  variantIndex: 0,
  view: "exterior",
  time: "day",
  swipeHintSeen: false,
  showroomIndex: DEFAULT_SHOWROOM_INDEX,
  hotspotIndex: 0,
  homeScrolled: false,
  homeScrollToken: 0,
  controlsVisible: true,
  detailsOpen: false,
  galleryIndex: null,
  dip: false,
  modalOpen: false,
  formOpen: false,
  idleSecondsLeft: null,
};

/** What the design's goTo() resets on every screen change. */
const SCREEN_CHANGE_RESET: Partial<KioskState> = {
  galleryIndex: null,
  modalOpen: false,
  formOpen: false,
  idleSecondsLeft: null,
  controlsVisible: true,
  detailsOpen: false,
};

type Patch = Partial<KioskState> | ((s: KioskState) => Partial<KioskState>);

export interface KioskActions {
  goTo: (screen: ScreenKey, options?: { details?: boolean }) => void;
  /** Wrap a handler so it ignores taps right after controls were revealed. */
  guard: <A extends unknown[]>(fn: (...args: A) => void) => (...args: A) => void;
  touch: () => void;
  selectModel: (index: number) => void;
  selectVariant: (index: number) => void;
  stepModel: (delta: number) => void;
  stepExperienceModel: (fromIndex: number, delta: number) => void;
  syncModelFromRoute: (index: number) => void;
  endDip: () => void;
  setView: (view: ViewKey) => void;
  setTime: (time: TimeKey) => void;
  openDetails: () => void;
  closeDetails: () => void;
  openGallery: (index: number) => void;
  stepGallery: (delta: number) => void;
  closeGallery: () => void;
  openModal: () => void;
  closeModal: () => void;
  openForm: () => void;
  closeForm: () => void;
  dismissIdle: () => void;
  selectShowroom: (index: number) => void;
  selectHotspot: (index: number) => void;
  setHomeScrolled: (scrolled: boolean) => void;
  openStatus: () => void;
  closeStatus: () => void;
}

interface KioskContextValue {
  state: KioskState;
  screen: ScreenKey | null;
  /** Screen px per design px. */
  scale: number;
  /** Canvas height in design px (1080–1280, follows the screen shape). */
  stageHeight: number;
  /** False until the window was measured on the client (canvas then sized by CSS variables). */
  stageMeasured: boolean;
  actions: KioskActions;
}

const KioskContext = createContext<KioskContextValue | null>(null);

export function useKiosk(): KioskContextValue {
  const ctx = useContext(KioskContext);
  if (!ctx) throw new Error("useKiosk must be used inside <KioskProvider>");
  return ctx;
}

export function KioskProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const screen = screenFromPath(pathname);
  const { scale, height: stageHeight, measured: stageMeasured } = useStage();
  const [state, setState] = useState<KioskState>(INITIAL_STATE);

  // Mirrors for timers and event handlers (updated after every commit).
  const stateRef = useRef(state);
  const pathnameRef = useRef(pathname);
  const screenRef = useRef(screen);
  const lastTouchRef = useRef(0);
  const revealedAtRef = useRef(0);
  const dipTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    stateRef.current = state;
    pathnameRef.current = pathname;
    screenRef.current = screen;
  });

  const patch = useCallback((p: Patch) => {
    setState((s) => ({ ...s, ...(typeof p === "function" ? p(s) : p) }));
  }, []);

  const actions = useMemo<KioskActions>(() => {
    const markTouch = () => {
      lastTouchRef.current = Date.now();
    };

    const navigate = (href: string) => {
      if (pathnameRef.current !== href) router.push(href, { scroll: false });
    };

    const goTo: KioskActions["goTo"] = (target, options) => {
      markTouch();
      const href =
        target === "experience" ? experienceHref(stateRef.current.modelIndex) : SCREEN_HREF[target];
      patch((s) => ({
        ...SCREEN_CHANGE_RESET,
        detailsOpen: Boolean(options?.details),
        ...(target === "home" ? { homeScrolled: false, homeScrollToken: s.homeScrollToken + 1 } : {}),
      }));
      navigate(href);
    };

    const guard: KioskActions["guard"] =
      (fn) =>
      (...args) => {
        if (Date.now() - revealedAtRef.current < KIOSK_TIMINGS.revealGuardMs) return;
        fn(...args);
      };

    return {
      goTo,
      guard,
      touch() {
        markTouch();
        const s = stateRef.current;
        if (!s.controlsVisible) revealedAtRef.current = Date.now();
        if (!s.controlsVisible || s.idleSecondsLeft !== null) {
          patch({ controlsVisible: true, idleSecondsLeft: null });
        }
      },
      selectModel(index) {
        patch((s) => ({
          modelIndex: index,
          variantIndex: index === s.modelIndex ? s.variantIndex : 0,
          swipeHintSeen: true,
        }));
      },
      selectVariant: (index) => patch({ variantIndex: index }),
      stepModel(delta) {
        patch((s) => ({
          modelIndex: wrapModelIndex(s.modelIndex + delta),
          variantIndex: 0,
          swipeHintSeen: true,
        }));
      },
      stepExperienceModel(fromIndex, delta) {
        if (stateRef.current.dip) return;
        patch({ dip: true });
        clearTimeout(dipTimerRef.current);
        dipTimerRef.current = setTimeout(() => {
          const next = wrapModelIndex(fromIndex + delta);
          patch({ modelIndex: next, variantIndex: 0 });
          router.replace(experienceHref(next), { scroll: false, transitionTypes: ["model-step"] });
          // Safety net: never leave the screen black if the new page is slow.
          dipTimerRef.current = setTimeout(() => patch({ dip: false }), 1500);
        }, KIOSK_TIMINGS.dipSwitchMs);
      },
      syncModelFromRoute(index) {
        if (stateRef.current.modelIndex !== index) patch({ modelIndex: index, variantIndex: 0 });
      },
      endDip() {
        if (!stateRef.current.dip) return;
        clearTimeout(dipTimerRef.current);
        patch({ dip: false });
      },
      setView: (view) => patch({ view }),
      setTime: (time) => patch({ time }),
      openDetails: () => patch({ detailsOpen: true }),
      closeDetails: () => patch({ detailsOpen: false, controlsVisible: true }),
      openGallery: (index) => patch({ galleryIndex: index }),
      stepGallery: (delta) =>
        patch((s) => ({
          galleryIndex: ((s.galleryIndex ?? 0) + delta + GALLERY_SIZE) % GALLERY_SIZE,
        })),
      closeGallery: () => patch({ galleryIndex: null }),
      openModal: () => patch({ modalOpen: true }),
      closeModal: () => patch({ modalOpen: false }),
      openForm: () => patch({ formOpen: true }),
      closeForm: () => patch({ formOpen: false }),
      dismissIdle() {
        markTouch();
        patch({ idleSecondsLeft: null });
      },
      selectShowroom: (index) => patch({ showroomIndex: index }),
      selectHotspot: (index) => patch({ hotspotIndex: index }),
      setHomeScrolled(scrolled) {
        markTouch();
        if (stateRef.current.homeScrolled !== scrolled) patch({ homeScrolled: scrolled });
      },
      openStatus: () => patch({ statusOpen: true }),
      closeStatus: () => patch({ statusOpen: false }),
    };
  }, [patch, router]);

  // 01 Loading – first launch: cache the app and save the videos for offline use
  // (real progress). In development (no service worker) the loading screen is skipped.
  useEffect(() => {
    if (!offlineSupported()) {
      if (process.env.NODE_ENV !== "production") void removeServiceWorker().catch(() => undefined);
      // Hide the loading screen on the next tick (after the first paint).
      const t = setTimeout(() => patch({ loading: false }), 0);
      return () => clearTimeout(t);
    }
    let cancelled = false;
    let doneTimer: ReturnType<typeof setTimeout> | undefined;
    let stallTimer: ReturnType<typeof setTimeout> | undefined;
    let showedLoading = false;
    // Never hold visitors on 01 Loading because of a stalled download: if progress
    // doesn't move for a while, open the app and keep downloading in the background.
    const armStallGuard = () => {
      clearTimeout(stallTimer);
      stallTimer = setTimeout(() => {
        if (!cancelled) patch({ loading: false });
      }, KIOSK_TIMINGS.loadingStallMs);
    };
    runOfflineSetup({
      onLoadingStart: (total, alreadyCached) => {
        showedLoading = true;
        armStallGuard();
        if (!cancelled) patch({ loadTotal: total, loadedCount: alreadyCached });
      },
      onProgress: (cached) => {
        armStallGuard();
        if (!cancelled) patch((s) => ({ loadedCount: cached, offline: { ...s.offline, cached } }));
      },
    })
      .then((offline) => {
        clearTimeout(stallTimer);
        if (cancelled) return;
        patch((s) => ({ offline, loadedCount: Math.max(s.loadedCount, offline.cached), loadTotal: offline.total }));
        const finish = () => {
          lastTouchRef.current = Date.now();
          patch({ loading: false });
        };
        if (showedLoading) doneTimer = setTimeout(finish, KIOSK_TIMINGS.loadingDoneDelayMs);
        else finish();
      })
      .catch(() => {
        if (!cancelled) patch({ loading: false });
      });
    return () => {
      cancelled = true;
      clearTimeout(doneTimer);
      clearTimeout(stallTimer);
    };
  }, [patch]);

  // Prefetch every screen so navigation is instant.
  useEffect(() => {
    Object.values(SCREEN_HREF).forEach((href) => router.prefetch(href));
    MODELS.forEach((_, i) => router.prefetch(experienceHref(i)));
  }, [router]);

  // Idle timer, "Still there?" countdown and Experience controls auto-hide.
  useEffect(() => {
    const id = setInterval(() => {
      const s = stateRef.current;
      const current = screenRef.current;
      const resting = current === "home" && !s.homeScrolled && !s.modalOpen && !s.statusOpen;

      if (s.loading || current === null || resting) {
        if (resting) lastTouchRef.current = Date.now();
        if (s.idleSecondsLeft !== null) patch({ idleSecondsLeft: null });
        return;
      }

      const elapsedMs = Date.now() - lastTouchRef.current;
      const elapsed = elapsedMs / 1000;
      const timeout = Math.max(
        KIOSK_TIMINGS.minIdleTimeoutSeconds,
        s.formOpen ? SITE_SETTINGS.formIdleTimeoutSeconds : SITE_SETTINGS.idleTimeoutSeconds,
      );

      if (elapsed >= timeout) {
        patch({ statusOpen: false });
        actions.goTo("home");
        return;
      }

      const update: Partial<KioskState> = {};
      const idle =
        elapsed >= timeout - KIOSK_TIMINGS.idleWarningSeconds ? Math.ceil(timeout - elapsed) : null;
      if (idle !== s.idleSecondsLeft) update.idleSecondsLeft = idle;

      const canAutoHide =
        current === "experience" &&
        s.controlsVisible &&
        !s.detailsOpen &&
        s.galleryIndex === null &&
        !s.modalOpen &&
        !s.formOpen;
      if (canAutoHide && elapsedMs >= KIOSK_TIMINGS.controlsAutoHideMs) update.controlsVisible = false;

      if (Object.keys(update).length > 0) patch(update);
    }, KIOSK_TIMINGS.tickMs);
    return () => clearInterval(id);
  }, [actions, patch]);

  const value = useMemo(
    () => ({ state, screen, scale, stageHeight, stageMeasured, actions }),
    [state, screen, scale, stageHeight, stageMeasured, actions],
  );

  return <KioskContext.Provider value={value}>{children}</KioskContext.Provider>;
}
