import { X, Check } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { painPoints } from "@/content/data/painPoints";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function CrmSolution({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.crmPage;
  const solutions =
    locale === "ru"
      ? [
          "Ни одна заявка не теряется",
          "Полный контроль над сделками",
          "Рутина работает на автопилоте",
          "Команда — в единой системе",
          "Решения на основе цифр",
        ]
      : [
          "Бірде-бір өтінім жоғалмайды",
          "Мәмілелерге толық бақылау",
          "Рутина автопилотта жұмыс істейді",
          "Команда — бірыңғай жүйеде",
          "Сандарға негізделген шешімдер",
        ];

  return (
    <Section>
      <Container>
        <SectionTitle eyebrow={dict.pains.eyebrow} title={c.painTitle} subtitle={c.painSubtitle} />

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          <MotionReveal variants={slideInLeft}>
            <div className="card-surface h-full rounded-2xl p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-text-faint">
                {dict.pains.eyebrow}
              </p>
              <ul className="mt-5 space-y-3.5">
                {painPoints.map((p) => (
                  <li key={p.title.ru} className="flex items-start gap-3 text-sm text-text-muted">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-line bg-surface-2 text-text-faint">
                      <X size={13} />
                    </span>
                    {pick(p.title, locale)}
                  </li>
                ))}
              </ul>
            </div>
          </MotionReveal>

          <MotionReveal variants={slideInRight}>
            <div className="card-surface card-accent h-full rounded-2xl p-6 sm:p-8">
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                {c.solutionLabel}
              </p>
              <ul className="mt-5 space-y-3.5">
                {solutions.map((s) => (
                  <li key={s} className="flex items-start gap-3 text-sm text-text">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md gradient-accent text-accent-fg">
                      <Check size={13} />
                    </span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
