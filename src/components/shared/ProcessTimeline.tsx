"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { pick, type Locale } from "@/lib/i18n";
import { processSteps, type ProcessStep } from "@/content/data/process";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

/** Delay between each sequential reveal: number → its line → next number → … */
const STEP = 0.34;

const numberV: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * STEP, type: "spring", stiffness: 320, damping: 18 },
  }),
};

const textV: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * STEP + 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  }),
};

/** Horizontal connector (desktop) — grows left→right toward the next number. */
const lineHV: Variants = {
  hidden: { scaleX: 0 },
  visible: (i: number) => ({
    scaleX: 1,
    transition: { delay: i * STEP, duration: STEP, ease: "easeInOut" },
  }),
};

/** Vertical connector (mobile) — grows top→bottom toward the next number. */
const lineVV: Variants = {
  hidden: { scaleY: 0 },
  visible: (i: number) => ({
    scaleY: 1,
    transition: { delay: i * STEP, duration: STEP, ease: "easeInOut" },
  }),
};

export function ProcessTimeline({
  locale,
  steps = processSteps,
  colsClassName = "lg:grid-cols-5",
}: {
  locale: Locale;
  steps?: ProcessStep[];
  /** Tailwind grid-cols class for the horizontal (lg+) row, e.g. "lg:grid-cols-6". */
  colsClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // once:true → the sequence plays a single time when first scrolled into view.
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = usePrefersReducedMotion();
  const state = inView ? "visible" : "hidden";
  const lastIndex = steps.length - 1;

  // Sequence slots: number k → slot 2k, the line after it → slot 2k+1.
  // → 1, line, 2, line, 3 … Reduced motion collapses every delay to 0.
  const slot = (n: number) => (reduce ? 0 : n);

  return (
    <div ref={ref} className={cn("relative grid gap-x-6 gap-y-10", colsClassName)}>
      {steps.map((step, i) => {
        const isLast = i === lastIndex;
        return (
          <div key={step.num} className="relative flex gap-4 lg:block">
            {/* number + (desktop) horizontal connector to the next step */}
            <div className="flex shrink-0 items-center lg:w-full">
              <motion.span
                variants={numberV}
                custom={slot(i * 2)}
                initial="hidden"
                animate={state}
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-surface-2 font-heading text-sm font-bold text-accent"
              >
                {step.num}
              </motion.span>
              {!isLast && (
                <motion.span
                  aria-hidden
                  variants={lineHV}
                  custom={slot(i * 2 + 1)}
                  initial="hidden"
                  animate={state}
                  className="ml-3 -mr-6 hidden h-px flex-1 origin-left bg-gradient-to-r from-accent/55 to-line-strong lg:block"
                />
              )}
            </div>

            {/* mobile vertical connector down to the next step */}
            {!isLast && (
              <motion.span
                aria-hidden
                variants={lineVV}
                custom={slot(i * 2 + 1)}
                initial="hidden"
                animate={state}
                className="absolute left-[1.35rem] top-12 -bottom-10 w-px origin-top bg-gradient-to-b from-accent/55 to-line-strong lg:hidden"
              />
            )}

            <motion.div
              variants={textV}
              custom={slot(i * 2)}
              initial="hidden"
              animate={state}
              className="lg:mt-4"
            >
              <h3 className="text-base font-semibold text-text">
                {pick(step.title, locale)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">
                {pick(step.desc, locale)}
              </p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
