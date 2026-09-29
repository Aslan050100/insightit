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
  "support",
  {
    ru: "IT-поддержка Битрикс24 и 1С по абонементу — InsightIT",
    kz: "Битрикс24 және 1С бойынша абоненттік IT-қолдау — InsightIT",
  },
  {
    ru: "От 100 000 ₸/мес. Абонентское обслуживание Bitrix24, 1С, сайтов и серверов: быстрое реагирование и прозрачные тарифы по всему Казахстану.",
    kz: "100 000 ₸/ай-дан. Bitrix24, 1С, сайт пен серверлерге абоненттік қызмет: жылдам әрекет және ашық тарифтер, Қазақстан бойынша.",
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
