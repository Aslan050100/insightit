import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { painPoints } from "@/content/data/painPoints";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function PainSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section>
      <Container>
        <SectionTitle
          eyebrow={dict.pains.eyebrow}
          title={dict.pains.title}
          subtitle={dict.pains.subtitle}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {painPoints.map((p) => {
            const Icon = p.icon;
            return (
              <MotionStaggerItem
                key={p.title.ru}
                className="card-surface rounded-2xl p-6 transition-colors hover:border-accent/25"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-3 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text">
                  {pick(p.title, locale)}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {pick(p.desc, locale)}
                </p>
              </MotionStaggerItem>
            );
          })}
        </MotionStagger>
      </Container>
    </Section>
  );
}
