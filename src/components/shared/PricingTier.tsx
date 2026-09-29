import { Check } from "lucide-react";
import { pick, type Locale } from "@/lib/i18n";
import type { PricingTier as Tier } from "@/content/data/pricing";
import { contacts } from "@/content/data/contacts";
import { waLink } from "@/lib/links";
import { TrackedLink } from "./TrackedLink";
import { buttonVariants } from "./Button";
import { cn } from "@/lib/utils";

const TARIFF_INTEREST_TEXT: Record<Locale, (name: string) => string> = {
  ru: (name) => `Здравствуйте! Интересует тариф «${name}».`,
  kz: (name) => `Сәлеметсіз бе! «${name}» тарифі қызықтырады.`,
};

export function PricingTier({
  tier,
  locale,
  popularLabel,
  ctaLabel,
}: {
  tier: Tier;
  locale: Locale;
  popularLabel: string;
  ctaLabel: string;
}) {
  // Each tier gets its own WhatsApp text naming that tariff, instead of one
  // shared generic message for all three cards (CODEX_TASKS P1-4).
  const ctaHref = waLink(contacts.whatsapp, TARIFF_INTEREST_TEXT[locale](pick(tier.name, locale)));
  return (
    <div
      className={cn(
        "card-surface relative flex h-full flex-col rounded-2xl p-6",
        tier.highlighted && "card-accent md:-translate-y-2",
      )}
    >
      {tier.highlighted && (
        <span className="absolute -top-3 left-6 rounded-full gradient-accent px-3 py-1 text-xs font-semibold text-accent-fg">
          {popularLabel}
        </span>
      )}

      <h3 className="text-lg font-semibold text-text">{pick(tier.name, locale)}</h3>
      <p className="mt-1 text-sm text-text-faint">{pick(tier.tagline, locale)}</p>
      <p className="mt-4 font-heading text-2xl font-bold text-text">
        {pick(tier.price, locale)}
      </p>

      <ul className="mt-5 flex-1 space-y-2.5">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
            <Check size={15} className="mt-0.5 shrink-0 text-accent" />
            {pick(f, locale)}
          </li>
        ))}
      </ul>

      <TrackedLink
        goal="wa_click"
        trackParams={{ place: "pricing" }}
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: tier.highlighted ? "primary" : "secondary", size: "md" }),
          "mt-6 w-full",
        )}
      >
        {ctaLabel}
      </TrackedLink>
    </div>
  );
}
