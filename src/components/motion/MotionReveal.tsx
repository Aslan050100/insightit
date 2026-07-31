"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeInUp, viewportReveal } from "@/lib/animations";

interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
}

export function MotionReveal({
  children,
  className,
  variants = fadeInUp,
  delay = 0,
}: MotionRevealProps) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
