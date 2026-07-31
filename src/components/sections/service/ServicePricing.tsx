import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { PricingTier } from "@/components/shared/PricingTier";
import type { PricingTier as Tier } from "@/content/data/pricing";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink } from "@/lib/links";

export interface ServicePricingContent {
  pricingEyebrow: string;
  pricingTitle: string;
  pricingSubtitle: string;
  pricingNote: string;
}

export function ServicePricing({
  locale,
  dict,
  content,
  tiers,
}: {
  locale: Locale;
  dict: Dictionary;
  content: ServicePricingContent;
  tiers: Tier[];
}) {
  const ctaHref = waLink(contacts.whatsapp, pick(waMessages.general, locale));

  return (
    <Section id="service-pricing" className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle
          eyebrow={content.pricingEyebrow}
          title={content.pricingTitle}
          subtitle={content.pricingSubtitle}
        />

        <MotionStagger className="mx-auto mt-10 grid max-w-sm grid-cols-1 gap-5 md:mt-12 md:max-w-none md:grid-cols-3">
          {tiers.map((tier) => (
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

        <p className="mt-6 text-center text-sm text-text-faint">{content.pricingNote}</p>
      </Container>
    </Section>
  );
}
