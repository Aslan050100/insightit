import { readUtm } from "@/lib/utm";

export interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  /** Where the lead came from, e.g. "Форма контактов" or "Лид-магнит". */
  source?: string;
  /** Analytics form identifier, e.g. "contact" | "audit" | "pricing_start". */
  formName: string;
  /** Honeypot value — real visitors never fill this hidden field in. */
  hp?: string;
  /** Date.now() captured when the form was rendered (anti-spam: reject <3s). */
  renderedAt?: number;
}

/**
 * Sends a lead to our PHP endpoint (public/api/lead.php), which forwards it
 * to Bitrix24. A Next.js route handler can't do this on a static export
 * (`output: "export"` drops API routes — see CODEX_TASKS P0-1), so this
 * hits a plain PHP script instead, same origin.
 *
 * Returns { ok: true } only when the lead was actually created in the CRM.
 * On any failure (network, validation, webhook not configured) returns
 * { ok: false } so the caller can fall back to WhatsApp — no lead is lost.
 */
export async function submitLead(
  payload: LeadPayload,
): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/lead.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        url: typeof window !== "undefined" ? window.location.href : undefined,
        utm: readUtm(),
      }),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return { ok: res.ok && data?.ok === true };
  } catch {
    return { ok: false };
  }
}
