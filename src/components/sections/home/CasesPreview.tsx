import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { CaseCard } from "@/components/shared/CaseCard";
import { cases } from "@/content/data/cases";
import { localizedHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { cn } from "@/lib/utils";

export function CasesPreview({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <Section>
      <Container>
        <SectionTitle
          eyebrow={dict.casesSection.eyebrow}
          title={dict.casesSection.title}
          subtitle={dict.casesSection.subtitle}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <MotionStaggerItem
              key={c.slug}
              className={cn(c.featured && "sm:col-span-2 lg:col-span-2")}
            >
              <CaseCard caseStudy={c} locale={locale} featured={c.featured} />
            </MotionStaggerItem>
          ))}

          <MotionStaggerItem>
            <Link
              href={localizedHref(locale, "/cases")}
              className="group flex h-full min-h-[180px] flex-col justify-between rounded-2xl border border-dashed border-line-strong bg-surface-1/50 p-6 transition-colors hover:border-accent/40"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-line-strong bg-surface-2 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ArrowUpRight size={18} />
              </span>
              <span className="text-lg font-semibold text-text">{dict.common.allCases}</span>
            </Link>
          </MotionStaggerItem>
        </MotionStagger>
      </Container>
    </Section>
  );
}
