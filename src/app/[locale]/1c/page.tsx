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

export const generateMetadata = pageMeta(
  {
    ru: "Интеграция 1С с Битрикс24 под ключ в Казахстане",
    kz: "1С пен Битрикс24 интеграциясы — Қазақстанда кілтпен",
  },
  {
    ru: "Автоматический обмен данными между 1С и Битрикс24: товары, остатки, заказы и оплаты без двойного ввода и ошибок. Работаем с любой версией 1С, запуск за 14–28 дней.",
    kz: "1С пен Битрикс24 арасында автоматты дерек алмасу: тауар, қалдық, тапсырыс пен төлем — қос енгізусіз әрі қатесіз. Кез келген 1С нұсқасы, 14–28 күнде.",
  },
);

export default async function OneCPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const content = dict.oneCPage;

  return (
    <>
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
