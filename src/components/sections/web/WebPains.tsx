import { TrendingDown, Brush, MousePointerClick, Smartphone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import type { Dictionary } from "@/content/dictionaries";

const ICONS: LucideIcon[] = [TrendingDown, Brush, MousePointerClick, Smartphone];

export function WebPains({ dict }: { dict: Dictionary }) {
  const w = dict.websitesPage;

  return (
    <Section className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle
          eyebrow={w.painsEyebrow}
          title={w.painsTitle}
          subtitle={w.painsSubtitle}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {w.pains.map((p, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <MotionStaggerItem key={p.title} className="card-surface rounded-2xl p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-3 text-text-faint">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{p.desc}</p>
              </MotionStaggerItem>
            );
          })}
        </MotionStagger>
      </Container>
    </Section>
  );
}
