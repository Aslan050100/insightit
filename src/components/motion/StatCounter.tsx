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
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      // reset when scrolled out so it re-counts on every re-entry (down & up)
      setDisplay(0);
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
