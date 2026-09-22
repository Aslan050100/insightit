"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Theme = "light" | "dark";

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Светлая тема", icon: Sun },
  { value: "dark", label: "Тёмная тема", icon: Moon },
];

export function ThemeToggle() {
  // Starts "dark" to match the SSR-rendered markup; the effect below syncs it
  // to whatever the inline theme-init script already put on <html>, with no
  // visible flash since that attribute is set before first paint.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "light" || current === "dark") setTheme(current);
  }, []);

  function switchTo(next: Theme) {
    if (next === theme) return;
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Private mode / blocked storage — theme still applies for this load.
    }
  }

  return (
    <div className="glass-chip inline-flex items-center rounded-full p-0.5" role="group" aria-label="Тема сайта">
      {OPTIONS.map(({ value, label, icon: Icon }) => {
        const isActive = value === theme;
        return (
          <button
            key={value}
            type="button"
            onClick={() => switchTo(value)}
            aria-pressed={isActive}
            aria-label={label}
            title={label}
            className={cn(
              "relative flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-200",
              isActive ? "text-text" : "text-text-faint hover:text-text",
            )}
          >
            {isActive && (
              <motion.span
                layoutId="theme-pill"
                className="chip-pill-highlight absolute inset-0 rounded-full shadow-sm"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            <Icon size={15} className="relative z-10" />
          </button>
        );
      })}
    </div>
  );
}
