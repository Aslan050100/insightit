import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { AboutFounder } from "@/components/sections/about/AboutFounder";
import { AboutTeam } from "@/components/sections/about/AboutTeam";
import { AboutCertificate } from "@/components/sections/about/AboutCertificate";
import { AboutValues } from "@/components/sections/about/AboutValues";
import { AboutPartners } from "@/components/sections/about/AboutPartners";
import { StatsBand } from "@/components/sections/StatsBand";

export const generateMetadata = pageMeta(
  {
    ru: "О нас — команда InsightIT",
    kz: "Біз туралы — InsightIT командасы",
  },
  {
    ru: "InsightIT — IT-партнёр для бизнеса в Казахстане. Сертифицированные специалисты Bitrix24, 5+ лет в автоматизации и разработке.",
    kz: "InsightIT — Қазақстандағы бизнеске IT-серіктес. Bitrix24 сертификатталған мамандары, автоматтандыру мен әзірлеуде 5+ жыл.",
  },
);

export default async function AboutPage({
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
        eyebrow={dict.aboutPage.eyebrow}
        title={dict.aboutPage.title}
        subtitle={dict.aboutPage.subtitle}
      />
      <AboutFounder locale={locale} dict={dict} />
      <AboutTeam locale={locale} dict={dict} />
      <AboutCertificate locale={locale} dict={dict} />
      <AboutValues dict={dict} />
      <AboutPartners dict={dict} />
      <StatsBand locale={locale} dict={dict} />
    </>
  );
}
