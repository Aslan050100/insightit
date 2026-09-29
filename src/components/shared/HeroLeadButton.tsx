"use client";

import { useState, type ReactNode } from "react";
import { Modal } from "@/components/shared/Modal";
import { QuickLeadForm } from "@/components/forms/QuickLeadForm";
import { track } from "@/lib/track";
import { buttonVariants, type ButtonProps } from "@/components/shared/Button";
import type { Dictionary } from "@/content/dictionaries";
import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";

/**
 * A CTA button that opens a modal with the short name+phone lead form,
 * instead of jumping straight to WhatsApp — used for the hero's audit and
 * demo CTAs (CODEX_TASKS P1-2/P1-3). WhatsApp stays available as a
 * secondary link next to the button, rendered by the caller.
 */
export function HeroLeadButton({
  locale,
  common,
  variant = "primary",
  icon,
  label,
  openGoal,
  formName,
  modalEyebrow,
  modalTitle,
  modalDesc,
  namePlaceholder,
  phonePlaceholder,
  submitLabel,
  sendingLabel,
  successMessage,
  waMessage,
  closeLabel,
}: {
  locale: Locale;
  common: Dictionary["common"];
  variant?: ButtonProps["variant"];
  icon: ReactNode;
  label: string;
  /** Analytics goal fired when the button opens the modal, e.g. demo_click. */
  openGoal?: string;
  formName: string;
  modalEyebrow?: string;
  modalTitle: string;
  modalDesc: string;
  namePlaceholder: string;
  phonePlaceholder: string;
  submitLabel: string;
  sendingLabel: string;
  successMessage: string;
  waMessage: string;
  closeLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          if (openGoal) track(openGoal);
          setOpen(true);
        }}
        className={cn(buttonVariants({ variant, size: "lg" }))}
      >
        {icon}
        {label}
      </button>
      <Modal open={open} onClose={() => setOpen(false)} closeLabel={closeLabel}>
        {modalEyebrow && (
          <span className="text-xs font-semibold uppercase tracking-wide text-accent">{modalEyebrow}</span>
        )}
        <h3 className="mt-2 font-heading text-xl font-bold text-text">{modalTitle}</h3>
        <p className="mt-2 text-sm text-text-muted">{modalDesc}</p>
        <div className="mt-5">
          <QuickLeadForm
            locale={locale}
            common={common}
            formName={formName}
            namePlaceholder={namePlaceholder}
            phonePlaceholder={phonePlaceholder}
            submitLabel={submitLabel}
            sendingLabel={sendingLabel}
            successMessage={successMessage}
            waMessage={waMessage}
          />
        </div>
      </Modal>
    </>
  );
}
