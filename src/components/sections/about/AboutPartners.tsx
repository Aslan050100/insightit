import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { LogoChip } from "@/components/shared/LogoChip";
import { partners } from "@/content/data/partners";
import type { Dictionary } from "@/content/dictionaries";

export function AboutPartners({ dict }: { dict: Dictionary }) {
  const a = dict.aboutPage;

  return (
    <Section>
      <Container>
        <SectionTitle
          eyebrow={dict.partnersSection.eyebrow}
          title={a.partnersTitle}
          align="center"
        />
        <MotionStagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {partners.map((p) => (
            <MotionStaggerItem key={p.name}>
              <LogoChip label={p.name} className="w-full" />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
