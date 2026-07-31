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

export const generateMetadata = pageMeta(
  {
    ru: "Внедрение Bitrix24 и CRM под ключ в Казахстане",
    kz: "Bitrix24 және CRM-ді кілтпен енгізу — Қазақстан",
  },
  {
    ru: "Внедрение Bitrix24 / CRM за 7–14 дней: воронки, автоматизация, интеграции WhatsApp, Instagram, телефонии и 1С. Обучение и поддержка в подарок.",
    kz: "Bitrix24 / CRM-ді 7–14 күнде енгізу: воронкалар, автоматтандыру, WhatsApp, Instagram, телефония және 1С интеграциясы. Оқыту мен қолдау сыйға.",
  },
);

export default async function CrmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <CrmHero locale={locale} dict={dict} />
      <CrmSolution locale={locale} dict={dict} />
      <CrmFeatures dict={dict} />
      <CrmIntegrations dict={dict} />
      <CrmTimeline locale={locale} dict={dict} />
      <CrmPricing locale={locale} dict={dict} />
      <CasesPreview locale={locale} dict={dict} />
    </>
  );
}
