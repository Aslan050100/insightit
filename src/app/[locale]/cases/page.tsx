import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { CasesGrid } from "@/components/sections/cases/CasesGrid";
import { ClientLogosWall } from "@/components/sections/cases/ClientLogosWall";

export const generateMetadata = pageMeta(
  {
    ru: "Кейсы — результаты наших клиентов",
    kz: "Кейстер — клиенттеріміздің нәтижелері",
  },
  {
    ru: "Реальные результаты внедрения CRM и автоматизации: +40% конверсии, 0 потерянных заявок, сотни обработанных заказов.",
    kz: "CRM енгізу мен автоматтандырудың нақты нәтижелері: +40% конверсия, 0 жоғалған өтінім, жүздеген өңделген тапсырыс.",
  },
);

export default async function CasesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <PageHero
        eyebrow={dict.casesPage.eyebrow}
        title={dict.casesPage.title}
        subtitle={dict.casesPage.subtitle}
      />
      <CasesGrid locale={locale} />
      <ClientLogosWall dict={dict} />
    </>
  );
}
