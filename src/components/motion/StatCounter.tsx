"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface StatCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function StatCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });
  const reduce = usePrefersReducedMotion();
  // Starts at the final value so the server-rendered/no-JS markup always
  // shows "50+", never "0+" (search engines and the first paint both read
  // this) — see CODEX_TASKS P0-5.
  const [display, setDisplay] = useState(value);
  const mountedAt = useRef(0);
  const hasEnteredOnce = useRef(false);

  useEffect(() => {
    mountedAt.current = Date.now();
  }, []);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      if (hasEnteredOnce.current) setDisplay(0);
      return;
    }
    // `useInView`'s IntersectionObserver reports asynchronously, so an
    // above-the-fold stat still goes through this effect with `inView`
    // false-then-true shortly after mount. Treat anything that flips to
    // true within ~500ms of mount as "already visible at load" and just
    // settle on the final value instead of animating — otherwise the
    // hero's "50+" badge would flash 0 → 50 on every page load. A real
    // scroll-triggered entry (later, below-the-fold stats) still animates.
    const isInitialReveal = !hasEnteredOnce.current && Date.now() - mountedAt.current < 500;
    hasEnteredOnce.current = true;
    if (isInitialReveal) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("ru-RU")}
      {suffix}
    </span>
  );
}
