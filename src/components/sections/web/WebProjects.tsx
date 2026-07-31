"use client";

import { useState } from "react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import type { Dictionary } from "@/content/dictionaries";

/** Cover photo per project (keyed by the language-neutral project name).
 *  Files live in /public/projects/. A project with no entry — or whose file is
 *  missing (onError) — falls back to the gradient monogram base layer. */
const PROJECT_IMAGES: Record<string, string> = {
  "Atrium Consulting": "/projects/atrium-consulting.png",
  BBCA: "/projects/bbca.png",
  "Loan 23": "/projects/loan23.png",
  // Family Food / Ziyatker Bilim have no screenshot yet → gradient monogram.
};

/** Monogram from the first letters of up to two words ("Family Food" → "FF"). */
function monogram(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

function ProjectCard({ name, desc }: { name: string; desc: string }) {
  const src = PROJECT_IMAGES[name];
  const [failed, setFailed] = useState(false);

  return (
    <MotionStaggerItem className="card-surface overflow-hidden rounded-2xl transition-colors hover:border-accent/25">
      <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-line">
        {/* Base layer: gradient monogram (covered by the photo once it paints). */}
        <div className="absolute inset-0 flex items-center justify-center gradient-accent">
          <span className="font-heading text-3xl font-bold text-accent-fg">
            {monogram(name)}
          </span>
        </div>
        {src && !failed && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={src}
            alt={name}
            loading="lazy"
            onError={() => setFailed(true)}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        )}
      </div>
      <div className="p-6">
        <h3 className="font-heading text-lg font-semibold text-text">{name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{desc}</p>
      </div>
    </MotionStaggerItem>
  );
}

export function WebProjects({ dict }: { dict: Dictionary }) {
  const w = dict.websitesPage;

  return (
    <Section className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle
          eyebrow={w.projectsEyebrow}
          title={w.projectsTitle}
          subtitle={w.projectsSubtitle}
        />

        <MotionStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {w.projects.map((p) => (
            <ProjectCard key={p.name} name={p.name} desc={p.desc} />
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
