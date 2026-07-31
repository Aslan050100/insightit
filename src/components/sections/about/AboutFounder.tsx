import { BadgeCheck } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { NodeGraph } from "@/components/shared/NodeGraph";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function AboutFounder({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const a = dict.aboutPage;

  return (
    <Section>
      <Container>
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-14">
          <MotionReveal variants={slideInLeft}>
            <span className="eyebrow-line text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {a.founderEyebrow}
            </span>
            <h2 className="mt-4 text-2xl font-bold text-text sm:text-3xl">{a.founderName}</h2>
            <p className="mt-2 text-base font-medium text-accent">{a.founderRole}</p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-muted">
              {a.founderBio}
            </p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface-2/60 px-3.5 py-1.5 text-xs font-medium text-text-muted">
              <BadgeCheck size={15} className="text-accent" />
              {locale === "ru" ? "Сертифицированный партнёр Bitrix24" : "Bitrix24 сертификатталған серіктесі"}
            </div>
          </MotionReveal>

          <MotionReveal variants={slideInRight}>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-surface-2 to-surface-1">
              <div className="absolute inset-0 opacity-40">
                <NodeGraph />
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="flex h-24 w-24 items-center justify-center rounded-full gradient-accent font-heading text-3xl font-bold text-accent-fg">
                  АА
                </span>
                <p className="mt-4 text-sm font-medium text-text">{a.founderName}</p>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
