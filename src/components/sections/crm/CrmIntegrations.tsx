import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { LogoChip } from "@/components/shared/LogoChip";
import { partners } from "@/content/data/partners";
import type { Dictionary } from "@/content/dictionaries";

export function CrmIntegrations({ dict }: { dict: Dictionary }) {
  const c = dict.crmPage;

  return (
    <Section>
      <Container>
        <SectionTitle
          eyebrow={c.integrationsEyebrow}
          title={c.integrationsTitle}
          subtitle={c.integrationsSubtitle}
          align="center"
        />

        <MotionStagger className="mt-12 flex flex-wrap justify-center gap-3">
          {partners.map((p) => (
            <MotionStaggerItem key={p.name}>
              <LogoChip label={p.name} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
