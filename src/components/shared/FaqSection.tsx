import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Accordion } from "@/components/shared/Accordion";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqJsonLd } from "@/lib/jsonld";

export function FaqSection({
  eyebrow,
  title,
  items,
}: {
  eyebrow: string;
  title: string;
  items: { q: string; a: string }[];
}) {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow={eyebrow} title={title} align="center" className="mx-auto" />
          <MotionReveal className="mt-10">
            <Accordion items={items} />
          </MotionReveal>
        </div>
      </Container>
      <JsonLd data={faqJsonLd(items)} />
    </Section>
  );
}
