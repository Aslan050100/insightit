export interface LeadPayload {
  name: string;
  phone?: string;
  email?: string;
  message?: string;
  /** Where the lead came from, e.g. "Форма контактов" or "Лид-магнит". */
  source?: string;
}

/**
 * Sends a lead to our /api/lead route handler, which forwards it to Bitrix24.
 * Returns { ok: true } only when the lead was actually created in the CRM.
 * On any failure (network, validation, webhook not configured) returns
 * { ok: false } so the caller can fall back to WhatsApp — no lead is lost.
 */
export async function submitLead(
  payload: LeadPayload,
): Promise<{ ok: boolean }> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = (await res.json().catch(() => null)) as { ok?: boolean } | null;
    return { ok: res.ok && data?.ok === true };
  } catch {
    return { ok: false };
  }
}
