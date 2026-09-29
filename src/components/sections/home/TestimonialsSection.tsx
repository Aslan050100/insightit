import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { testimonials } from "@/content/data/testimonials";
import { type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function TestimonialsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.testimonialsSection;

  return (
    <Section>
      <Container>
        <SectionTitle eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <MotionStagger className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <MotionStaggerItem key={item.author} className="h-full">
              <TestimonialCard item={item} locale={locale} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
