import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { services } from "@/content/data/services";
import { type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { cn } from "@/lib/utils";

export function ServicesPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section id="services">
      <Container>
        <SectionTitle
          eyebrow={dict.servicesSection.eyebrow}
          title={dict.servicesSection.title}
          subtitle={dict.servicesSection.subtitle}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <MotionStaggerItem
              key={s.slug}
              className={cn(s.featured && "sm:col-span-2 lg:col-span-2")}
            >
              <ServiceCard service={s} locale={locale} learnMore={dict.common.learnMore} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
