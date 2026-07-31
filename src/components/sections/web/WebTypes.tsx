import { Rocket, Building2, ShoppingCart, LayoutDashboard, RefreshCw, LifeBuoy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import type { Dictionary } from "@/content/dictionaries";

const ICONS: LucideIcon[] = [Rocket, Building2, ShoppingCart, LayoutDashboard, RefreshCw, LifeBuoy];

export function WebTypes({ dict }: { dict: Dictionary }) {
  const w = dict.websitesPage;

  return (
    <Section>
      <Container>
        <SectionTitle
          eyebrow={w.typesEyebrow}
          title={w.typesTitle}
          subtitle={w.typesSubtitle}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {w.types.map((t, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <MotionStaggerItem
                key={t.title}
                className="card-surface rounded-2xl p-6 transition-colors hover:border-accent/25"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-surface-3 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-text">{t.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">{t.desc}</p>
              </MotionStaggerItem>
            );
          })}
        </MotionStagger>
      </Container>
    </Section>
  );
}
