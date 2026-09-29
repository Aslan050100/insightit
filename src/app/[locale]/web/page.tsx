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
import { FaqSection } from "@/components/shared/FaqSection";
import { JsonLd } from "@/components/shared/JsonLd";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { websiteTiers } from "@/content/data/pricing";

const TITLES = {
  ru: "Разработка сайтов под ключ в Казахстане — InsightIT",
  kz: "Сайт әзірлеу — Қазақстанда кілтпен, InsightIT",
};
const DESCRIPTIONS = {
  ru: "От 100 000 ₸. Лендинги, корпоративные сайты и интернет-магазины под задачи бизнеса: быстрые, адаптивные, интегрированные с Bitrix24 / CRM. По Казахстану.",
  kz: "100 000 ₸-ден. Бизнес міндеттеріне сай лендинг, корпоративтік сайт және интернет-дүкен: жылдам, адаптив, Bitrix24 / CRM-мен интеграцияланған.",
};

export const generateMetadata = pageMeta("web", TITLES, DESCRIPTIONS);

export default async function WebPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const landingPrice = websiteTiers.find((t) => t.id === "landing")?.priceValue;

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: TITLES[locale],
          description: DESCRIPTIONS[locale],
          url: `https://insightit.kz/${locale}/web/`,
          priceValue: landingPrice,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: dict.nav.websites, path: "web" }])} />
      <WebHero locale={locale} dict={dict} />
      <WebPains dict={dict} />
      <WebTypes dict={dict} />
      <WebPricing locale={locale} dict={dict} />
      <WebProcess locale={locale} dict={dict} />
      <WebIncluded dict={dict} />
      <FaqSection
        eyebrow={dict.websitesPage.faqEyebrow}
        title={dict.websitesPage.faqTitle}
        items={dict.websitesPage.faq}
      />
      <WebProjects dict={dict} />
    </>
  );
}
