import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { pageMeta } from "@/lib/metadata";
import { WebHero } from "@/components/sections/web/WebHero";
import { WebPains } from "@/components/sections/web/WebPains";
import { WebTypes } from "@/components/sections/web/WebTypes";
import { WebPricing } from "@/components/sections/web/WebPricing";
import { WebProcess } from "@/components/sections/web/WebProcess";
import { WebIncluded } from "@/components/sections/web/WebIncluded";
import { WebProjects } from "@/components/sections/web/WebProjects";

export const generateMetadata = pageMeta(
  {
    ru: "Разработка сайтов под ключ в Казахстане",
    kz: "Сайт әзірлеу — Қазақстанда кілтпен",
  },
  {
    ru: "Создаём сайты, лендинги и интернет-магазины под задачи бизнеса: дизайн под бренд, адаптив, скорость и интеграция с Bitrix24 / CRM. Запуск от 7 дней.",
    kz: "Бизнес міндеттеріне сай сайт, лендинг және интернет-дүкен жасаймыз: брендке сай дизайн, адаптив, жылдамдық және Bitrix24 / CRM интеграциясы. 7 күннен бастап.",
  },
);

export default async function WebPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <WebHero locale={locale} dict={dict} />
      <WebPains dict={dict} />
      <WebTypes dict={dict} />
      <WebPricing locale={locale} dict={dict} />
      <WebProcess locale={locale} dict={dict} />
      <WebIncluded dict={dict} />
      <WebProjects dict={dict} />
    </>
  );
}
