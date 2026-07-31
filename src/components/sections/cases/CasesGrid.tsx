import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { CaseCard } from "@/components/shared/CaseCard";
import { cases } from "@/content/data/cases";
import { type Locale } from "@/lib/i18n";

export function CasesGrid({ locale }: { locale: Locale }) {
  const [featured, ...rest] = cases;

  return (
    <Section>
      <Container>
        <MotionStagger className="grid gap-5 lg:grid-cols-3">
          <MotionStaggerItem className="lg:col-span-3">
            <CaseCard caseStudy={featured} locale={locale} featured />
          </MotionStaggerItem>
          {rest.map((c) => (
            <MotionStaggerItem key={c.slug} className="h-full">
              <CaseCard caseStudy={c} locale={locale} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
