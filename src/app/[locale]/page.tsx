import { notFound } from "next/navigation";
import { isLocale, pick } from "@/lib/i18n";
import { getDictionary } from "@/content/dictionaries";
import { HomeHero } from "@/components/sections/home/HomeHero";
import { ClientsMarquee } from "@/components/sections/ClientsMarquee";
import { PainSection } from "@/components/sections/home/PainSection";
import { ServicesPreview } from "@/components/sections/home/ServicesPreview";
import { CrmBand } from "@/components/sections/home/CrmBand";
import { StatsBand } from "@/components/sections/StatsBand";
import { CasesPreview } from "@/components/sections/home/CasesPreview";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { ProcessSection } from "@/components/sections/home/ProcessSection";
import { PricingPreview } from "@/components/sections/home/PricingPreview";
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection";
import { VideoReviews } from "@/components/sections/VideoReviews";
import { LeadMagnet } from "@/components/sections/LeadMagnet";
import { ContactSplit } from "@/components/sections/contacts/ContactSplit";
import { MapEmbed } from "@/components/sections/contacts/MapEmbed";
import { contacts } from "@/content/data/contacts";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <>
      <HomeHero locale={locale} dict={dict} />
      <ClientsMarquee dict={dict} />
      <PainSection locale={locale} dict={dict} />
      <LeadMagnet locale={locale} dict={dict} />
      <ServicesPreview locale={locale} dict={dict} />
      <CrmBand locale={locale} dict={dict} />
      <StatsBand locale={locale} dict={dict} />
      <CasesPreview locale={locale} dict={dict} />
      <PartnersMarquee dict={dict} />
      <ProcessSection locale={locale} dict={dict} />
      <PricingPreview locale={locale} dict={dict} />
      <TestimonialsSection locale={locale} dict={dict} />
      <VideoReviews locale={locale} dict={dict} />
      <div id="contacts" className="scroll-mt-16">
        <ContactSplit locale={locale} dict={dict} />
        <MapEmbed
          lat={contacts.geo.lat}
          lon={contacts.geo.lon}
          label={pick(contacts.address, locale)}
        />
      </div>
    </>
  );
}
