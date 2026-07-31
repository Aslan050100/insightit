"use client";

import { useState } from "react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { team, type TeamMember } from "@/content/data/team";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

function Avatar({ member }: { member: TeamMember }) {
  const [failed, setFailed] = useState(false);
  const showPhoto = member.photo && !failed;

  return (
    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-line">
      {/* Base layer: InsightIT logo, covered by the photo once it loads. */}
      <div className="absolute inset-0 flex items-center justify-center gradient-accent">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-icon.png"
          alt="InsightIT"
          loading="lazy"
          decoding="async"
          className="h-8 w-8 object-contain"
        />
      </div>
      {showPhoto && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photo}
          alt={member.name ?? ""}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}

export function AboutTeam({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const a = dict.aboutPage;

  return (
    <Section className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle eyebrow={a.teamEyebrow} title={a.teamTitle} subtitle={a.teamSubtitle} />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m) => (
            <MotionStaggerItem
              key={m.id}
              className="card-surface flex items-center gap-4 rounded-2xl p-5 transition-colors hover:border-accent/25"
            >
              <Avatar member={m} />
              <div className="min-w-0">
                <p className="font-heading text-base font-semibold text-text">
                  {m.name ?? pick(m.role, locale)}
                </p>
                {m.name && (
                  <p className="mt-0.5 text-sm text-text-muted">{pick(m.role, locale)}</p>
                )}
              </div>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
