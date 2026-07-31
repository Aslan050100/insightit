"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { staggerContainer, staggerItem, viewportReveal } from "@/lib/animations";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export function MotionStagger({ children, className }: ContainerProps) {
  return (
    <motion.div
      className={className}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportReveal}
    >
      {children}
    </motion.div>
  );
}

export function MotionStaggerItem({
  children,
  className,
  variants = staggerItem,
}: ContainerProps & { variants?: Variants }) {
  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}
