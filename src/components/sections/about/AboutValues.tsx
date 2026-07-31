import { ShieldCheck, Target, Zap, HeartHandshake } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import type { Dictionary } from "@/content/dictionaries";

const ICONS: LucideIcon[] = [ShieldCheck, Target, Zap, HeartHandshake];

export function AboutValues({ dict }: { dict: Dictionary }) {
  const a = dict.aboutPage;

  return (
    <Section className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle eyebrow={a.valuesEyebrow} title={a.valuesTitle} />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.map((v, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <MotionStaggerItem
                key={v.title}
                className="card-surface rounded-2xl p-6 transition-colors hover:border-accent/25"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-3 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{v.desc}</p>
              </MotionStaggerItem>
            );
          })}
        </MotionStagger>
      </Container>
    </Section>
  );
}
