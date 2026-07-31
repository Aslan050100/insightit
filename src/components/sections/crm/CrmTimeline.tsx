import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function CrmTimeline({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.crmPage;

  return (
    <Section>
      <Container>
        <SectionTitle
          eyebrow={c.timelineEyebrow}
          title={c.timelineTitle}
          subtitle={c.timelineSubtitle}
        />
        <div className="mt-14">
          <ProcessTimeline locale={locale} />
        </div>
      </Container>
    </Section>
  );
}
