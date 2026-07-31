import type { Localized } from "@/lib/i18n";

export interface CaseStudy {
  slug: string;
  company: string;
  short: string;
  metricPrefix?: string;
  metricValue: number;
  metricSuffix?: string;
  metricLabel: Localized;
  summary: Localized;
  tag: Localized;
  featured?: boolean;
}

export const cases: CaseStudy[] = [
  {
    slug: "etasa",
    company: "Etasa Group",
    short: "EG",
    metricPrefix: "+",
    metricValue: 40,
    metricSuffix: "%",
    metricLabel: { ru: "конверсии в сделку за 1 месяц", kz: "1 айда мәмілеге конверсия" },
    summary: {
      ru: "Навели порядок в воронке и автоматизировали обработку лидов — отдел продаж стал закрывать заметно больше сделок.",
      kz: "Воронкада тәртіп орнатып, лидтерді өңдеуді автоматтандырдық — сату бөлімі айтарлықтай көп мәміле жаба бастады.",
    },
    tag: { ru: "Bitrix24 · Продажи", kz: "Bitrix24 · Сату" },
    featured: true,
  },
  {
    slug: "dveriline",
    company: "Dveriline",
    short: "DL",
    metricPrefix: "×",
    metricValue: 2,
    metricLabel: { ru: "быстрее обработка заявок", kz: "өтінімдерді өңдеу жылдамдығы" },
    summary: {
      ru: "Свели все каналы в одно окно и обучили команду — заявки обрабатываются вдвое быстрее.",
      kz: "Барлық арнаны бір терезеге жинап, команданы оқыттық — өтінімдер екі есе жылдам өңделеді.",
    },
    tag: { ru: "CRM · Обучение", kz: "CRM · Оқыту" },
  },
  {
    slug: "akm",
    company: "AKM Almaty Floor",
    short: "AKM",
    metricValue: 0,
    metricLabel: { ru: "потерянных заявок после внедрения", kz: "енгізуден кейін жоғалған өтінім" },
    summary: {
      ru: "Подключили все источники лидов к CRM — ни одна заявка больше не теряется.",
      kz: "Барлық лид көздерін CRM-ге қостық — енді бірде-бір өтінім жоғалмайды.",
    },
    tag: { ru: "Bitrix24 · Интеграции", kz: "Bitrix24 · Интеграциялар" },
  },
  {
    slug: "rassada",
    company: "Rassada Astana",
    short: "RA",
    metricPrefix: "~",
    metricValue: 500,
    metricLabel: { ru: "заказов в сжатые сроки", kz: "қысқа мерзімде тапсырыс" },
    summary: {
      ru: "Запустили процессы под высокий сезон — система выдержала пик и помогла обработать сотни заказов.",
      kz: "Жоғары маусымға процестерді іске қостық — жүйе шыңды көтеріп, жүздеген тапсырысты өңдеуге көмектесті.",
    },
    tag: { ru: "CRM · Масштаб", kz: "CRM · Ауқым" },
  },
];

/** Logo-only clients shown in the trust wall. */
export const clientLogos: { name: string; short: string }[] = [
  { name: "Prime Expo", short: "PE" },
  { name: "BBCA", short: "BB" },
  { name: "Loan23", short: "L23" },
  { name: "Astom.kz", short: "As" },
  { name: "DSF", short: "DSF" },
  { name: "Green Park Build", short: "GPB" },
  { name: "AgroTop.kz", short: "AT" },
  { name: "Demilune", short: "Dm" },
];
