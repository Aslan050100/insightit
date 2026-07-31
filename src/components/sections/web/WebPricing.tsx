import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { PricingTier } from "@/components/shared/PricingTier";
import { websiteTiers } from "@/content/data/pricing";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink } from "@/lib/links";

export function WebPricing({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const w = dict.websitesPage;
  const ctaHref = waLink(contacts.whatsapp, pick(waMessages.general, locale));

  return (
    <Section id="web-pricing">
      <Container>
        <SectionTitle
          eyebrow={w.pricingEyebrow}
          title={w.pricingTitle}
          subtitle={w.pricingSubtitle}
        />

        <MotionStagger className="mx-auto mt-10 grid max-w-sm grid-cols-1 gap-5 md:mt-12 md:max-w-none md:grid-cols-3">
          {websiteTiers.map((tier) => (
            <MotionStaggerItem key={tier.id} className="h-full">
              <PricingTier
                tier={tier}
                locale={locale}
                popularLabel={dict.pricingSection.popular}
                ctaLabel={dict.common.discussProject}
                ctaHref={ctaHref}
              />
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        <p className="mt-6 text-center text-sm text-text-faint">{w.pricingNote}</p>
      </Container>
    </Section>
  );
}
