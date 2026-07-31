import Link from "next/link";
import { ArrowUpRight, TrendingUp, ListChecks, MessagesSquare, Bot } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { buttonVariants } from "@/components/shared/Button";
import { slideInRight } from "@/lib/animations";
import { localizedHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { cn } from "@/lib/utils";

export function CrmBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const b = dict.crmBand;
  const pillars =
    locale === "ru"
      ? [
          { icon: TrendingUp, label: "Продажи" },
          { icon: ListChecks, label: "Задачи" },
          { icon: MessagesSquare, label: "Коммуникации" },
          { icon: Bot, label: "Автоматизация" },
        ]
      : [
          { icon: TrendingUp, label: "Сатылым" },
          { icon: ListChecks, label: "Тапсырмалар" },
          { icon: MessagesSquare, label: "Коммуникация" },
          { icon: Bot, label: "Автоматтандыру" },
        ];

  return (
    <Section>
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface-2 to-surface-1 px-6 py-12 sm:px-12 md:py-16">
          <div className="radial-spot pointer-events-none absolute inset-0" />
          <div className="relative grid items-center gap-10 md:grid-cols-[1.35fr_1fr]">
            <MotionReveal>
              <span className="eyebrow-line text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                {b.eyebrow}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl">{b.title}</h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted">
                {b.subtitle}
              </p>
              <Link
                href={localizedHref(locale, "/crm")}
                className={cn(buttonVariants({ variant: "primary", size: "lg" }), "mt-7")}
              >
                {b.cta}
                <ArrowUpRight size={18} />
              </Link>
            </MotionReveal>

            <MotionReveal variants={slideInRight}>
              <div className="grid grid-cols-2 gap-3">
                {pillars.map((p) => {
                  const Icon = p.icon;
                  return (
                    <div
                      key={p.label}
                      className="flex items-center gap-3 rounded-2xl border border-line bg-surface-1/70 px-4 py-4"
                    >
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-surface-3 text-accent">
                        <Icon size={17} />
                      </span>
                      <span className="text-sm font-medium text-text">{p.label}</span>
                    </div>
                  );
                })}
              </div>
            </MotionReveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
