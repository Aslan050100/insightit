import { Filter, Inbox, ListChecks, Bot, ShieldCheck, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import type { Dictionary } from "@/content/dictionaries";

const ICONS: LucideIcon[] = [Filter, Inbox, ListChecks, Bot, ShieldCheck, BarChart3];

export function CrmFeatures({ dict }: { dict: Dictionary }) {
  const c = dict.crmPage;

  return (
    <Section className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle
          eyebrow={c.featuresEyebrow}
          title={c.featuresTitle}
          subtitle={c.featuresSubtitle}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {c.features.map((f, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <MotionStaggerItem
                key={f.title}
                className="card-surface rounded-2xl p-6 transition-colors hover:border-accent/25"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-3 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{f.desc}</p>
              </MotionStaggerItem>
            );
          })}
        </MotionStagger>
      </Container>
    </Section>
  );
}
