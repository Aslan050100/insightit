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
  "crm",
  {
    ru: "Внедрение Bitrix24 под ключ в Казахстане — от 150 000 ₸",
    kz: "Bitrix24-ді кілтпен енгізу — Қазақстан, 150 000 ₸-ден",
  },
  {
    ru: "От 150 000 ₸. Внедрение Bitrix24 под ключ за 7–14 дней: воронки, автоматизация, интеграции WhatsApp, Instagram и 1С. Обучение и поддержка в подарок.",
    kz: "150 000 ₸-ден. Bitrix24-ді кілтпен 7–14 күнде енгізу: воронка, автоматтандыру, WhatsApp, Instagram және 1С интеграциясы. Оқыту мен қолдау сыйға.",
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
