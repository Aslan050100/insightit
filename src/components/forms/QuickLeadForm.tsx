"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Check, Loader2, ArrowRight } from "lucide-react";
import { submitLead } from "@/lib/lead";
import { track } from "@/lib/track";
import { formatPhoneMask, isPhoneComplete } from "@/lib/phone";
import { contacts } from "@/content/data/contacts";
import { waLink } from "@/lib/links";
import { localizedHref, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { buttonVariants } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

const field =
  "w-full rounded-xl border border-line-strong bg-surface-2 px-4 py-3 text-sm text-text placeholder:text-text-faint outline-none transition focus:border-accent/50 focus:ring-2 focus:ring-accent/20";

/** Name + phone only — the short lead form reused by the audit section and
 * the hero's audit/demo modals (see CODEX_TASKS P1-2/P1-3). */
export function QuickLeadForm({
  locale,
  common,
  formName,
  namePlaceholder,
  phonePlaceholder,
  submitLabel,
  sendingLabel,
  successMessage,
  waMessage,
  onSuccess,
}: {
  locale: Locale;
  common: Dictionary["common"];
  formName: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  waMessage: string;
  onSuccess?: () => void;
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [hp, setHp] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const renderedAt = useRef(Date.now());

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !isPhoneComplete(phone)) return;
    setStatus("sending");

    const res = await submitLead({
      name: name.trim(),
      phone: phone.trim(),
      source: formName,
      formName,
      hp,
      renderedAt: renderedAt.current,
    });

    if (res.ok) {
      track("lead_form_submit", { form: formName });
      setStatus("success");
      onSuccess?.();
      return;
    }

    track("lead_form_error", { form: formName });
    window.open(waLink(contacts.whatsapp, `${name} · ${phone}\n${waMessage}`), "_blank", "noopener,noreferrer");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-accent/25 bg-surface-2/50 p-8 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full gradient-accent text-accent-fg">
          <Check size={26} />
        </span>
        <p className="mt-4 text-base font-semibold text-text">{successMessage}</p>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={onSubmit} className="relative space-y-3" noValidate>
      <div className="absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor={`${formName}-website`}>Website</label>
        <input
          id={`${formName}-website`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={hp}
          onChange={(e) => setHp(e.target.value)}
        />
      </div>
      <input
        className={field}
        placeholder={namePlaceholder}
        value={name}
        onChange={(e) => setName(e.target.value)}
        autoComplete="name"
        aria-label={namePlaceholder}
      />
      <input
        className={field}
        placeholder="+7 (___) ___-__-__"
        value={phone}
        onChange={(e) => setPhone(formatPhoneMask(e.target.value))}
        inputMode="tel"
        autoComplete="tel"
        aria-label={phonePlaceholder}
      />
      <button
        type="submit"
        disabled={sending || !name.trim() || !isPhoneComplete(phone)}
        className={cn(
          buttonVariants({ variant: "primary", size: "lg" }),
          "w-full",
          (sending || !name.trim() || !isPhoneComplete(phone)) && "pointer-events-none opacity-80",
        )}
      >
        {sending ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            {sendingLabel}
          </>
        ) : (
          <>
            {submitLabel}
            <ArrowRight size={17} />
          </>
        )}
      </button>
      <p className="text-center text-xs text-text-faint">
        {common.privacyConsentPrefix}{" "}
        <Link href={localizedHref(locale, "/privacy")} className="underline hover:text-text">
          {common.privacyLinkLabel}
        </Link>{" "}
        {common.privacyConsentSuffix}
      </p>
    </form>
  );
}
