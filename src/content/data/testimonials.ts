import type { Localized } from "@/lib/i18n";

export interface Testimonial {
  author: string;
  short: string;
  role: Localized;
  company: string;
  quote: Localized;
  /** Company logo shown in the avatar circle; falls back to `short` initial. */
  logo?: string;
}

/**
 * NOTE for client: quotes are drafted from the original feedback summaries —
 * please confirm or replace with verbatim client testimonials.
 */
export const testimonials: Testimonial[] = [
  {
    author: "Василина",
    short: "В",
    role: { ru: "Директор", kz: "Директор" },
    company: "Rassada Astana",
    quote: {
      ru: "Работа выполнена профессионально и в срок. Любые вопросы решались быстро, уровень сервиса высокий — рекомендую.",
      kz: "Жұмыс кәсіби әрі уақытында орындалды. Кез келген сұрақ жылдам шешілді, сервис деңгейі жоғары — ұсынамын.",
    },
  },
  {
    author: "Зарина",
    short: "З",
    role: { ru: "Менеджер", kz: "Менеджер" },
    company: "Rabbit Canteen",
    quote: {
      ru: "Система заметно упростила работу и уменьшила количество ошибок. Отдельное спасибо за поддержку после запуска.",
      kz: "Жүйе жұмысты айтарлықтай жеңілдетіп, қателер санын азайтты. Іске қосқаннан кейінгі қолдау үшін бөлек рахмет.",
    },
  },
  {
    author: "Арайлым",
    short: "А",
    role: { ru: "Менеджер", kz: "Менеджер" },
    company: "Dveriline",
    logo: "/clients/dveriline-kz.png",
    quote: {
      ru: "Грамотный подход и качественное обучение команды. Чувствуется экспертиза — с такими партнёрами уверенно.",
      kz: "Сауатты тәсіл әрі команданы сапалы оқыту. Тәжірибе сезіледі — мұндай серіктеспен сенімдіміз.",
    },
  },
];
