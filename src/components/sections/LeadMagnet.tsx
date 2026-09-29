import { Sparkles } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { pick, type Locale } from "@/lib/i18n";
import { waMessages } from "@/content/data/contacts";
import type { Dictionary } from "@/content/dictionaries";

export function LeadMagnet({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const m = dict.leadMagnet;

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-surface-1/60 p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/15 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-surface-2/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                <Sparkles size={13} />
                {m.eyebrow}
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-text sm:text-3xl">
                {m.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">{m.desc}</p>
            </div>

            <div>
              <QuickLeadForm
                locale={locale}
                common={dict.common}
                formName="audit"
                namePlaceholder={m.namePlaceholder}
                phonePlaceholder={m.phonePlaceholder}
                submitLabel={m.submit}
                sendingLabel={m.sending}
                successMessage={m.success}
                waMessage={pick(waMessages.audit, locale)}
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
