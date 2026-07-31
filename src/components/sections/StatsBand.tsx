import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { StatCounter } from "@/components/motion/StatCounter";
import { stats } from "@/content/data/stats";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function StatsBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section className="border-y border-line bg-surface-1/30">
      <Container>
        <MotionReveal>
          <span className="eyebrow-line text-xs font-semibold uppercase tracking-[0.14em] text-accent">
            {dict.statsSection.eyebrow}
          </span>
          <h2 className="mt-3 text-2xl font-bold text-text sm:text-3xl">
            {dict.statsSection.title}
          </h2>
        </MotionReveal>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:gap-8 lg:grid-cols-4">
          {stats.map((s, i) => (
            <MotionReveal key={i} delay={i * 0.08}>
              <div className="text-gradient font-heading text-3xl font-bold sm:text-4xl lg:text-5xl">
                <StatCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </div>
              <p className="mt-2 text-sm text-text-muted">{pick(s.label, locale)}</p>
            </MotionReveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
