import { Gift, ShieldCheck } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { PricingTier } from "@/components/shared/PricingTier";
import { implementationTiers, licenseTiers } from "@/content/data/pricing";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

const currency = (n: number) => `${n.toLocaleString("ru-RU")} ₸`;

export function CrmPricing({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  // Computed, not hardcoded (CODEX_TASKS P1-4): "Старт" implementation +
  // "Базовый" license for a year, straight from pricing.ts's numeric values.
  const startTier = implementationTiers.find((t) => t.id === "start");
  const basicLicense = licenseTiers.find((l) => l.id === "basic");
  const exampleTotal =
    startTier?.priceValue && basicLicense
      ? startTier.priceValue + basicLicense.priceValue * 12
      : null;

  return (
    <Section id="crm-pricing" className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle
          eyebrow={dict.pricingSection.eyebrow}
          title={dict.pricingSection.title}
          subtitle={dict.pricingSection.subtitle}
        />

        <MotionStagger className="mx-auto mt-12 grid max-w-sm grid-cols-1 gap-5 md:max-w-none md:grid-cols-3">
          {implementationTiers.map((tier) => (
            <MotionStaggerItem key={tier.id} className="h-full">
              <PricingTier
                tier={tier}
                locale={locale}
                popularLabel={dict.pricingSection.popular}
                ctaLabel={dict.common.getConsult}
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

        <MotionReveal className="mt-3">
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-line bg-surface-1/30 px-5 py-4 text-center text-sm text-text-muted">
            <ShieldCheck size={18} className="shrink-0 text-accent" />
            {dict.pricingSection.guarantee}
          </div>
        </MotionReveal>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-text">{dict.pricingSection.licenseTitle}</h3>
          <span className="rounded-full border border-accent/30 bg-surface-2/60 px-3.5 py-1.5 text-xs font-semibold text-accent">
            {dict.pricingSection.discountBadge}
          </span>
        </div>

        <MotionStagger className="mx-auto mt-6 grid max-w-sm grid-cols-1 gap-5 md:max-w-none md:grid-cols-3">
          {licenseTiers.map((l) => (
            <MotionStaggerItem key={l.id}>
              <div className="card-surface rounded-2xl p-6 text-center">
                <h4 className="text-base font-semibold text-text">{pick(l.name, locale)}</h4>
                <p className="mt-2 text-sm font-medium text-text-faint line-through">
                  {pick(l.priceOld, locale)}
                </p>
                <p className="text-gradient mt-1 font-heading text-2xl font-bold">
                  {pick(l.price, locale)}
                </p>
                <span className="mt-2 inline-block rounded-full border border-accent/30 bg-surface-2/60 px-2.5 py-0.5 text-xs font-semibold text-accent">
                  {dict.pricingSection.discountBadge}
                </span>
                <p className="mt-3 text-sm text-text-muted">{pick(l.users, locale)}</p>
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>

        <p className="mt-4 text-center text-xs text-text-faint">{dict.pricingSection.vatNote}</p>

        {exampleTotal !== null && startTier && basicLicense && (
          <MotionReveal className="mt-6">
            <div className="mx-auto max-w-xl rounded-2xl border border-line bg-surface-1/40 px-5 py-4 text-center text-sm text-text-muted">
              {dict.pricingSection.exampleTotal}:{" "}
              <span className="font-semibold text-text">{currency(exampleTotal)}</span>
              <span className="text-text-faint">
                {" "}
                ({currency(startTier.priceValue!)} + {currency(basicLicense.priceValue)} × 12)
              </span>
            </div>
          </MotionReveal>
        )}
      </Container>
    </Section>
  );
}
