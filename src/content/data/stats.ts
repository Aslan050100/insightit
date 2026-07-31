import type { Localized } from "@/lib/i18n";

export interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: Localized;
}

export const stats: Stat[] = [
  {
    value: 50,
    suffix: "+",
    label: { ru: "компаний нам доверяют", kz: "компания бізге сенеді" },
  },
  {
    value: 40,
    prefix: "+",
    suffix: "%",
    label: { ru: "к конверсии в сделку", kz: "мәмілеге конверсия өсімі" },
  },
  {
    value: 500,
    prefix: "~",
    label: { ru: "заказов в сжатые сроки", kz: "тапсырыс қысқа мерзімде" },
  },
  {
    value: 14,
    prefix: "7–",
    suffix: "",
    label: { ru: "дней на внедрение", kz: "күнде енгізу" },
  },
];
