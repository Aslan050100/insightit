import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { LogoMarquee } from "@/components/motion/LogoMarquee";
import { LogoChip } from "@/components/shared/LogoChip";
import { partners } from "@/content/data/partners";
import type { Dictionary } from "@/content/dictionaries";

export function PartnersMarquee({ dict }: { dict: Dictionary }) {
  const items = partners.map((p) => <LogoChip key={p.name} label={p.name} />);

  return (
    <Section>
      <Container>
        <SectionTitle
          eyebrow={dict.partnersSection.eyebrow}
          title={dict.partnersSection.title}
          subtitle={dict.partnersSection.subtitle}
          align="center"
        />
      </Container>
      <div className="mt-10 md:mt-14">
        <LogoMarquee items={items} />
      </div>
    </Section>
  );
}
