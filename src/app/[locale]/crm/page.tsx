import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { pageMeta } from "@/lib/metadata";
import { CrmHero } from "@/components/sections/crm/CrmHero";
import { CrmSolution } from "@/components/sections/crm/CrmSolution";
import { CrmFeatures } from "@/components/sections/crm/CrmFeatures";
import { CrmIntegrations } from "@/components/sections/crm/CrmIntegrations";
import { CrmTimeline } from "@/components/sections/crm/CrmTimeline";
import { CrmPricing } from "@/components/sections/crm/CrmPricing";
import { CasesPreview } from "@/components/sections/home/CasesPreview";
import { FaqSection } from "@/components/shared/FaqSection";
import { JsonLd } from "@/components/shared/JsonLd";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { implementationTiers } from "@/content/data/pricing";

const TITLES = {
  ru: "Внедрение Bitrix24 под ключ в Казахстане — от 150 000 ₸",
  kz: "Bitrix24-ді кілтпен енгізу — Қазақстан, 150 000 ₸-ден",
};
const DESCRIPTIONS = {
  ru: "От 150 000 ₸. Внедрение Bitrix24 под ключ за 7–14 дней: воронки, автоматизация, интеграции WhatsApp, Instagram и 1С. Обучение и поддержка в подарок.",
  kz: "150 000 ₸-ден. Bitrix24-ді кілтпен 7–14 күнде енгізу: воронка, автоматтандыру, WhatsApp, Instagram және 1С интеграциясы. Оқыту мен қолдау сыйға.",
};

export const generateMetadata = pageMeta("crm", TITLES, DESCRIPTIONS);

export default async function CrmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  const startPrice = implementationTiers.find((t) => t.id === "start")?.priceValue;

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: TITLES[locale],
          description: DESCRIPTIONS[locale],
          url: `https://insightit.kz/${locale}/crm/`,
          priceValue: startPrice,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: dict.nav.crm, path: "crm" }])} />
      <CrmHero locale={locale} dict={dict} />
      <CrmSolution locale={locale} dict={dict} />
      <CrmFeatures dict={dict} />
      <CrmIntegrations dict={dict} />
      <CrmTimeline locale={locale} dict={dict} />
      <CrmPricing locale={locale} dict={dict} />
      <FaqSection eyebrow={dict.crmPage.faqEyebrow} title={dict.crmPage.faqTitle} items={dict.crmPage.faq} />
      <CasesPreview locale={locale} dict={dict} />
    </>
  );
}
