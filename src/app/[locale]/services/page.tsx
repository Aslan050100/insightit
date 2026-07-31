import { notFound } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { isLocale, pick } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { ServicesDetail } from "@/components/sections/services/ServicesDetail";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { buttonVariants } from "@/components/shared/Button";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink } from "@/lib/links";
import { cn } from "@/lib/utils";

export const generateMetadata = pageMeta(
  {
    ru: "Услуги — сайты, приложения, UI/UX, CRM, 1С",
    kz: "Қызметтер — сайт, қосымша, UI/UX, CRM, 1С",
  },
  {
    ru: "Разработка сайтов и мобильных приложений, UI/UX дизайн, внедрение Bitrix24 / CRM и интеграция 1С для бизнеса в Казахстане.",
    kz: "Сайт пен мобильді қосымша әзірлеу, UI/UX дизайн, Bitrix24 / CRM енгізу және 1С интеграциясы — Қазақстандағы бизнеске.",
  },
);

export default async function ServicesPage({
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
        eyebrow={dict.servicesPage.eyebrow}
        title={dict.servicesPage.title}
        subtitle={dict.servicesPage.subtitle}
      >
        <a
          href={waLink(contacts.whatsapp, pick(waMessages.general, locale))}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
        >
          <MessageCircle size={18} />
          {dict.common.discussProject}
        </a>
      </PageHero>
      <ServicesDetail locale={locale} dict={dict} />
      <PartnersMarquee dict={dict} />
    </>
  );
}
