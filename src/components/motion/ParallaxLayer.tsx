"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface ParallaxLayerProps {
  children: ReactNode;
  className?: string;
  /** total travel in px across the scroll range */
  distance?: number;
}

export function ParallaxLayer({ children, className, distance = 60 }: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    reduce ? [0, 0] : [distance, -distance],
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
