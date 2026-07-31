"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "motion/react";
import { locales, type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  // Local state drives the slide so it animates instantly on click,
  // independent of when the route navigation resolves.
  const [active, setActive] = useState<Locale>(locale);

  useEffect(() => {
    setActive(locale);
  }, [locale]);

  function switchTo(next: Locale) {
    if (next === active) return;
    setActive(next);
    const segments = pathname.split("/");
    segments[1] = next; // segments[0] === "" , segments[1] === current locale
    const newPath = segments.join("/") || `/${next}`;
    document.cookie = `NEXT_LOCALE=${next};path=/;max-age=31536000;samesite=lax`;
    router.push(newPath, { scroll: false });
  }

  return (
    <div
      className="glass-chip inline-flex items-center rounded-full p-0.5"
      role="group"
      aria-label="Language"
    >
      {locales.map((l) => {
        const isActive = l === active;
        return (
          <button
            key={l}
            type="button"
            onClick={() => switchTo(l)}
            aria-pressed={isActive}
            className={cn(
              "relative rounded-full px-2.5 py-1 text-xs font-semibold uppercase transition-colors duration-200",
              isActive ? "text-text" : "text-text-faint hover:text-text",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="lang-pill"
                className="absolute inset-0 rounded-full bg-white/15 shadow-sm"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <span className="relative z-10">{l}</span>
          </button>
        );
      })}
    </div>
  );
}
