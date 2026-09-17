import type { Localized } from "@/lib/i18n";

/**
 * Single source of truth for all contact details + social handles.
 */
export const contacts = {
  brand: "InsightIT",
  phone: "+7 (700) 404-00-32",
  phoneDigits: "77004040032",
  email: "pro@insightit.kz",
  whatsapp: "77004040032",
  telegram: "insightitkz",
  instagram: "insightit.kz",
  domain: "insightit.kz",
  address: {
    ru: "г. Алматы, проспект Абая, 68",
    kz: "Алматы қ., Абай даңғылы, 68",
  } satisfies Localized,
  /** Geocoded coordinates of the office (проспект Абая, 68) for the map embed. */
  geo: { lat: 43.2388787, lon: 76.9045975 },
  hours: {
    ru: "Пн–Пт, 10:00–19:00",
    kz: "Дс–Жм, 10:00–19:00",
  } satisfies Localized,
};

/** Ready-to-send prefilled WhatsApp messages, keyed by intent. */
export const waMessages = {
  general: {
    ru: "Здравствуйте! Хочу обсудить проект с InsightIT.",
    kz: "Сәлеметсіз бе! InsightIT-пен жоба талқылағым келеді.",
  } satisfies Localized,
  audit: {
    ru: "Здравствуйте! Хочу получить бесплатный аудит CRM / бизнес-процессов.",
    kz: "Сәлеметсіз бе! CRM / бизнес-процестердің тегін аудитін алғым келеді.",
  } satisfies Localized,
  crm: {
    ru: "Здравствуйте! Интересует внедрение Bitrix24 / CRM.",
    kz: "Сәлеметсіз бе! Bitrix24 / CRM енгізуге қызығамын.",
  } satisfies Localized,
  website: {
    ru: "Здравствуйте! Нужен сайт / приложение для бизнеса.",
    kz: "Сәлеметсіз бе! Бизнеске сайт / қосымша керек.",
  } satisfies Localized,
};
