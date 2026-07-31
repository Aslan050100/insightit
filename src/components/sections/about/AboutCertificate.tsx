"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { pick, type Locale } from "@/lib/i18n";
import type { Localized } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

interface Cert {
  id: string;
  title: Localized;
  note: Localized;
  /** Scan/photo in /public/brand/. Falls back to a badge tile if missing. */
  image: string;
}

/**
 * NOTE for client: пришлите сканы сертификатов — положим в /public/brand/
 * по этим именам, и они заменят плейсхолдеры.
 */
const CERTS: Cert[] = [
  {
    id: "bitrix24",
    title: { ru: "Bitrix24 — Бизнес-партнёр", kz: "Bitrix24 — Бизнес-серіктес" },
    note: { ru: "Действующий партнёр с 10.11.2023", kz: "Қолданыстағы серіктес 10.11.2023-тен" },
    image: "/brand/cert-bitrix24.png",
  },
  {
    id: "1c-bitrix",
    title: { ru: "1С-Битрикс — Бизнес-партнёр", kz: "1С-Битрикс — Бизнес-серіктес" },
    note: { ru: "Действующий партнёр с 13.05.2024", kz: "Қолданыстағы серіктес 13.05.2024-тен" },
    image: "/brand/cert-1c-bitrix.png",
  },
  {
    id: "amocrm",
    title: { ru: "amoCRM — amoSTART", kz: "amoCRM — amoSTART" },
    note: { ru: "Сертифицированный партнёр · ID 28582966", kz: "Сертификатталған серіктес · ID 28582966" },
    image: "/brand/amocrm-certificate.jpg",
  },
];

function CertCard({ cert, locale }: { cert: Cert; locale: Locale }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="card-surface overflow-hidden rounded-2xl transition-colors hover:border-accent/25">
      <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line">
        {/* Base layer: badge tile, covered by the scan once it loads. */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-surface-2 to-surface-1">
          <BadgeCheck size={34} className="text-accent" />
          <span className="px-4 text-center text-sm font-semibold text-text-muted">
            {pick(cert.title, locale)}
          </span>
        </div>
        {!failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={cert.image}
            alt={pick(cert.title, locale)}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-base font-semibold text-text">
          {pick(cert.title, locale)}
        </h3>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-text-muted">
          <BadgeCheck size={14} className="shrink-0 text-accent" />
          {pick(cert.note, locale)}
        </p>
      </div>
    </div>
  );
}

export function AboutCertificate({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const a = dict.aboutPage;

  return (
    <Section>
      <Container>
        <SectionTitle eyebrow={a.certsEyebrow} title={a.certsTitle} subtitle={a.certsSubtitle} />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CERTS.map((cert) => (
            <MotionStaggerItem key={cert.id} className="h-full">
              <CertCard cert={cert} locale={locale} />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
