import { StatCounter } from "@/components/motion/StatCounter";
import { pick, type Locale } from "@/lib/i18n";
import type { CaseStudy } from "@/content/data/cases";
import { cn } from "@/lib/utils";

export function CaseCard({
  caseStudy: c,
  locale,
  featured = false,
  className,
}: {
  caseStudy: CaseStudy;
  locale: Locale;
  featured?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "card-surface group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30",
        featured && "md:p-8",
        className,
      )}
    >
      <div className="radial-spot pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong bg-surface-2 text-xs font-bold text-text-muted">
          {c.short}
        </span>
        <span className="rounded-full border border-line bg-surface-2/60 px-3 py-1 text-xs text-text-muted">
          {pick(c.tag, locale)}
        </span>
      </div>

      <div className={cn("relative mt-8", featured && "md:mt-12")}>
        <div
          className={cn(
            "text-gradient font-heading font-bold",
            featured ? "text-5xl md:text-6xl" : "text-4xl",
          )}
        >
          <StatCounter
            value={c.metricValue}
            prefix={c.metricPrefix}
            suffix={c.metricSuffix}
          />
        </div>
        <p className="mt-2 text-sm font-medium text-text">
          {pick(c.metricLabel, locale)}
        </p>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-text-muted">
          {pick(c.summary, locale)}
        </p>
      </div>

      <p className="relative mt-6 text-sm font-semibold text-text">{c.company}</p>
    </div>
  );
}
