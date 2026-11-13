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
    "interior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%201%2Fin%2FDay_Atto1_Interior.mp4?alt=media&token=b8272431-fe58-430a-9143-95f12ad14039",
    "interior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%201%2Fin%2FNight_Atto1_Interior.mp4?alt=media&token=e1e5f6f1-ea01-4de4-8ca5-a3e25d5ccb1d",
  },
  "atto-2": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%202%2Fout%2FDay_Atto2.mp4?alt=media&token=985da2e1-49e9-40f8-95fa-6e96a18d27b8",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%202%2Fout%2FNight_Atto2.mp4?alt=media&token=15574c04-50f6-494d-ae92-47def1b2d641",
    "interior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%202%2Fin%2FDay_Atto2_Interior.mp4?alt=media&token=3cfdf07f-1e09-49a3-aaa2-d6d12e6bcef2",
    "interior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fatto%202%2Fin%2FNight_Atto2_Interior.mp4?alt=media&token=ea61eeef-18cd-4a18-9b68-bd62c8d76a2b",
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
    "interior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fdolphin%2Fin%2FDay_Dolphin_Interior.mp4?alt=media&token=83a90f3f-603d-4916-bef8-5765c3ec1ed9",
    "interior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fdolphin%2Fin%2FNight_Dolphin_Interior.mp4?alt=media&token=0da3a560-9c05-4776-948f-c272c16f0e93",
  },
  "racco": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fracco%2Fout%2Fday_racco.mp4?alt=media&token=7a89b95a-e59e-4515-b7c2-649db60e15bd",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fracco%2Fout%2Fnight_racco.mp4?alt=media&token=c8390e35-a24d-473d-bc68-e92d195314ba",
    "interior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fracco%2Fin%2Fday_racco_interior.mp4?alt=media&token=cc32043c-1af3-4285-a59f-27ec98e55a1c",
    "interior-night": "https://example.com/byd-kiosk/videos/racco/racco-interior-night.mp4",
  },
  "sealion-5": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%205%2Fout%2FDay_Sealion5.mp4?alt=media&token=0c8d55b2-5b9c-4201-92f3-ae4695e1c92d",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%205%2Fout%2FNight_Sealion5.mp4?alt=media&token=30afae3d-7042-4b84-8671-67ece2f65e05",
    "interior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%205%2Fin%2FDay_Sealion5_Interior.mp4?alt=media&token=f162688b-55d0-4e7b-a71a-0f7f64ab7762",
    "interior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%205%2Fin%2FNight_Sealion5_Interior.mp4?alt=media&token=ec556ced-1cdd-41a0-a9d6-0066f10c76ad",
  },
  "sealion-6": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%206%2Fout%2FDay_Sealion6.mp4?alt=media&token=74744bd5-0a51-4575-ba84-d0b2981c055c",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%206%2Fout%2FNight_Sealion6.mp4?alt=media&token=95af22d0-bbb4-49ce-a7df-10299e9dc024",
    "interior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%206%2Fin%2FDay_Sealion6_Interior.mp4?alt=media&token=fa95eeb2-f92a-4bec-9b99-f92b86e26f67",
    "interior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%206%2Fin%2FNight_Sealion6_Interior.mp4?alt=media&token=eaa82533-3dd1-49f3-b9c2-2c0fde6170c3",
  },
  "sealion-8": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%208%2Fout%2FDay_Sealion8.mp4?alt=media&token=ad90874d-aa90-4b84-95a2-1630ef13ac4e",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%208%2Fout%2FNight_Sealion8.mp4?alt=media&token=19c778c0-bb3f-4032-b0cc-3e3d05b4151b",
    "interior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%208%2Fin%2FDay_Sealion8_Interior.mp4?alt=media&token=74c56437-ff4a-4325-b419-0b6a2083cfce",
    "interior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fsealion%208%2Fin%2FNight_Sealion8_Interior.mp4?alt=media&token=6d6851b1-f93d-40dc-843b-7d7366ae1a83",
  },
  "shark-6": {
    "exterior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fshark%2Fout%2Fday_shark.mp4?alt=media&token=1491aebb-42e4-444c-b705-4131c309f75f",
    "exterior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fshark%2Fout%2Fnight_shark.mp4?alt=media&token=c9e01f50-9e4c-437b-a333-ee06a6900c29",
    "interior-day": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fshark%2Fin%2FDay_Shark6_Interior.mp4?alt=media&token=329f7aad-d114-4b1b-b980-a5a53915c22b",
    "interior-night": "https://firebasestorage.googleapis.com/v0/b/byd-ht-project.firebasestorage.app/o/byd-cars%2Fshark%2Fin%2FNight_Shark6_Interior.mp4?alt=media&token=8c1513a0-9449-4ffa-babe-d1f8a2f78a4f",
  },
};
