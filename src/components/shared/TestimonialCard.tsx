import { Quote, ArrowUpRight } from "lucide-react";
import { pick, type Locale } from "@/lib/i18n";
import type { Testimonial } from "@/content/data/testimonials";

export function TestimonialCard({
  item,
  locale,
  readMore,
}: {
  item: Testimonial;
  locale: Locale;
  /** When set, the quote is clamped and this label is shown as a "read full" hint. */
  readMore?: string;
}) {
  return (
    <div className="card-surface flex h-full flex-col rounded-2xl p-6 transition-colors hover:border-accent/25">
      <Quote size={26} className="text-accent/40" />
      <p
        className={
          readMore
            ? "mt-4 flex-1 text-sm leading-relaxed text-text-muted line-clamp-5"
            : "mt-4 flex-1 text-sm leading-relaxed text-text-muted"
        }
      >
        «{pick(item.quote, locale)}»
      </p>

      {readMore && (
        <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
          {readMore}
          <ArrowUpRight size={15} />
        </span>
      )}

      <div className="mt-6 flex items-center gap-3">
        {item.logo ? (
          <span className="logo-glass flex h-10 w-10 items-center justify-center overflow-hidden rounded-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.logo}
              alt={item.company}
              title={item.company}
              decoding="async"
              loading="lazy"
              className="h-6 w-6 object-contain"
            />
          </span>
        ) : (
          <span className="flex h-10 w-10 items-center justify-center rounded-full gradient-accent text-sm font-bold text-accent-fg">
            {item.short}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-text">{item.author}</p>
          <p className="text-xs text-text-faint">
            {pick(item.role, locale)}, {item.company}
          </p>
        </div>
      </div>
    </div>
  );
}
