import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { slideInLeft, slideInRight } from "@/lib/animations";
import { ContactForm } from "@/components/forms/ContactForm";
import { ContactChannels } from "@/components/forms/ContactChannels";
import { type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function ContactSplit({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section>
      <Container>
        <div className="grid gap-6 lg:grid-cols-2">
          <MotionReveal variants={slideInLeft}>
            <ContactForm c={dict.contactsPage} />
          </MotionReveal>
          <MotionReveal variants={slideInRight}>
            <div className="card-surface h-full rounded-2xl p-6 sm:p-8">
              <ContactChannels locale={locale} c={dict.contactsPage} />
            </div>
          </MotionReveal>
        </div>
      </Container>
    </Section>
  );
}
