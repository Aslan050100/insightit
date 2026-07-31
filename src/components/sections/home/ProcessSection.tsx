import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function ProcessSection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle
          eyebrow={dict.processSection.eyebrow}
          title={dict.processSection.title}
          subtitle={dict.processSection.subtitle}
        />
        <div className="mt-14">
          <ProcessTimeline locale={locale} />
        </div>
      </Container>
    </Section>
  );
}
