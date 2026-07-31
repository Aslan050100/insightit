import type { Variants, Transition } from "motion/react";

const easeOut: Transition["ease"] = [0.22, 1, 0.36, 1];

/** Section-level reveal: rises and focuses in (blur → sharp) on scroll. */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 38, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -42, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 42, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: easeOut },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/** Per-item reveal (kept filter-free so large grids stay smooth). */
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeOut } },
};

/** Shared viewport config — reveals replay every time an element enters view
 *  (scrolling down AND back up), firing slightly before fully in view. */
export const viewportReveal = { once: false, margin: "-80px" } as const;
