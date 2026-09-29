"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { MessageCircle, Check, Loader2, ChevronDown } from "lucide-react";
import { contacts } from "@/content/data/contacts";
import { waLink } from "@/lib/links";
import { submitLead } from "@/lib/lead";
import { track } from "@/lib/track";
import { formatPhoneMask, isPhoneComplete } from "@/lib/phone";
import { localizedHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { buttonVariants } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-line-strong bg-surface-1 px-4 py-3 text-sm text-text placeholder:text-text-faint outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

export function ContactForm({
  locale,
  c,
  common,
}: {
  locale: Locale;
  c: Dictionary["contactsPage"];
  common: Dictionary["common"];
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [hp, setHp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const renderedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError(c.formErrorName);
      return;
    }
    if (!isPhoneComplete(phone)) {
      setError(c.formErrorContact);
      return;
    }
    setError(null);
    setStatus("sending");

    const res = await submitLead({
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      message: message.trim() || undefined,
      source: c.formTitle,
      formName: "contact",
      hp,
      renderedAt: renderedAt.current,
    });

    if (res.ok) {
      track("lead_form_submit", { form: "contact" });
      setStatus("success");
      return;
    }

    track("lead_form_error", { form: "contact" });

    // Bitrix24 not configured or unreachable → fall back to WhatsApp so the
    // lead is never lost.
    const lines = [
      `${c.formName}: ${name}`,
      `${c.formPhone}: ${phone}`,
      email.trim() && `${c.formEmail}: ${email}`,
      message.trim() && `${c.formMessage}: ${message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(waLink(contacts.whatsapp, lines), "_blank", "noopener,noreferrer");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="card-surface flex h-full min-h-72 flex-col items-center justify-center rounded-2xl p-6 text-center sm:p-8">
        <span className="flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-accent-fg">
          <Check size={26} />
        </span>
        <h3 className="mt-5 text-lg font-semibold text-text">{c.formSuccess}</h3>
        <p className="mt-2 max-w-xs text-sm text-text-muted">{c.formHint}</p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="card-surface rounded-2xl p-6 sm:p-8" noValidate>
      <h3 className="text-lg font-semibold text-text">{c.formTitle}</h3>

      {/* Honeypot — hidden from real visitors, bots fill every field they find. */}
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input
          id="cf-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>

      <div className="mt-5 space-y-3">
        <div>
          <label htmlFor="cf-name" className="sr-only">
            {c.formName}
          </label>
          <input
            id="cf-name"
            className={field}
            placeholder={c.formName}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="cf-phone" className="sr-only">
            {c.formPhone}
          </label>
          <input
            id="cf-phone"
            className={field}
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={(e) => setPhone(formatPhoneMask(e.target.value))}
            inputMode="tel"
            autoComplete="tel"
          />
        </div>

        {detailsOpen ? (
          <>
            <div>
              <label htmlFor="cf-email" className="sr-only">
                {c.formEmail}
              </label>
              <input
                id="cf-email"
                className={field}
                placeholder={c.formEmail}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputMode="email"
                autoComplete="email"
              />
            </div>
            <div>
              <label htmlFor="cf-message" className="sr-only">
                {c.formMessage}
              </label>
              <textarea
                id="cf-message"
                className={cn(field, "min-h-28 resize-y")}
                placeholder={c.formMessage}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setDetailsOpen(true)}
            className="flex items-center gap-1.5 text-sm text-text-muted transition-colors hover:text-text"
          >
            <ChevronDown size={15} />
            {c.formAddDetails}
          </button>
        )}
      </div>

      {error && <p className="mt-3 text-sm text-[#ff8a8a]">{error}</p>}

      <button
        type="submit"
        disabled={sending}
        className={cn(
          buttonVariants({ variant: "primary", size: "lg" }),
          "mt-5 w-full",
          sending && "pointer-events-none opacity-80",
        )}
      >
        {sending ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {c.formSending}
          </>
        ) : (
          <>
            <MessageCircle size={18} />
            {c.formSubmit}
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-text-faint">{c.formHint}</p>
      <p className="mt-2 text-center text-xs text-text-faint">
        {common.privacyConsentPrefix}{" "}
        <Link href={localizedHref(locale, "/privacy")} className="underline hover:text-text">
          {common.privacyLinkLabel}
        </Link>{" "}
        {common.privacyConsentSuffix}
      </p>
    </form>
  );
}
