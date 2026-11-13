# Design Inventory – BYD Sri Lanka Showroom Kiosk

Source: `design/byd-kiosk-design.html` (Claude Design bundle; read-only).
The file is a self-unpacking bundle. Its real content is a template (HTML with
`{{bindings}}`), one logic class (`class Component extends DCLogic`), two
sub-components (`Placeholder`, `QRCode`) and the font files. All values below come
from those sources. Canvas: **1920 × 1080**, scaled to fit the window (letterboxed
on `#000`).

`style-active="…"` in the design = CSS `:active` rule (pressed state, `!important`).

---

## 1. Screens and states (names exactly as in the design)

| `data-screen-label` | What it is | Implementation |
|---|---|---|
| **Kiosk** | Root 1920×1080 canvas; global `pointerdown` handler (`onTouch`) | Root layout + `KioskStage` |
| **01 Loading** | Gold progress ring, `%`, "Preparing showroom experience", "{n} of 36 videos ready" | Global overlay (state), not a route |
| **02 Home** | Vertically scrolling page with 5 sections (see below) | Route `/` |
| **03 Models** | Model browser: car cut-out, name, colour, spec strip, Explore / Full details, model rail | Route `/models` |
| **04 Experience** | Full-screen video per model, Exterior/Interior × Day/Night, prev/next model | Route `/experience/[slug]` |
| **04b Details Panel** | Right-hand slide-in panel over 04 Experience | State inside Experience |
| **04c Gallery Fullscreen** | Full-screen gallery image viewer over 04 Experience | State inside Experience |
| **05 Showrooms** | Sri Lanka map with pins, details card, list of showrooms | Route `/showrooms` |
| **06 Test Drive Modal** | QR + hotline modal, available from every main screen | Global overlay (state) |
| *(unlabelled)* **Top nav + logo** | Logo top-left, glass pill nav centred top | Global, in root layout |
| *(unlabelled)* **Idle: "Still there?"** | Countdown toast near top centre | Global overlay (state) |
| *(design tool only)* **"Prototype · jump to"** bar | Dev nav under the canvas | **Not built** (design-tool chrome) |

### 02 Home – sections (top to bottom, scroll-snap `y proximity`)
1. **Hero** (1080 px, snap start): showreel video, gradients, headline "Drive the Future", gold "Explore Models" button, "Swipe up to discover" scroll cue button.
2. **Blade Battery** (snap start): eyebrow "Blade Battery", title "The battery is the structure", body copy, transparent cut-away image with gold glow, 3 cards (LFP chemistry / Cell-to-pack design / Safety tested).
3. **e-Platform 3.0** (snap start): title "Built electric from the ground up"; exploded-chassis image with 3 numbered hotspot markers + pulse; right column = info card (`01 / 03`, title, text) + 3 selectable rows.
4. **Across the range** (snap start): title "In every BYD"; 6 numbered cards (Blade Battery, Vehicle-to-Load, Over-the-air updates, DC fast charging, Driver assistance, Battery warranty).
5. **Find your BYD** (820 px, snap end): line-up image at 45 % opacity under radial vignette, "Nine models on display today", buttons Explore Models (gold) / Book Test Drive (glass) / Showrooms (glass), "Hotline +94 XX XXX XXXX".

### States per screen
- **01 Loading:** progress 0–36 → done.
- **02 Home:** `homeScrolled` (scrollTop > 40 px); selected platform hotspot (0–2, default 0).
- **03 Models:** selected model (0–8, shared with Experience); `hintSeen` (swipe hint visible until first model change).
  Design default was 8 = Atto 3; **changed: starts on the first model, models in alphabetical order** (see §12).
- **04 Experience:** `view` exterior|interior (default exterior), `time` day|night (default day) – both kept across models and screens; `controls` visible/hidden; `dip` (dip-to-black during model change); `details` open; `gallery` null | 0–3.
- **05 Showrooms:** selected showroom (0–6, default 0 = Colombo).
- **Global:** `modal` open; `idle` null | seconds left.
- **Pressed states:** every button has an `:active` style (see §5).
- **Selected states:** rail card, hotspot marker + row, map pin + row, nav item, segment buttons.

---

## 2. Navigation flow

| Trigger | Where | Result |
|---|---|---|
| App start | – | **01 Loading** (simulated: +1 every 150 ms to 36, then wait 1200 ms) → **02 Home** |
| Tap "Explore Models" (hero, Find your BYD) | 02 Home | → **03 Models** |
| Tap "Swipe up to discover" | 02 Home hero | Smooth-scroll Home to y = 1080 |
| Tap hotspot marker or row | 02 Home e-Platform | Select hotspot; card text + counter update; pulse moves |
| Tap "Book Test Drive" | 02 Home | Open **06 Test Drive Modal** |
| Tap "Showrooms" | 02 Home | → **05 Showrooms** |
| Tap rail card | 03 Models | Select model (rail scrolls it to centre, smooth); hides swipe hint |
| Horizontal swipe > 90 px in car area (1080×500 at 780,140) | 03 Models | Swipe left → next model, right → previous (wraps 9); hides swipe hint |
| Tap (movement < 12 px) in car area | 03 Models | → **04 Experience** |
| Tap "Explore" | 03 Models | → **04 Experience** |
| Tap "Full details" | 03 Models | → **04 Experience** with **04b Details Panel** open |
| Tap anywhere | 04 Experience | Reveal controls if hidden (taps on controls within 350 ms of reveal are ignored) |
| Horizontal swipe > 120 px (full screen) | 04 Experience (details closed) | Dip to black → next/prev model |
| Tap back (circle, top-left pill) | 04 Experience | → **03 Models** (same model selected) |
| Tap prev / next (104 px circles + neighbour name) | 04 Experience | Dip to black → prev/next model |
| Tap Exterior / Interior / Day / Night | 04 Experience | Crossfade to that clip |
| Tap "Details" | 04 Experience | Open **04b Details Panel** |
| Tap "Book Test Drive" | 04 Experience | Open **06 Test Drive Modal** |
| Tap close (×) or dimmed backdrop | 04b Details Panel | Close panel, show controls |
| Tap gallery thumbnail n | 04b Details Panel | Open **04c Gallery Fullscreen** at image n |
| Tap prev / next | 04c Gallery Fullscreen | Previous / next image (wraps over 4); counter "n / 4" |
| Tap close (×) | 04c Gallery Fullscreen | Back to 04b Details Panel |
| Tap pin or list row | 05 Showrooms | Select showroom; card updates; pulse rings move |
| Nav: Home / Models / Experience / Showrooms | Top nav | → that screen (Experience = currently selected model). Closes modal, gallery, details |
| Nav: "Test Drive" (gold) | Top nav | Open **06 Test Drive Modal** |
| Tap × or backdrop | 06 Test Drive Modal | Close (taps inside the card do not close) |
| Tap "Open form here" (only when online) | 06 Test Drive Modal | *No action in design* → plan §1.4: full-screen iframe overlay |
| Tap "I'm here" | Idle toast | Dismiss, reset idle timer |
| Idle timeout reached | Any main screen | → **02 Home** (scrolled to top), closes modal, gallery, details; controls shown |

---

## 3. Behaviour coded in the design's JavaScript

- **Tick:** `setInterval` every 250 ms drives idle + auto-hide.
- **Touch:** `pointerdown` anywhere on the canvas → `lastTouch = now`; if controls were hidden → show them and remember `revealedAt`; hide idle toast.
- **Reveal guard:** Experience buttons and every "Book Test Drive"/"Test Drive" button ignore taps within **350 ms** of controls being revealed (so the waking tap does not also press a button).
- **Idle timer:** `idleTimeout` prop, default **90 s**, min 15 s.
  - Not counted on 01 Loading, or on 02 Home while resting (not scrolled past 40 px and no modal) – timer is held at 0 there.
  - Warning toast shows for the last **10 s**: "Returning to start in {ceil(T − elapsed)} s".
  - At T → go to 02 Home (scroll top), close modal / gallery / details, show controls. Selected model, view/time, showroom, hotspot and swipe hint are **not** reset.
- **Experience controls auto-hide:** after **6 s** without touch (only when details, gallery and modal are closed) → controls fade out (and the top nav with them).
- **Dip on model change (Experience):** black layer to opacity 1 (360 ms), model switches at **380 ms**, black fades out from **460 ms**. Ignored while a dip runs.
- **Swipe detection:** pointerdown/pointerup positions, divided by canvas scale. If |dy| > |dx| the design returns 0 (see open question Q6).
- **Rail auto-centre:** after every model change, rail scrolls smooth to `120 + i·256 + 118 − width/2`; also on entering 03 Models and 300 ms after start.
- **Home scroll:** `onScroll` sets `homeScrolled` (> 40 px) and counts as activity.
- **Loading simulation:** 36 steps × 150 ms = 5.4 s, ring `stroke-dasharray` = progress × 2π·150, then 1200 ms pause → Home.
- **Top nav visibility:** hidden on Loading, while Gallery Fullscreen is open, while Details Panel is open (unless modal open), and on Experience while controls are hidden (unless modal open). Nav items show no active item while the modal is open; the "Test Drive" button gets a stronger glow instead.
- **Online flag:** `online` prop (default true) shows "Open form here".

---

## 4. Design tokens

### Colours
| Token | Value | Use |
|---|---|---|
| `bg` | `#0A0A0B` | App background |
| `black` | `#000000` | Letterbox, Experience background, dip layer |
| `surface-1` | `#16171A` | Loading radial centre; glass base rgb (22,23,26) |
| `surface-2` | `#131416` | Showrooms radial centre |
| `panel` | `rgba(16,17,20,0.78)` | 04b Details Panel |
| `qr-bg` | `#0E0F11` | QR inner plate |
| `placeholder-bg` | `#121316` | Media placeholder base |
| `ring-track` | `#24262B` | Loading ring track |
| `text-primary` | `#F2F0EB` | Headlines, primary text |
| `text-secondary` | `#C9CCD2` | Body, secondary labels |
| `text-tertiary` | `#9A9DA5` | Card body, inactive rail name |
| `text-muted` | `#8A8D95` | Labels, counters |
| `gold` | `#C9A24A` | Eyebrows, numbers |
| `gold-light` | `#E8C875` | Highlights, units, icons, indicator lines |
| `gold-label` | `#D9B865` | Placeholder label text |
| Glass fills | `rgba(22,23,26, .5 / .55 / .6 / .72 / .82)` | Panels, buttons, rows, modal, idle toast |
| Hairline borders | `rgba(255,255,255, .07 / .08 / .09 / .12 / .16 / .18)` | Cards, rows, buttons |
| Gold borders | `rgba(201,162,74, .35 / .4 / .45 / .6)`, `rgba(232,200,117, .6 / .75 / .8 / .9)` | Selected / accent surfaces |
| Selected fill | `rgba(201,162,74,0.12)`, segment `rgba(201,162,74,0.16)` | Selected rows, nav item, segment |
| Backdrops | modal `rgba(5,5,6,0.62)`, details dim `rgba(5,5,6,0.5)`, gallery `rgba(6,6,7,0.94)` | Overlays |
| Night tint | `linear-gradient(180deg, rgba(8,12,30,.55), rgba(4,6,14,.35))` | Night video overlay |
| Interior day tint | `rgba(40,30,15,0.12)` | Interior day overlay |
| Model accents | 9 values (see `content/models.ts`) | Glows, dots, placeholder tint |

### Gradients
- **Gold fill:** `linear-gradient(135deg, #C9A24A 0%, #E8C875 55%, #C9A24A 100%)` (QR frame uses 50 %).
- **Gold hairline:** `linear-gradient(90deg, #C9A24A, #E8C875)`.
- **Model glow:** `radial-gradient(ellipse 50% 50% at 50% 52%, accent/.62 0%, accent/.22 40%, transparent 72%)`; reflection `radial-gradient(ellipse at 50% 0%, accent/.4, transparent 70%)` + `blur(10px)`; panel glow `accent/.35 → transparent 65%`.
- **Grid backdrop:** 1 px lines `rgba(255,255,255,.03)` (Loading) / `.025` (Models, Showrooms), 80 px cells, radial mask.
- **Video scrims:** hero `to top: bg 0% → bg/.7 32% → 0 64%` + top `bg/.75 → 0` 240 px; Experience `bg/.75 0% → 0 22% → 0 70% → bg/.8 100%`.

### Fonts
| Family | Weights | Use |
|---|---|---|
| **Michroma** | 400 | Display: headlines, model names, numbers/values, hotline |
| **Sora** | 300, 400, 500, 600 | UI and body (default font) |
| **JetBrains Mono** | 400 | Indices (`01`), counters, placeholder labels |

**Type scale (px):** 116 (hero) · 96 · 84 · 72 · 64 · 56 · 48 · 44 · 40 · 38 · 34 · 32 · 30 · 28 · 26 · 24 · 22 (minimum UI text).
Eyebrow: 22 px / 500 / `0.32em` / uppercase / gold. Labels: 22 px / `0.18–0.3em` / uppercase / muted. Buttons: 22–24 px / 500–600 / `0.1–0.2em` / uppercase.
Placeholder-only text: 13 / 18 / 20 px; QR placeholder text 12 / 16 px (see Q4).

### Radii
`999px` pills · `50%` circles · 36 (modal) · 28 (glass cards, platform image) · 24 · 20 · 18 (rows) · 14 (gallery) · 12 · 10 · 6 (labels) · 2 (lines). QR frame 20 / 18.

### Shadows and glows
- Gold button: `0 0 0 1px rgba(232,200,117,.5), 0 12px 48px rgba(201,162,74,.35)` (pressed: `… .9`, `0 0 56px rgba(232,200,117,.6)`).
- Glass panel: `inset 0 1px 0 rgba(255,255,255,.06), inset 0 0 32–40px rgba(201,162,74,.05–.06)`, plus `0 20–24px 60px rgba(0,0,0,.45)` for floating panels.
- Pressed glow (secondary): `0 0 28–32px rgba(232,200,117,.4–.55)` + gold border.
- Selected rail card: `0 0 44px accent/.55, inset 0 0 36px accent/.22`.
- Gold indicator: `0 0 10–14px #E8C875`.
- Text shadow over video: `0 4px 40px rgba(0,0,0,.6)`, `0 2px 12px rgba(0,0,0,.8)`.

### Blur values (`backdrop-filter`)
10 px (modal backdrop) · 12 px (gallery backdrop) · 20 px (glass buttons) · 24 px (+ `saturate(140%)`) nav, panels, idle toast · 36 px (+ `saturate(140%)`) Details Panel and modal card. `filter: blur(10px)` on car reflection.

### Spacing
Screen edges: 120 (Home, Models), 96 (Showrooms), 72 / 48 / 40 (chrome).
Gaps: 2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 18 · 20 · 22 · 24 · 28 · 32 · 36 · 40 · 44 · 48 · 56 · 64 · 80.
Control heights: 88 (primary), 84 (segment, rows), 80 (Details button, hotspot rows), 76 (close/back circles), 72 (nav, modal/idle buttons), 64 (chips), 104 (prev/next circles).

---

## 5. Reusable components and variants

| Component | Variants / props | Used in |
|---|---|---|
| **GoldButton** (primary pill + sweep shine) | h 88 / 72; with/without arrow icon; `active` glow (nav Test Drive while modal open) | Home, Models, Experience, Nav, Idle toast |
| **GlassButton** (secondary pill) | h 88 / 80 / 72; with/without blur; optional icon | Home, Models, Experience, Modal |
| **CircleIconButton** | 76 (close, back with gold border), 104 (prev/next with blur) | Experience, Details, Gallery, Modal |
| **SegmentButton** | on/off; Exterior, Interior, Day, Night icons | Experience control bar |
| **SelectableRow** | numbered row; selected/unselected; optional chevron; h 80 / 84 | Home hotspots, Showrooms list |
| **GlassCard** | neutral / gold border | Home cards, Showroom card, platform card |
| **Eyebrow** | gold uppercase label | Everywhere |
| **AccentDot** | 22 / 16 / 14 px; with/without glow | Models, Experience, Details |
| **SpecValue** | small (30/22 strip) / large (48/24 grid card) | Models strip, Details grid |
| **MediaPlaceholder** | kind video / image / logo; tint; compact; transparent; radius | All media slots |
| **QrCode** | size 380 / 190 / 132 / 104; label | Modal, Details, Showrooms |
| **BrandLogo** | 240×76 / 200×64 | Loading, Nav |
| **GridBackdrop** | opacity .03 / .025; mask centre | Loading, Models, Showrooms |
| **SweepShine** (fx) | slow (gold .08, 9 s, 26 %), screen (gold .05, 11 s, 22 %), button (white .55, 5 s, 30 %) | Loading, Modal, Models, gold buttons |
| **RippleRings** (fx) | 2 rings, 2.8 s; 120 px / 140 px | Map pin, platform hotspot |
| **ScrollCue** | – | Home hero |
| **SwipeHint** | – | Models |
| **TopNav** | items Home / Models / Experience / Showrooms + Test Drive; active item indicator | Global |
| Pressed state (all buttons) | `scale(.94–.98)` and/or gold border + glow; scroll cue / pins: `opacity .7–.8` | Everywhere |

Icons (inline SVG, stroke = currentColor): arrow right, arrow left, chevron left, chevron right, close, car (exterior), steering wheel (interior), sun, moon, details lines, row chevron.

---

## 6. Animations

| Name | What moves | Duration / easing | Trigger |
|---|---|---|---|
| Screen crossfade | opacity of whole screen | Loading & Home 900 ms, Experience 800 ms, Models & Showrooms 700 ms, `ease` | Screen change |
| `kSweep` shine | translateX(−140 % → 520 %) rotate(14°), moves during first 55 % | 5 s / 9 s / 11 s ease-in-out infinite | Always (gold buttons, Loading, Modal, Models bg) |
| `kRipple` | scale .22 → 1, opacity .9 → 0; 2 rings offset 1.4 s | 2.8 s cubic-bezier(.2,.6,.3,1) infinite | Selected pin / hotspot |
| Pulse position | ring group moves to new pin/hotspot | 500 ms ease | Selection change |
| `kScrollCue` | dot translateY 0 → 46 px with fade in/out | 2.2 s ease-in-out infinite | Home hero |
| `kSwipe` + `kBreath` | dot translateX 0 → 124 px (alternate); whole hint opacity .75 ↔ 1 | 1.8 s / 3 s ease-in-out infinite | Models until first model change |
| Loading ring | stroke-dasharray | 200 ms linear per step | Progress |
| Model glow | opacity | 1100 ms ease | Model change |
| Car cut-out | opacity 800 ms ease; translateX ±90 px → 0 900 ms cubic-bezier(.2,.7,.2,1) | | Model change |
| Model name block | opacity 700 ms ease; translateY 16 → 0 800 ms cubic-bezier(.2,.7,.2,1) | | Model change |
| Rail card | box-shadow 700 ms, border 500 ms, name colour 400 ms, underline opacity 400 ms | ease | Selection |
| Video clip crossfade | opacity | 900 ms ease | View / time change |
| Dip to black | opacity | 360 ms ease | Experience model change |
| Experience controls | opacity | 700 ms ease (main group 500 ms) | Auto-hide / reveal / details |
| Details Panel | translateX 104 % → 0 | 650 ms cubic-bezier(.2,.7,.2,1); dim 600 ms | Open / close |
| Gallery Fullscreen | opacity | 500 ms ease | Open / close |
| Test Drive Modal | backdrop opacity 500 ms; card scale .96 → 1 500 ms cubic-bezier(.2,.7,.2,1) | | Open / close |
| Idle toast | opacity + translateY −24 → 0 | 500 ms ease | Countdown start / dismiss |
| Top nav | opacity 600 ms; items 400 ms; Test Drive glow 300 ms | ease | Visibility / selection |
| Selection states | colours, borders, shadows (hotspot, pin dot 16 → 24 px, rows, segments) | 400 ms ease | Selection |
| Pressed | transform scale | 160 ms ease | `:active` |

(`kPulse` is defined in the design but not used.)

---

## 7. Media slots

All slots render a labelled placeholder in Stage 1; label = storage path.
Sizes are the rendered size at 1920×1080.

| Slot | Kind | Rendered size (ratio) | Design label | Planned storage path |
|---|---|---|---|---|
| Brand logo (Loading) | logo | 240×76 | `[BYD LOGO]` | **Live:** `public/brand/byd-logo-white.png` (ships with the app) |
| Brand logo (Nav) | logo | 200×64 | `[BYD LOGO]` | **Live:** `public/brand/byd-logo-white.png` (left-aligned) |
| Home showreel | video | 1920×1080 (16:9) | `[VIDEO: attract showreel – all models]` | `showreel/showreel.mp4` (+ `showreel-poster.webp`) |
| Blade Battery cut-away | image, transparent | ≈856×600 | `[IMAGE: blade battery · cell-to-pack cutaway, transparent PNG]` | `home/blade-battery.webp` |
| e-Platform chassis | image | ≈1072×640 | `[IMAGE: e-platform 3.0 · exploded chassis view]` | `home/e-platform.webp` |
| Model line-up | image | 1920×820 (shown at 45 % opacity) | `[IMAGE: full model lineup · wide]` | `home/model-lineup.webp` |
| Car cut-out ×9 | image, transparent | 1020×430 | `[IMAGE: {slug} · car cut-out, side three-quarter, transparent PNG]` | `models/{slug}/{slug}-cutout.webp` |
| Rail thumbnail ×9 | image | 204×112 | `[IMAGE: {slug} · thumb]` | `models/{slug}/{slug}-thumb.webp` |
| Experience video ×4 per model (36) | video | 1920×1080 (16:9) | `[VIDEO: {slug} · {view} · {time}]` | `models/{slug}/{slug}-{view}-{time}.mp4` |
| Experience poster ×4 per model | image | 1920×1080 | – (plan requirement) | `models/{slug}/{slug}-{view}-{time}.webp` |
| Gallery ×4 per model | image | thumb ≈155×128; fullscreen 1560×820 | `[IMAGE: {slug} · gallery {n}]` | `models/{slug}/{slug}-gallery-{n}.webp` |
| Feature video per model | video | 656×360 | `[VIDEO: {slug} · feature highlight]` | `models/{slug}/{slug}-feature.mp4` |
| QR test drive | QR | 380 (modal), 190 (details), 104 (showrooms) | `[QR: test drive]` | **Live:** generated from `site-settings.testDriveFormUrl` (https://www.johnkeellscgauto.com/register-your-interest/) |
| QR directions ×7 | QR | 132 | `[QR: directions]` | generated from `showrooms[i].directionsUrl` |

---

## 8. Content shown in the design (placeholder data)

- **Models (9):** design shows names **without** "BYD" (e.g. "Racco"), with the "BYD Electric" eyebrow above. Slugs, colour names and accents match the plan.
- **Specs (design):** placeholders Range `XXX km`, Battery `XX kWh`, Power `XXX kW`, Seats `X seats`.
  **Now replaced by the official spec sheets** (see §12).
- **Highlights (design):** Blade Battery, V2L, 360° camera, `[Highlight 4]` – placeholders, **removed** (see §12).
- **Showrooms (design):** 7 placeholder towns incl. Ampara and Batticaloa – **replaced by the 12 real locations** (see §14).
- **Hotline:** design placeholder `+94 XX XXX XXXX` – **now the main contact details** (see §13).
- **Home copy:** battery points, platform hotspots (with x/y on the image), 6 "In every BYD" items (contain `XXX kW`, `X years or XXX,XXX km` placeholders).

---

## 9. Not covered by the design (built in the same style, listed in the stage summary)

- Test-drive form iframe overlay ("Open form here" has no handler in the design).
- `not-found` page (unknown model slug).
- Later stages: kiosk status screen, "Restarting…" error screen, real download progress.

---

## 10. Folder tree (as built in Stage 1)

Routes follow the design's screen names; overlays and panels are state.
Per-model screen = one dynamic route.

```
byd-microsite-kiosk/
├─ app/
│  ├─ layout.tsx                 Root: fonts, KioskProvider, KioskStage, TopNav, global overlays, 01 Loading
│  ├─ globals.css                Tailwind v4 @theme tokens, utilities, keyframes, view-transition CSS
│  ├─ page.tsx                   02 Home            → /
│  ├─ not-found.tsx              Styled fallback with a way back to Home
│  ├─ models/
│  │  └─ page.tsx                03 Models          → /models
│  ├─ experience/
│  │  └─ [slug]/
│  │     └─ page.tsx             04 Experience      → /experience/[slug]  (generateStaticParams, dynamicParams = false)
│  └─ showrooms/
│     └─ page.tsx                05 Showrooms       → /showrooms
│
├─ components/
│  ├─ loading/                   01 Loading
│  │  ├─ LoadingScreen.tsx
│  │  └─ LoadingProgressRing.tsx
│  ├─ home/                      02 Home
│  │  ├─ HomeScreen.tsx          Scroll container, snap, scroll tracking
│  │  ├─ HomeHero.tsx
│  │  ├─ ScrollCue.tsx
│  │  ├─ BladeBatterySection.tsx
│  │  ├─ BatteryPointCard.tsx
│  │  ├─ EPlatformSection.tsx
│  │  ├─ PlatformHotspotMarker.tsx
│  │  ├─ InEveryBydSection.tsx
│  │  ├─ CommonFeatureCard.tsx
│  │  └─ FindYourBydSection.tsx
│  ├─ models/                    03 Models
│  │  ├─ ModelsScreen.tsx
│  │  ├─ ModelCarStage.tsx       Glow, car cut-out layers, reflection, swipe/tap area
│  │  ├─ ModelIntro.tsx          Eyebrow, name, colour (layered crossfade)
│  │  ├─ ModelSpecStrip.tsx
│  │  ├─ ModelRail.tsx
│  │  ├─ ModelRailCard.tsx
│  │  └─ SwipeHint.tsx
│  ├─ experience/                04 Experience, 04b Details Panel, 04c Gallery Fullscreen
│  │  ├─ ExperienceScreen.tsx
│  │  ├─ ExperienceVideoStage.tsx   Two stacked video slots, crossfade, currentTime carry-over
│  │  ├─ ExperienceModelBadge.tsx   Back button + name + colour pill
│  │  ├─ ModelStepButton.tsx        Prev / next + neighbour name
│  │  ├─ ViewTimeControls.tsx       Exterior | Interior · Day | Night
│  │  ├─ ExperienceActions.tsx      Details + Book Test Drive
│  │  ├─ DetailsPanel.tsx
│  │  ├─ DetailsSpecGrid.tsx
│  │  ├─ DetailsGallery.tsx
│  │  └─ GalleryFullscreen.tsx
│  ├─ showrooms/                 05 Showrooms
│  │  ├─ ShowroomsScreen.tsx
│  │  ├─ ShowroomCard.tsx
│  │  ├─ SriLankaMap.tsx
│  │  ├─ MapPin.tsx
│  │  └─ ShowroomList.tsx
│  ├─ overlays/                  Global chrome and overlays
│  │  ├─ TopNav.tsx              Logo + pill navigation
│  │  ├─ TestDriveModal.tsx      06 Test Drive Modal
│  │  ├─ TestDriveFormOverlay.tsx  (not in design – plan §1.4)
│  │  └─ IdleWarning.tsx         "Still there?"
│  └─ ui/                        Shared building blocks
│     ├─ KioskStage.tsx          1920×1080 canvas scaled to the window
│     ├─ ScreenTransition.tsx    React <ViewTransition> wrapper for screen crossfades
│     ├─ MediaPlaceholder.tsx
│     ├─ MediaImage.tsx          Image via mediaUrl() or labelled placeholder
│     ├─ MediaVideo.tsx          Looping video via mediaUrl() or labelled placeholder
│     ├─ QrCode.tsx
│     ├─ BrandLogo.tsx
│     ├─ GoldButton.tsx
│     ├─ GlassButton.tsx
│     ├─ CircleIconButton.tsx
│     ├─ SegmentButton.tsx
│     ├─ SelectableRow.tsx
│     ├─ Eyebrow.tsx
│     ├─ AccentDot.tsx
│     ├─ SpecValue.tsx          Numeric (Michroma + gold unit) or text spec value
│     ├─ VariantSelector.tsx    Variant pills (03 Models, 04b Details Panel)
│     ├─ GridBackdrop.tsx
│     ├─ SweepShine.tsx
│     ├─ RippleRings.tsx
│     └─ icons/
│        ├─ Icon.tsx             Shared 24×24 stroke frame
│        ├─ ArrowRightIcon.tsx   ArrowLeftIcon.tsx   ChevronLeftIcon.tsx   ChevronRightIcon.tsx
│        ├─ RowChevronIcon.tsx   CloseIcon.tsx       DetailsIcon.tsx
│        └─ ExteriorIcon.tsx     InteriorIcon.tsx    SunIcon.tsx           MoonIcon.tsx
│
├─ content/                      Editable data, no UI code
│  ├─ local-media.ts             Images shipped in public/media/ (served by mediaUrl)
│  ├─ model-videos.ts            36 Experience video links (dummy – replace with real URLs)
│  ├─ models.ts                  9 models → variants (description + official specs), strip-spec picker, media paths
│  ├─ showrooms.ts               9 real locations (lat/lng, Google Maps link, phone, address) + map clusters
│  ├─ home-content.ts            Battery points, platform hotspots, "In every BYD" items
│  └─ site-settings.ts           Hotline, test-drive form URL, idle timeouts, content version, site media paths
│
├─ lib/
│  ├─ types/
│  │  └─ content.ts              Model, Showroom, SiteSettings, ViewKey, TimeKey, ClipKey, …
│  ├─ media/
│  │  ├─ experience-video.ts     Clip URL: link from model-videos.ts, else storage path
│  │  ├─ media-url.ts            mediaUrl(path) → null in Stage 1, Firebase URL in Stage 2; placeholder labels
│  │  └─ media-paths.ts          Builds a model's storage paths from its slug
│  ├─ kiosk/
│  │  ├─ KioskProvider.tsx       App-wide state + actions, idle timer, controls auto-hide, simulated loading
│  │  ├─ timings.ts              Timings and swipe thresholds (design values + chosen values)
│  │  ├─ useStageScale.ts        Canvas scale from window size
│  │  └─ useOnlineStatus.ts      navigator.onLine
│  ├─ geo/
│  │  ├─ map-projection.ts       lat/lng → Sri Lanka outline position (fitted to the design)
│  │  └─ sri-lanka-provinces.ts  GENERATED province fills + borders (Natural Earth)
│  ├─ qr/
│  │  └─ qr-matrix.ts            URL → QR SVG path (qrcode package, local, works offline)
│  └─ style/
│     ├─ rgba.ts                 hex + alpha → rgba(), two-digit index helper
│     └─ cn.ts                   Class name joiner
│
├─ hooks/
│  └─ useSwipe.ts                Pointer Events swipe/tap with distance + angle thresholds (Models, Experience)
│
├─ scripts/
│  └─ build-sri-lanka-provinces.mjs  Regenerates lib/geo/sri-lanka-provinces.ts
│
├─ public/                       (placeholders are CSS; icons/ added in Stage 4)
│
└─ docs/
   └─ design-inventory.md        This file
```

Changes from the planned tree: the idle timer and controls auto-hide live inside
`KioskProvider` (one shared 250 ms tick, as in the design), so `useIdleTimer.ts`
and `useControlsAutoHide.ts` were not needed. Added `MediaImage`, `MediaVideo`,
`timings.ts`, `useOnlineStatus.ts` and `cn.ts`. `GlassCard` was dropped (cards
differ too much to share one component).

---

## 11. Stage 1 decisions (approved after the audit)

1. 01 Loading runs the design's simulated sequence on every app start (real progress in Stage 3).
2. QR codes are generated locally with `qrcode` (approved) from data. Test-drive QRs encode the
   John Keells CG Auto register-your-interest form. Codes are dark modules on a light-gold square
   inside the design's gold frame (dark-on-light scans on every phone). QRs without a URL
   (showroom directions) keep the design's placeholder art.
3. Placeholder and QR labels may be smaller than 22 px (temporary); all real text is ≥ 22 px.
4. On-screen model names follow the design ("Racco"); `fullName` ("BYD Racco") is kept for metadata.
5. A vertical drag on the 03 Models car area does nothing; only a real tap opens 04 Experience.
6. The idle reset matches the design (returns to Home and closes overlays; selections are kept).
7. "Open form here" opens a full-screen iframe overlay. The current form site blocks iframes
   (`X-Frame-Options: SAMEORIGIN`), so `testDriveFormEmbeddable` is false and the button is hidden;
   the QR code is the way to the form.
8. Blur values follow the design; the pulse rings and the pin dot move/grow with transforms.
9. The "Prototype · jump to" dev bar is not built; starter SVGs removed; styled not-found added.

---

## 12. Model variants and official specs (added after Stage 1)

Source: John Keells CG Auto spec sheets supplied by the client (one per variant).

Models are listed in **alphabetical order** (rail, counter, prev / next) and the kiosk
starts on the first one (Atto 1).

| Model | Variants (in supplied order) |
|---|---|
| Atto 1 | Dynamic · Premium |
| Atto 2 | one version (no variant name) |
| Atto 3 | Advanced · Superior |
| Dolphin | Dynamic-70 · Premium-150 · Premium-99 |
| Racco | Advanced · Dynamic · Premium |
| Sealion 5 | Dynamic · Premium |
| Sealion 6 | Premium · Superior |
| Sealion 8 | Dynamic · Premium |
| Shark 6 | Premium (only) |

**Data:** each model has `variants[]`; each variant has a description and its 6 specs in
spec-sheet order (`SpecItem`: label, value, optional unit and note). Videos, images and
the Exterior / Interior × Day / Night player are shared by all variants of a model.

**UI changes (in the design's style):**
- 03 Models: variant pills (64 px, segment-button styling) under the colour; the spec strip
  shows the variant's 3 key numeric specs (range, top speed, acceleration, … by priority)
  with a qualifier line (NEDC, 0–100 km/h, 20% to 80%, …). Left column re-spaced:
  intro top 176, pills 380, strip 464, buttons 632.
- 04b Details Panel: Variant pills (compact), the variant description, then all specs as
  a 2-column card grid. Text values (e.g. "BYD Blade Battery") use Sora; numbers keep
  Michroma + gold unit.
- Selected variant is shared (Models ↔ Experience ↔ Details) and resets to the first
  variant when the model changes. Single named variant (Shark 6) shows a static pill;
  Atto 2 shows none.
- Highlights chips removed: they were design placeholders and no highlight data was supplied.

**Editorial tidy-ups (values unchanged):** consistent labels ("Top speed", "Fast charging",
"Seating", "Combined range", …); "160 km//h" → 160 km/h; "Combine Range" → Combined range;
"21 minutes" → 21 min; hyphen-as-dash in descriptions → em dash.

**Units added where the sheet gave none (to confirm with the client):**
- Racco Advanced / Premium ground clearance "130" → shown as **130 mm**.
- Sealion 5 top speed "170" → shown as **170 km/h**.

---

## 13. Main contact details (added after Stage 1)

Stored in `content/site-settings.ts` → `contact` (replaces the old `hotline` field):

| Field | Value |
|---|---|
| Phone (hotline) | +94 112 125 125 |
| Email | info.jkcg@keells.com |
| Call centre hours | 07:00 – 19:00 |
| Head office | John Keells CG Auto Head Office, 186, Vauxhall Street, Colombo 02 |

Shown in:
- 02 Home – "Find your BYD": "Hotline +94 112 125 125 · 07:00 – 19:00".
- 06 Test Drive Modal: hotline number + "Call centre 07:00 – 19:00".
- 04b Details Panel QR block: "Hotline +94 112 125 125".
- 05 Showrooms: bottom contact row (replaces the design's single Hotline block):
  Hotline + hours · Email · Head office, with thin dividers; clears the test-drive QR.

Individual showroom addresses, phones and hours remain placeholders (not supplied).

---

## 14. Real showroom locations (added after Stage 1)

Source: Google Maps share links supplied by the client. The design's placeholder towns were
removed; Ampara, Batticaloa and Jaffna were later added back as real locations. List is
alphabetical; the screen opens on Colombo – Altair (`DEFAULT_SHOWROOM_INDEX`).

| # | List name | Type | Coordinates (from the link) | Phone | Directions QR |
|---|---|---|---|---|---|
| 01 | Ampara | 3S Facility | 7.29475, 81.69202 | +94 77 887 9970 | share.google/x7VfUunjeOWYSa3Mx |
| 02 | Batticaloa | Showroom | 7.72983, 81.67734 | +94 112 125 125 | share.google/IBUbRSOLrtAawwMyX |
| 03 | Colombo – Altair | Showroom | 6.91874, 79.85420 | +94 112 125 125 | maps.app.goo.gl/GSNKogMeswaonQFK6 |
| 04 | Colombo – Union Place | Showroom | 6.91878, 79.86173 | +94 112 125 125 | maps.app.goo.gl/GzGS6Tga8d9L72qi9 |
| 05 | Colombo – Vauxhall Street | Showroom | 6.92220, 79.85825 | +94 112 125 125 | maps.app.goo.gl/JVW6oSjmNA6XsZ998 |
| 06 | Galle | Showroom | 6.03344, 80.24518 | +94 77 310 4000 | maps.app.goo.gl/7EE2Y2BdKzFCEjx67 |
| 07 | Jaffna | 3S Facility | 9.63279, 80.09038 | +94 112 125 125 | share.google/PalIaTY6DWjJGzqH2 |
| 08 | Kandy | Showroom | 7.31515, 80.63059 | +94 112 125 125 | maps.app.goo.gl/geNFUMza4WvqDgxC7 |
| 09 | Kurunegala | 3S Facility | 7.44071, 80.34020 | +94 112 125 125 | maps.app.goo.gl/1WWSrh7XT958PbbU7 |
| 10 | Moratuwa | Showroom | 6.79543, 79.88771 | +94 112 125 125 | maps.app.goo.gl/orUBii7U8LMFt76R9 |
| 11 | Negombo | Showroom | 7.22079, 79.84643 | +94 112 125 125 * | maps.app.goo.gl/KiHdNpKAxCo2ueEV7 |
| 12 | Ratnapura | 3S Facility | 6.67743, 80.41640 | +94 112 125 125 | maps.app.goo.gl/HNcTGDJTLgqGBM2z5 |

Ampara, Batticaloa and Jaffna: name, address, phone and pin from each place's Google
listing (the share links open the listing). Ampara and Batticaloa pins match their listed
Plus Codes (7MVR+VR, PMHG+WW).

* Negombo listing has no number; the main hotline is shown (to confirm).

**Map:** pins are placed from the real coordinates with `lib/geo/map-projection.ts`
(equirectangular fit to the design's outline; error ≤ 3 viewBox units). The map moved
from x 660 to x 760 to give the west-coast labels room. The three central-Colombo
locations are < 1 km apart (same pixel), so they share one **cluster pin** ("Colombo" + "3"
badge); tapping it selects them in turn. Moratuwa's label is nudged down 14 px to clear it,
and Ampara's 30 px to clear Kandy's.

**Card:** eyebrow "BYD Showroom" / "BYD 3S Facility", title = town, address, phone,
hours, directions QR (real, from the share link). The list is two columns of 88 px rows
(read down, then across) so all 12 fit; Colombo rows show the area on a second line.

**To confirm with the client:**
- Addresses: Galle as supplied; the others are the street at the map pin
  (reverse-geocoded, OpenStreetMap) – e.g. "Galle Road, Moratuwa".
- Opening hours: not supplied (listings only show a Saturday opening time) – shown as TBC.

---

## 15. Map polish and Experience video links (added after Stage 1)

**05 Showrooms map**
- Province borders: dashed fine gold lines between the 9 provinces (no coastline), clipped
  to the design's outline.
- The selected showroom's province fills with a soft gold glow (opacity transition, 600 ms).
- Island texture: fine gold dot grid + warm radial fill, clipped to the outline.
- Data: `lib/geo/sri-lanka-provinces.ts`, generated by `scripts/build-sri-lanka-provinces.mjs`
  from Natural Earth 1:10m admin-1 (public domain; 25 districts grouped into provinces).
  The kiosk never loads boundary data. Each showroom stores its `province`.

**04 Experience video links**
- `content/model-videos.ts`: one URL per model × clip (36). Currently **dummy links**
  (`https://example.com/byd-kiosk/videos/{slug}/{slug}-{view}-{time}.mp4`) – replace with real URLs.
- `lib/media/experience-video.ts` picks the link; an empty link falls back to the storage path.
- Player safety: the labelled placeholder sits under every video, so a slow or broken link
  never shows black; a failed link drops the video; if the next clip isn't ready within
  **1.5 s** (chosen) the switch happens anyway and the placeholder shows until it loads.
- Verified with a real MP4 (test only): plays, crossfades on Exterior/Interior, keeps
  currentTime across the switch, pauses the hidden clip.

---

## 16. BYD logo (added after Stage 1)

The client's logo files (`public/logo/logo_white.jpg`, `logo_black.jpg`) are JPGs with a
fake-transparency checkerboard baked in. They were rebuilt as true transparent PNGs
(575 × 122, trimmed): the black JPG is used as a stencil (checkerboard ≥ 220 brightness →
transparent, logo ≤ 40 → opaque, smooth edge in between).

- `public/brand/byd-logo-white.png` – used on 01 Loading (centred) and the top nav (left-aligned).
- `public/brand/byd-logo-black.png` – for light backgrounds (not used yet; e.g. OG images later).

`BrandLogo` serves them from `/public` (unoptimized `next/image`), so the logo is part of
the app rather than Firebase media; `SiteMedia.logo` was removed.

---

## 17. Official model images (added after Stage 1)

Source: official product pages on johnkeellscgauto.com (`/product/byd-…/`), downloaded and
prepared for the kiosk (WebP). Files live in `public/media/models/<slug>/` with the same
names as the storage layout; `content/local-media.ts` lists them and `mediaUrl()` serves
them locally (anything not listed stays a placeholder).

| Model | Cut-out (1020×430, transparent) | Rail thumb | Gallery (4) | Image colour vs kiosk colour |
|---|---|---|---|---|
| Atto 1 | ✓ client photo, background removed (AI, rembg) | from cut-out | ✓ | green ✓ Sprout Green |
| Atto 2 | white background removed (good, minor edge softness) | from cut-out | ✓ | teal ≈ Bubblegum Green |
| Atto 3 | ✓ official transparent PNG | from cut-out | ✓ | **black** vs Red |
| Dolphin | ✓ official transparent PNG | from cut-out | ✓ | grey ✓ Atlantis Grey |
| Racco | ✓ client photo, background removed (AI, rembg) | from cut-out | ✓ | **light blue** vs Midnight Blue |
| Sealion 5 | white background removed (visible blockiness on roofline – replace) | from cut-out | ✓ | **blue** vs Cosmos Black |
| Sealion 6 | ✓ official transparent PNG | from cut-out | ✓ | **grey** vs Arctic White |
| Sealion 8 | ✓ client photo, background removed (AI, rembg) | from cut-out | ✓ | **black** vs Dark Aquamarine |
| Shark 6 | ✓ official transparent PNG | from cut-out | ✓ | **blue** vs Outback Orange |

Cut-outs: trimmed, fitted to 1020×430 sitting on the bottom edge (enlarged 1.1–1.6× from
the 800 px sources). White-background removal: region-grow from the edges through
white/grey, grey shadow → soft dark shadow, 3 px edge band decontaminated against white
and feathered. Gallery: official 1600×620 / 1900×820 photos (no upscaling; the 1560×820
slot crops with object-fit: cover). 51 files, 3.8 MB.

Atto 1, Racco and Sealion 8 cut-outs: client-supplied photos (~610–660 px wide), background
removed with rembg (`isnet-general-use` + alpha matting, run in an isolated scratch
environment – not a project dependency), enlarged 1.25–1.41×. The client also supplied a
white Dolphin photo; the official grey Dolphin was kept because it matches its label.

**Still needed:** higher-resolution transparent cut-outs (and better ones for Sealion 5 /
Atto 2), ideally in the colours shown on the kiosk; Home images
(blade battery, e-platform, line-up) and video posters are still placeholders.

---

## 18. Stages 2–5 (responsive layout, Home redesign, offline, app, kiosk)

**Responsive canvas** (`lib/kiosk/useStage.ts`, `components/ui/KioskStage.tsx`)
- Width stays 1920 design px; height follows the screen shape: `1920 × vh / vw`, clamped to
  **1080–1280** (16:9 → 1080, kiosk 4'2" × 2'5" ≈ 1.72:1 → 1116, 16:10 → 1200). Outside
  that range the canvas fits with thin bars; nothing is cropped.
- CSS vars `--stage-h` (canvas height) and `--stage-shift` (half the extra height).
- A tiny inline script in `<head>` (`STAGE_BOOT_SCRIPT`, `lib/kiosk/stage-math.ts`) sizes the
  canvas before the first paint, so nothing moves when React takes over (layout shift 0).
  `DesignFrame` keeps the design's 1080-tall layouts centred; edge-anchored parts (rail,
  contact row, QR, bars) stay on the edges.

**Media fallbacks** – links are never shown to visitors.
- Experience: the model's cut-out on its accent glow + slow gold sweep under each video
  (`VideoBackdrop`); a failing link retries once, then stays on the cut-out.
- Home hero: BYD logo on dark; Blade Battery: the battery photo.
- `?debug=1` shows the developer labels (`?debug=0` hides them; per tab).
- The Details panel's Feature video was removed.

**02 Home** (videos in `content/site-videos.ts`, copy in `content/home-content.ts`)
- *Hero* – full-screen `heroShowreel` (BYD brand film, 1920×1080, 90 s), "Drive the Future".
1. *Blade Battery* – full screen (one stage height, like the hero), `bladeBattery` film
   (1280×720, 115 s) over the battery photo. The film has its own captions (bottom centre)
   and titles (top centre), so the text sits in a left column over a dark gradient:
   eyebrow, "The battery is the structure", a lead line (`REVIEW`), and the three battery
   points as a numbered list.
2. *In every BYD* – unchanged.
3. *Find your BYD* – the client's line-up photo (`home/lineup.webp`, trimmed from `lineup-new.png`) on a gold horizon.
- The interactive chassis section ("Under the skin / Power, laid out") was removed.

**Offline (Stage 3)** – `public/sw.js`, `lib/offline/*`
- `byd-shell-v2`: pages + RSC payloads (network-first 3 s), `/_next/static` (only files the server marks immutable, so never in dev), `/media`,
  `/brand`, `/icons` (cache-first). `byd-media-v1`: videos, written only by the page,
  served by the worker with Range support. Keys drop Firebase's `token`.
- First launch: 01 Loading shows "X of N videos ready" (real links only; dummies skipped).
  No progress for **60 s** (chosen) → the app opens and downloads continue.
- `contentVersion` change → download new links only, then delete unused ones.
- Kiosk status screen (read-only): tap the BYD logo 5 times within 3 s. Shows videos saved
  x of N, network and content version; no PIN, no buttons.

**App and link previews (Stage 4)** – `app/manifest.ts` (fullscreen, landscape),
icons from the logo (`scripts/build-icons.mjs`), titles "%s | BYD Sri Lanka",
1200×630 previews for the site and each model (Michroma, cut-out, accent glow),
`robots.txt`, `sitemap.xml`. Site URL from `NEXT_PUBLIC_SITE_URL`.

**Kiosk (Stage 5)** – no context menu, selection, image drag, overscroll or zoom
(`KioskGuards` + CSS); screen wake lock; error → "Restarting…" → Home after 5 s;
blur capped at 16 px with a solid fallback; reduced-motion stops the decorative loops;
status screen and test-drive form load on first open; `?autotour=1` soak-test tour.

Setup and operations: `docs/kiosk-setup.md`. Media status: `docs/assets.md`.
