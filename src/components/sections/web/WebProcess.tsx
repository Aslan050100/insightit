import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { webProcessSteps } from "@/content/data/process";
import { type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function WebProcess({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const w = dict.websitesPage;

  return (
    <Section>
      <Container>
        <SectionTitle
          eyebrow={w.processEyebrow}
          title={w.processTitle}
          subtitle={w.processSubtitle}
        />
        <div className="mt-14">
          <ProcessTimeline
            locale={locale}
            steps={webProcessSteps}
            colsClassName="lg:grid-cols-6"
          />
        </div>
      </Container>
    </Section>
  );
}
