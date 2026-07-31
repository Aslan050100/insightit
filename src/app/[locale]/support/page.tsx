import { notFound } from "next/navigation";
import { ServerCrash, Clock, Bug, UserX, Workflow, Database, Globe, Server, Monitor, KeyRound } from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { pageMeta } from "@/lib/metadata";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { ServicePains } from "@/components/sections/service/ServicePains";
import { ServiceFeatures } from "@/components/sections/service/ServiceFeatures";
import { ServicePricing } from "@/components/sections/service/ServicePricing";
import { ServiceProcess } from "@/components/sections/service/ServiceProcess";
import { CasesPreview } from "@/components/sections/home/CasesPreview";
import { supportTiers } from "@/content/data/pricing";
import { supportProcessSteps } from "@/content/data/process";

export const generateMetadata = pageMeta(
  {
    ru: "IT-поддержка и абонентское обслуживание бизнеса в Казахстане",
    kz: "Бизнеске IT-қолдау және абоненттік қызмет — Қазақстан",
  },
  {
    ru: "Абонентское IT-обслуживание: поддержка Битрикс24, 1С, сайтов и серверов. Быстрое реагирование, прозрачные тарифы и предсказуемый бюджет. Работаем по всему Казахстану.",
    kz: "Абоненттік IT-қызмет: Битрикс24, 1С, сайт пен серверлерге қолдау. Жылдам әрекет, ашық тарифтер мен болжамды бюджет. Қазақстан бойынша жұмыс істейміз.",
  },
);

export default async function SupportPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const content = dict.supportPage;

  return (
    <>
      <ServiceHero locale={locale} content={content} />
      <ServicePains content={content} icons={[ServerCrash, Clock, Bug, UserX]} />
      <ServiceFeatures
        content={content}
        icons={[Workflow, Database, Globe, Server, Monitor, KeyRound]}
      />
      <ServicePricing locale={locale} dict={dict} content={content} tiers={supportTiers} />
      <ServiceProcess
        locale={locale}
        content={content}
        steps={supportProcessSteps}
        colsClassName="lg:grid-cols-4"
      />
      <CasesPreview locale={locale} dict={dict} />
    </>
  );
}
