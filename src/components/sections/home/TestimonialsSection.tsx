"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote, X } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { TestimonialCard } from "@/components/shared/TestimonialCard";
import { testimonials, type Testimonial } from "@/content/data/testimonials";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

export function TestimonialsSection({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const t = dict.testimonialsSection;
  const [active, setActive] = useState<Testimonial | null>(null);

  // Lock background scroll + allow ESC to close while the modal is open.
  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <Section>
      <Container>
        <SectionTitle eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <MotionStagger className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <MotionStaggerItem key={item.author} className="h-full">
              <button
                type="button"
                onClick={() => setActive(item)}
                className="block h-full w-full cursor-pointer rounded-2xl text-left outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                aria-label={`${t.readMore} — ${item.author}`}
              >
                <TestimonialCard item={item} locale={locale} readMore={t.readMore} />
              </button>
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-night/80 backdrop-blur-sm" />
            <motion.div
              className="card-surface relative z-10 w-full max-w-lg rounded-3xl p-7 sm:p-9"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={dict.common.close}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-text-muted transition-colors hover:text-text"
              >
                <X size={18} />
              </button>

              <Quote size={32} className="text-accent/50" />
              <p className="mt-5 text-base leading-relaxed text-text">
                «{pick(active.quote, locale)}»
              </p>

              <div className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
                <span className="flex h-12 w-12 items-center justify-center rounded-full gradient-accent text-base font-bold text-accent-fg">
                  {active.short}
                </span>
                <div>
                  <p className="text-sm font-semibold text-text">{active.author}</p>
                  <p className="text-xs text-text-faint">
                    {pick(active.role, locale)}, {active.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
