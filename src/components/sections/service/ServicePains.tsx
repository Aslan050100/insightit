import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";

export interface ServicePainsContent {
  painsEyebrow: string;
  painsTitle: string;
  painsSubtitle: string;
  pains: readonly { title: string; desc: string }[];
}

export function ServicePains({
  content,
  icons,
}: {
  content: ServicePainsContent;
  icons: LucideIcon[];
}) {
  return (
    <Section className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle
          eyebrow={content.painsEyebrow}
          title={content.painsTitle}
          subtitle={content.painsSubtitle}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.pains.map((p, i) => {
            const Icon = icons[i % icons.length];
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
