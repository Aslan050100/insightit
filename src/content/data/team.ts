import type { Localized } from "@/lib/i18n";

export interface TeamMember {
  id: string;
  /** Full name (ФИО). Empty until the client sends it — card falls back to the role. */
  name?: string;
  role: Localized;
  /** Photo in /public/team/. Falls back to monogram / person icon if missing. */
  photo?: string;
  /** 1–2 letter monogram for the avatar fallback. */
  monogram?: string;
}

/**
 * NOTE for client: пришлите ФИО + должность + фото каждого сотрудника —
 * заменим плейсхолдеры (роли без имени) на реальных членов команды.
 * Фото кладём в /public/team/ и указываем в `photo`.
 */
export const team: TeamMember[] = [
  {
    id: "founder",
    name: "Аслан Айткулов",
    role: { ru: "Основатель и руководитель", kz: "Негізін қалаушы әрі басшы" },
    photo: "/team/aslan.jpg",
    monogram: "АА",
  },
  {
    id: "crm",
    name: "Рустам",
    role: {
      ru: "Специалист Bitrix24 и 1С",
      kz: "Bitrix24 және 1С маманы",
    },
    monogram: "Р",
  },
  {
    id: "dev",
    name: "Абай",
    role: { ru: "Веб-разработчик", kz: "Веб-әзірлеуші" },
    monogram: "А",
  },
  {
    id: "pm",
    name: "Айсулу",
    role: { ru: "Менеджер проектов", kz: "Жоба менеджері" },
    monogram: "А",
  },
  {
    id: "support",
    name: "Алишер",
    role: { ru: "Специалист поддержки", kz: "Қолдау маманы" },
    monogram: "А",
  },
];
