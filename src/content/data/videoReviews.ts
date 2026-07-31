import type { Localized } from "@/lib/i18n";

export interface VideoReview {
  id: string;
  author: string;
  role: Localized;
  company: string;
  /** Vertical (9:16) video in /public/videos/. Empty → poster only with a "soon" badge. */
  src?: string;
  /** Poster image in /public/videos/. Falls back to a gradient + monogram. */
  poster?: string;
  monogram: string;
}

/**
 * NOTE for client: пришлите вертикальные видео-отзывы (Reels, .mp4) —
 * положим их в /public/videos/ и подключим в `src` (+ постер в `poster`).
 * Пока показываем плейсхолдеры с пометкой «скоро».
 */
export const videoReviews: VideoReview[] = [
  {
    id: "v1",
    author: "Василина",
    role: { ru: "Директор", kz: "Директор" },
    company: "Rassada Astana",
    monogram: "В",
  },
  {
    id: "v2",
    author: "Зарина",
    role: { ru: "Менеджер", kz: "Менеджер" },
    company: "Rabbit Canteen",
    monogram: "З",
  },
  {
    id: "v3",
    author: "Арайлым",
    role: { ru: "Менеджер", kz: "Менеджер" },
    company: "Dveriline",
    monogram: "А",
  },
  {
    id: "v4",
    author: "Отдел продаж",
    role: { ru: "Руководитель", kz: "Басшы" },
    company: "Etasa",
    monogram: "E",
  },
];
