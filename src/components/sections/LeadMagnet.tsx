"use client";

import { useState, type FormEvent } from "react";
import { Sparkles, Check, Loader2, ArrowRight } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { submitLead } from "@/lib/lead";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink } from "@/lib/links";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { buttonVariants } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-line-strong bg-surface-2 px-4 py-3 text-sm text-text placeholder:text-text-faint outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

export function LeadMagnet({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const m = dict.leadMagnet;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;
    setStatus("sending");

    const res = await submitLead({
      name: name.trim(),
      phone: phone.trim(),
      source: m.title,
    });

    if (res.ok) {
      setStatus("success");
      return;
    }

    // Fallback to WhatsApp so the lead is never lost.
    const text = `${name} · ${phone}\n${pick(waMessages.audit, locale)}`;
    window.open(waLink(contacts.whatsapp, text), "_blank", "noopener,noreferrer");
    setStatus("idle");
  }

  const sending = status === "sending";

  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-surface-1/60 p-7 sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/15 blur-3xl" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-surface-2/60 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
                <Sparkles size={13} />
                {m.eyebrow}
              </span>
              <h2 className="mt-4 font-heading text-2xl font-bold text-text sm:text-3xl">
                {m.title}
              </h2>
              <p className="mt-4 max-w-md text-base leading-relaxed text-text-muted">{m.desc}</p>
            </div>

            <div>
              {status === "success" ? (
                <div className="flex flex-col items-center justify-center rounded-2xl border border-accent/25 bg-surface-2/50 p-8 text-center">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-accent-fg">
                    <Check size={26} />
                  </span>
                  <p className="mt-4 text-base font-semibold text-text">{m.success}</p>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-3" noValidate>
                  <input
                    className={field}
                    placeholder={m.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    aria-label={m.namePlaceholder}
                  />
                  <input
                    className={field}
                    placeholder={m.phonePlaceholder}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    inputMode="tel"
                    autoComplete="tel"
                    aria-label={m.phonePlaceholder}
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className={cn(
                      buttonVariants({ variant: "primary", size: "lg" }),
                      "w-full",
                      sending && "pointer-events-none opacity-80",
                    )}
                  >
                    {sending ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {m.sending}
                      </>
                    ) : (
                      <>
                        {m.submit}
                        <ArrowRight size={17} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-text-faint">{m.note}</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
