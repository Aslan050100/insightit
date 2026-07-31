import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { Accordion } from "@/components/shared/Accordion";
import type { Dictionary } from "@/content/dictionaries";

export function CrmFaq({ dict }: { dict: Dictionary }) {
  const c = dict.crmPage;

  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl">
          <SectionTitle eyebrow={c.faqEyebrow} title={c.faqTitle} align="center" className="mx-auto" />
          <MotionReveal className="mt-10">
            <Accordion items={c.faq} />
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
