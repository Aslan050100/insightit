import { Gift } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { PricingTier } from "@/components/shared/PricingTier";
import { implementationTiers } from "@/content/data/pricing";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink } from "@/lib/links";

export function PricingPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const ctaHref = waLink(contacts.whatsapp, pick(waMessages.crm, locale));

  return (
    <Section id="pricing">
      <Container>
        <SectionTitle
          eyebrow={dict.pricingSection.eyebrow}
          title={dict.pricingSection.title}
          subtitle={dict.pricingSection.subtitle}
        />

        <MotionStagger className="mx-auto mt-10 grid max-w-sm grid-cols-1 gap-5 md:mt-12 md:max-w-none md:grid-cols-3">
          {implementationTiers.map((tier) => (
            <MotionStaggerItem key={tier.id} className="h-full">
              <PricingTier
                tier={tier}
                locale={locale}
                popularLabel={dict.pricingSection.popular}
                ctaLabel={dict.common.getConsult}
                ctaHref={ctaHref}
              />
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        <MotionReveal className="mt-6">
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-accent/20 bg-surface-1/60 px-5 py-4 text-center text-sm text-text-muted">
            <Gift size={18} className="shrink-0 text-accent" />
            {dict.pricingSection.bonus}
          </div>
        </MotionReveal>
      </Container>
    </Section>
  );
}
