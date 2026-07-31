import type { Localized } from "@/lib/i18n";
import { AlertTriangle, MessageSquareOff, EyeOff, Hourglass, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface PainPoint {
  icon: LucideIcon;
  title: Localized;
  desc: Localized;
}

export const painPoints: PainPoint[] = [
  {
    icon: AlertTriangle,
    title: { ru: "Заявки теряются", kz: "Өтінімдер жоғалады" },
    desc: {
      ru: "Лиды приходят из разных каналов и часть из них остаётся без ответа.",
      kz: "Лидтер әртүрлі арнадан келеді, бір бөлігі жауапсыз қалады.",
    },
  },
  {
    icon: MessageSquareOff,
    title: { ru: "Клиенты пишут везде", kz: "Клиенттер бәр жерден жазады" },
    desc: {
      ru: "WhatsApp, Instagram, телефон — сообщения разбросаны и теряются.",
      kz: "WhatsApp, Instagram, телефон — хабарлар шашыраңқы әрі жоғалады.",
    },
  },
  {
    icon: EyeOff,
    title: { ru: "Нет контроля над продажами", kz: "Сатуға бақылау жоқ" },
    desc: {
      ru: "Непонятно, на каком этапе сделки и сколько денег в воронке.",
      kz: "Мәміле қай кезеңде, воронкада қанша ақша бар екені белгісіз.",
    },
  },
  {
    icon: Hourglass,
    title: { ru: "Рутина съедает время", kz: "Күнделікті рутина уақытты жейді" },
    desc: {
      ru: "Ручные задачи и переписки отнимают часы, которые можно автоматизировать.",
      kz: "Қол еңбегі мен хат алмасу автоматтауға болатын сағаттарды алады.",
    },
  },
  {
    icon: Users,
    title: { ru: "Команда работает вразнобой", kz: "Команда бытыраңқы жұмыс істейді" },
    desc: {
      ru: "Нет единых правил и прозрачности — каждый ведёт дела по-своему.",
      kz: "Бірыңғай ереже мен ашықтық жоқ — әркім өзінше жұмыс істейді.",
    },
  },
];
