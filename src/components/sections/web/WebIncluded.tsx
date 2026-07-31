import { Palette, Gauge, PlugZap, BarChart3, FileText, Rocket } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import type { Dictionary } from "@/content/dictionaries";

const ICONS: LucideIcon[] = [Palette, Gauge, PlugZap, BarChart3, FileText, Rocket];

export function WebIncluded({ dict }: { dict: Dictionary }) {
  const w = dict.websitesPage;

  return (
    <Section id="web-included" className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle
          eyebrow={w.includedEyebrow}
          title={w.includedTitle}
          subtitle={w.includedSubtitle}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2">
          {w.included.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <MotionStaggerItem
                key={item.title}
                className="card-surface flex gap-4 rounded-2xl p-6"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-surface-3 text-accent">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-text">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-text-muted">{item.desc}</p>
                </div>
              </MotionStaggerItem>
            );
          })}
        </MotionStagger>
      </Container>
    </Section>
  );
}
