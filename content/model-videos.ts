import type { ClipKey } from "@/lib/types/content";

/**
 * 04 Experience video links: 9 models × Exterior / Interior × Day / Night = 36 videos.
 *
 * ⚠ DUMMY LINKS – replace each one with the real video URL.
 *   Format: MP4 (H.264), 1920 × 1080, no audio, ~10 s loop. See DEVELOPMENT_PLAN.md §2.3.
 *
 * - While a link loads, or if it fails (like these dummies), the car cut-out shows instead,
 *   so the screen never goes black and links are never shown to visitors (?debug=1 shows them).
 * - An empty link ("") falls back to the model's storage path (Firebase, Stage 2).
 * - All variants of a model share these videos.
 */
export const MODEL_VIDEO_LINKS: Readonly<Record<string, Readonly<Record<ClipKey, string>>>> = {
  "atto-1": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%201%2Fout%2FDay_Atto1.mp4?alt=media&token=373c701c-090e-41b9-aafd-4833d0fa9495",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%201%2Fout%2FNight_Atto1.mp4?alt=media&token=42c9c887-e0b8-43d0-b366-73ef934aeedb",
    "interior-day": "https://example.com/byd-kiosk/videos/atto-1/atto-1-interior-day.mp4",
    "interior-night": "https://example.com/byd-kiosk/videos/atto-1/atto-1-interior-night.mp4",
  },
  "atto-2": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%202%2Fout%2FDay_Atto2.mp4?alt=media&token=985da2e1-49e9-40f8-95fa-6e96a18d27b8",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%202%2Fout%2FNight_Atto2.mp4?alt=media&token=15574c04-50f6-494d-ae92-47def1b2d641",
    "interior-day": "https://example.com/byd-kiosk/videos/atto-2/atto-2-interior-day.mp4",
    "interior-night": "https://example.com/byd-kiosk/videos/atto-2/atto-2-interior-night.mp4",
  },
  "atto-3": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%203%2Fout%2FDay_Atto3.mp4?alt=media&token=d9ab7c4b-4b4c-43a5-9274-c12a817c781d",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%203%2Fout%2FNight_Atto3.mp4?alt=media&token=646df75f-5bf2-4ca5-887a-4f32034d3baa",
    "interior-day": "https://example.com/byd-kiosk/videos/atto-3/atto-3-interior-day.mp4",
    "interior-night": "https://example.com/byd-kiosk/videos/atto-3/atto-3-interior-night.mp4",
  },
  "dolphin": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fdolphin%2Fout%2FDay_Dolphin.mp4?alt=media&token=95466f5d-cd4c-436e-a35c-98c830c0c1e3",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fdolphin%2Fout%2FNight_Dolphin.mp4?alt=media&token=bf2f7e55-e5e8-4925-9e1d-b37ac1f50707",
    "interior-day": "https://example.com/byd-kiosk/videos/dolphin/dolphin-interior-day.mp4",
    "interior-night": "https://example.com/byd-kiosk/videos/dolphin/dolphin-interior-night.mp4",
  },
  "racco": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fracco%2Fout%2Fday_racco.mp4?alt=media&token=7a89b95a-e59e-4515-b7c2-649db60e15bd",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fracco%2Fout%2Fnight_racco.mp4?alt=media&token=c8390e35-a24d-473d-bc68-e92d195314ba",
    "interior-day": "https://example.com/byd-kiosk/videos/racco/racco-interior-day.mp4",
    "interior-night": "https://example.com/byd-kiosk/videos/racco/racco-interior-night.mp4",
  },
  "sealion-5": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%205%2Fout%2FDay_Sealion5.mp4?alt=media&token=0c8d55b2-5b9c-4201-92f3-ae4695e1c92d",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%205%2Fout%2FNight_Sealion5.mp4?alt=media&token=30afae3d-7042-4b84-8671-67ece2f65e05",
    "interior-day": "https://example.com/byd-kiosk/videos/sealion-5/sealion-5-interior-day.mp4",
    "interior-night": "https://example.com/byd-kiosk/videos/sealion-5/sealion-5-interior-night.mp4",
  },
  "sealion-6": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%206%2Fout%2FDay_Sealion6.mp4?alt=media&token=74744bd5-0a51-4575-ba84-d0b2981c055c",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%206%2Fout%2FNight_Sealion6.mp4?alt=media&token=95af22d0-bbb4-49ce-a7df-10299e9dc024",
    "interior-day": "https://example.com/byd-kiosk/videos/sealion-6/sealion-6-interior-day.mp4",
    "interior-night": "https://example.com/byd-kiosk/videos/sealion-6/sealion-6-interior-night.mp4",
  },
  "sealion-8": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%208%2Fout%2FDay_Sealion8.mp4?alt=media&token=ad90874d-aa90-4b84-95a2-1630ef13ac4e",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%208%2Fout%2FNight_Sealion8.mp4?alt=media&token=19c778c0-bb3f-4032-b0cc-3e3d05b4151b",
    "interior-day": "https://example.com/byd-kiosk/videos/sealion-8/sealion-8-interior-day.mp4",
    "interior-night": "https://example.com/byd-kiosk/videos/sealion-8/sealion-8-interior-night.mp4",
  },
  "shark-6": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fshark%2Fout%2Fday_shark.mp4?alt=media&token=1491aebb-42e4-444c-b705-4131c309f75f",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fshark%2Fout%2Fnight_shark.mp4?alt=media&token=c9e01f50-9e4c-437b-a333-ee06a6900c29",
    "interior-day": "https://example.com/byd-kiosk/videos/shark-6/shark-6-interior-day.mp4",
    "interior-night": "https://example.com/byd-kiosk/videos/shark-6/shark-6-interior-night.mp4",
  },
};
