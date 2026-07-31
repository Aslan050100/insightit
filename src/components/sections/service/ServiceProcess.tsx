import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import type { ProcessStep } from "@/content/data/process";
import { type Locale } from "@/lib/i18n";

export interface ServiceProcessContent {
  processEyebrow: string;
  processTitle: string;
  processSubtitle: string;
}

export function ServiceProcess({
  locale,
  content,
  steps,
  colsClassName,
}: {
  locale: Locale;
  content: ServiceProcessContent;
  steps: ProcessStep[];
  colsClassName?: string;
}) {
  return (
    <Section>
      <Container>
        <SectionTitle
          eyebrow={content.processEyebrow}
          title={content.processTitle}
          subtitle={content.processSubtitle}
        />
        <div className="mt-14">
          <ProcessTimeline locale={locale} steps={steps} colsClassName={colsClassName} />
        </div>
      </Container>
    </Section>
  );
}
