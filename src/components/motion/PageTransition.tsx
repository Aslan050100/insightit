"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, type ReactNode } from "react";

/** Resets the window to the top whenever a new page mounts.
 *  Because <PageTransition> uses AnimatePresence mode="wait", the new page is
 *  mounted only AFTER the previous one finishes its exit animation. By then the
 *  App Router's own scroll-to-top has already run (against the still-present old
 *  page) and is lost — so navigations, especially via the mobile menu, could
 *  land mid-page or at the very bottom. This effect runs exactly at the new
 *  page's mount. `behavior: "instant"` overrides the global `scroll-behavior:
 *  smooth` so there's no visible scroll animation. */
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <ScrollToTop />
        {children}
      </motion.main>
    </AnimatePresence>
  );
}
