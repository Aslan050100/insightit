import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { buttonVariants } from "@/components/shared/Button";
import { services } from "@/content/data/services";
import { localizedHref, pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { cn } from "@/lib/utils";

export function ServicesDetail({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section>
      <Container>
        <div className="space-y-16 md:space-y-24">
          {services.map((s, i) => {
            const Icon = s.icon;
            const reversed = i % 2 === 1;
            const num = String(i + 1).padStart(2, "0");
            const href = s.featured
              ? localizedHref(locale, "/crm")
              : localizedHref(locale, "/#contacts");
            const ctaLabel = s.featured ? dict.common.learnMore : dict.common.discussProject;

            return (
              <div
                key={s.slug}
                id={s.slug}
                className="grid items-center gap-8 md:grid-cols-2 md:gap-12"
              >
                <MotionReveal
                  variants={reversed ? slideInRight : slideInLeft}
                  className={cn(reversed && "md:order-2")}
                >
                  <span className="font-heading text-sm font-bold text-accent">{num}</span>
                  <h2 className="mt-2 text-2xl font-bold text-text sm:text-3xl">
                    {pick(s.title, locale)}
                  </h2>
                  <p className="mt-3 max-w-lg text-base leading-relaxed text-text-muted">
                    {pick(s.desc, locale)}
                  </p>
                  <Link
                    href={href}
                    className={cn(buttonVariants({ variant: "secondary", size: "md" }), "mt-6")}
                  >
                    {ctaLabel}
                    <ArrowUpRight size={16} />
                  </Link>
                </MotionReveal>

                <MotionReveal
                  variants={reversed ? slideInLeft : slideInRight}
                  className={cn(reversed && "md:order-1")}
                >
                  <div
                    className={cn(
                      "card-surface rounded-3xl p-6 sm:p-8",
                      s.featured && "card-accent",
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-xl",
                        s.featured ? "gradient-accent text-accent-fg" : "bg-surface-3 text-accent",
                      )}
                    >
                      <Icon size={22} />
                    </div>
                    <ul className="mt-5 space-y-3">
                      {s.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-3 text-sm text-text-muted">
                          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-surface-3 text-accent">
                            <Check size={13} />
                          </span>
                          {pick(b, locale)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </MotionReveal>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
