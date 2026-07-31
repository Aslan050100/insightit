import { Check } from "lucide-react";
import { pick, type Locale } from "@/lib/i18n";
import type { PricingTier as Tier } from "@/content/data/pricing";
import { buttonVariants } from "./Button";
import { cn } from "@/lib/utils";

export function PricingTier({
  tier,
  locale,
  popularLabel,
  ctaLabel,
  ctaHref,
}: {
  tier: Tier;
  locale: Locale;
  popularLabel: string;
  ctaLabel: string;
  ctaHref: string;
}) {
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

      <a
        href={ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: tier.highlighted ? "primary" : "secondary", size: "md" }),
          "mt-6 w-full",
        )}
      >
        {ctaLabel}
      </a>
    </div>
  );
}
