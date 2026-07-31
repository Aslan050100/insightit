import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { localizedHref, pick, type Locale } from "@/lib/i18n";
import type { Service } from "@/content/data/services";
import { cn } from "@/lib/utils";

export function ServiceCard({
  service,
  locale,
  learnMore,
}: {
  service: Service;
  locale: Locale;
  learnMore: string;
}) {
  const Icon = service.icon;

  return (
    <Link
      href={localizedHref(locale, service.href)}
      className={cn(
        "card-surface group relative flex h-full flex-col rounded-2xl p-6 hover:-translate-y-1",
        service.featured && "card-accent",
      )}
    >
      <div
        className={cn(
          "flex h-12 w-12 items-center justify-center rounded-xl",
          service.featured
            ? "gradient-accent text-accent-fg"
            : "bg-surface-3 text-accent",
        )}
      >
        <Icon size={22} />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-text">
        {pick(service.title, locale)}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">
        {pick(service.desc, locale)}
      </p>

      <ul className="mt-4 space-y-2">
        {service.bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-text-muted">
            <Check size={15} className="mt-0.5 shrink-0 text-accent" />
            {pick(b, locale)}
          </li>
        ))}
      </ul>

      <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent">
        {learnMore}
        <ArrowUpRight
          size={15}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>
    </Link>
  );
}
