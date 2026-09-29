import { notFound } from "next/navigation";
import { Inbox, UserX, FileSpreadsheet, BarChart3, Filter, MessagesSquare, Bot, Users, Gift } from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { pageMeta } from "@/lib/metadata";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { ServicePains } from "@/components/sections/service/ServicePains";
import { ServiceFeatures } from "@/components/sections/service/ServiceFeatures";
import { ServicePricing } from "@/components/sections/service/ServicePricing";
import { ServiceProcess } from "@/components/sections/service/ServiceProcess";
import { CasesPreview } from "@/components/sections/home/CasesPreview";
import { amocrmTiers } from "@/content/data/pricing";
import { amocrmProcessSteps } from "@/content/data/process";

export const generateMetadata = pageMeta(
  "amocrm",
  {
    ru: "Внедрение amoCRM в Казахстане за 7–14 дней",
    kz: "amoCRM-ді Қазақстанда 7–14 күнде енгізу",
  },
  {
    ru: "От 120 000 ₸. Внедряем amoCRM под ключ: все каналы продаж в одном окне, WhatsApp и Instagram, автоматизация заявок. Запуск за 7–14 дней, 14 дней бесплатно.",
    kz: "120 000 ₸-ден. amoCRM-ді кілтпен енгіземіз: барлық сату арнасы бір терезеде, WhatsApp пен Instagram, өтінімдерді автоматтандыру. 7–14 күнде, 14 күн тегін.",
  },
);

export default async function AmoCrmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const content = dict.amocrmPage;

  return (
    <>
      <ServiceHero locale={locale} content={content} />
      <ServicePains content={content} icons={[Inbox, UserX, FileSpreadsheet, BarChart3]} />
      <ServiceFeatures
        content={content}
        icons={[Filter, MessagesSquare, Bot, BarChart3, Users, Gift]}
      />
      <ServicePricing locale={locale} dict={dict} content={content} tiers={amocrmTiers} />
      <ServiceProcess locale={locale} content={content} steps={amocrmProcessSteps} />
      <CasesPreview locale={locale} dict={dict} />
    </>
  );
}
