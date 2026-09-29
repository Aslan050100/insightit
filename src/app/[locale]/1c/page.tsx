import { notFound } from "next/navigation";
import { Copy, AlertTriangle, Network, Shuffle, Tag, Boxes, Users, FileText, Wallet, Database } from "lucide-react";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { pageMeta } from "@/lib/metadata";
import { ServiceHero } from "@/components/sections/service/ServiceHero";
import { ServicePains } from "@/components/sections/service/ServicePains";
import { ServiceFeatures } from "@/components/sections/service/ServiceFeatures";
import { ServicePricing } from "@/components/sections/service/ServicePricing";
import { ServiceProcess } from "@/components/sections/service/ServiceProcess";
import { CasesPreview } from "@/components/sections/home/CasesPreview";
import { oneCTiers } from "@/content/data/pricing";
import { oneCProcessSteps } from "@/content/data/process";
import { JsonLd } from "@/components/shared/JsonLd";
import { serviceJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";

const TITLES = {
  ru: "Интеграция 1С с Битрикс24 в Казахстане — InsightIT",
  kz: "1С пен Битрикс24 интеграциясы — Қазақстан, InsightIT",
};
const DESCRIPTIONS = {
  ru: "От 350 000 ₸. Автоматический обмен товарами, остатками и заказами между 1С и Bitrix24 без ошибок и двойного ввода. Запуск за 14–28 дней по Казахстану.",
  kz: "350 000 ₸-ден. 1С пен Bitrix24 арасында тауар, қалдық, тапсырыс алмасуы қатесіз әрі қос енгізусіз. Қазақстан бойынша 14–28 күнде іске қосу.",
};

export const generateMetadata = pageMeta("1c", TITLES, DESCRIPTIONS);

export default async function OneCPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const content = dict.oneCPage;

  const basicPrice = oneCTiers.find((t) => t.id === "onec-basic")?.priceValue;

  return (
    <>
      <JsonLd
        data={serviceJsonLd({
          name: TITLES[locale],
          description: DESCRIPTIONS[locale],
          url: `https://insightit.kz/${locale}/1c/`,
          priceValue: basicPrice,
        })}
      />
      <JsonLd data={breadcrumbJsonLd(locale, [{ name: dict.nav.oneC, path: "1c" }])} />
      <ServiceHero locale={locale} content={content} />
      <ServicePains content={content} icons={[Copy, AlertTriangle, Network, Shuffle]} />
      <ServiceFeatures
        content={content}
        icons={[Tag, Boxes, Users, FileText, Wallet, Database]}
      />
      <ServicePricing locale={locale} dict={dict} content={content} tiers={oneCTiers} />
      <ServiceProcess
        locale={locale}
        content={content}
        steps={oneCProcessSteps}
        colsClassName="lg:grid-cols-6"
      />
      <CasesPreview locale={locale} dict={dict} />
    </>
  );
}
