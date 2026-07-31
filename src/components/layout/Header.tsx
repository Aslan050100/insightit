"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { LanguageToggle } from "./LanguageToggle";
import { localizedHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { useScrolled } from "@/hooks/useScrolled";
import { buttonVariants } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

const NAV = [
  { key: "crm", href: "/crm" },
  { key: "websites", href: "/web" },
  { key: "oneC", href: "/1c" },
  { key: "amocrm", href: "/amocrm" },
  { key: "support", href: "/support" },
  { key: "about", href: "/about" },
] as const;

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const pathname = usePathname();
  const scrolled = useScrolled(8);
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => pathname === localizedHref(locale, href);

  return (
    <header
      className={cn(
        "glass-nav sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line shadow-[0_10px_30px_-14px_rgba(0,0,0,0.7)]"
          : "border-b border-white/5",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href={localizedHref(locale, "/")} aria-label="InsightIT" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {NAV.map((item) => (
              <Link
                key={item.key}
                href={localizedHref(locale, item.href)}
                className={cn(
                  "group relative rounded-full px-3.5 py-2 text-center text-sm font-medium leading-tight transition-colors",
                  isActive(item.href) ? "text-text" : "text-text-muted hover:text-text",
                )}
              >
                {dict.nav[item.key]}
                <span
                  className={cn(
                    "absolute inset-x-3.5 -bottom-px h-px bg-gradient-to-r from-accent to-accent-2 transition-all duration-300",
                    isActive(item.href) ? "opacity-100" : "opacity-0 group-hover:opacity-60",
                  )}
                />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 xl:flex">
            <LanguageToggle locale={locale} />
            <Link
              href={localizedHref(locale, "/#contacts")}
              className={cn(buttonVariants({ variant: "primary", size: "md" }))}
            >
              {dict.nav.cta}
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageToggle locale={locale} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? dict.common.close : dict.common.menu}
              aria-expanded={open}
              className="rounded-full border border-line-strong p-2 text-text-muted transition-colors hover:text-text"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="glass-nav overflow-hidden border-b border-line xl:hidden"
          >
            <Container>
              <nav className="flex flex-col gap-1 py-4">
                {NAV.map((item) => (
                  <Link
                    key={item.key}
                    href={localizedHref(locale, item.href)}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                      isActive(item.href)
                        ? "bg-surface-2 text-text"
                        : "text-text-muted hover:bg-surface-2/60 hover:text-text",
                    )}
                  >
                    {dict.nav[item.key]}
                  </Link>
                ))}
                <Link
                  href={localizedHref(locale, "/#contacts")}
                  onClick={() => setOpen(false)}
                  className={cn(buttonVariants({ variant: "primary", size: "md" }), "mt-2 w-full")}
                >
                  {dict.nav.cta}
                  <ArrowUpRight size={16} />
                </Link>
              </nav>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
