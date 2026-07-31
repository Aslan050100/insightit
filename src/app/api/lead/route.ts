import { contacts } from "@/content/data/contacts";

/**
 * Lead intake → Bitrix24.
 *
 * Set BITRIX24_WEBHOOK_URL in the environment to your portal's inbound webhook
 * base, e.g. https://b27351276.bitrix24.kz/rest/1/xxxxxxxxxxxxxxxx/
 * (the URL that ends in a slash, with crm.lead.add permission).
 *
 * When the env var is missing or the call fails, we return { ok: false } so the
 * client can fall back to WhatsApp — leads are never silently dropped.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "bad_json" }, { status: 400 });
  }

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const phone = str(body.phone);
  const email = str(body.email);
  const message = str(body.message);
  const source = str(body.source) || "Сайт InsightIT";

  if (!name || (!phone && !email)) {
    return Response.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const webhook = process.env.BITRIX24_WEBHOOK_URL;
  if (!webhook) {
    // Not configured yet — tell the client so it falls back to WhatsApp.
    return Response.json({ ok: false, error: "not_configured" });
  }

  const base = webhook.endsWith("/") ? webhook : `${webhook}/`;

  const fields: Record<string, unknown> = {
    TITLE: `Заявка с сайта ${contacts.domain} — ${source}`,
    NAME: name,
    SOURCE_ID: "WEB",
    SOURCE_DESCRIPTION: source,
    OPENED: "Y",
  };
  if (message) fields.COMMENTS = message;
  if (phone) fields.PHONE = [{ VALUE: phone, VALUE_TYPE: "WORK" }];
  if (email) fields.EMAIL = [{ VALUE: email, VALUE_TYPE: "WORK" }];

  try {
    const res = await fetch(`${base}crm.lead.add.json`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields, params: { REGISTER_SONET_EVENT: "Y" } }),
    });
    const data = (await res.json().catch(() => null)) as
      | { result?: number; error?: string }
      | null;

    if (!res.ok || !data || data.error || !data.result) {
      return Response.json(
        { ok: false, error: "bitrix_error" },
        { status: 502 },
      );
    }
    return Response.json({ ok: true, id: data.result });
  } catch {
    return Response.json({ ok: false, error: "network" }, { status: 502 });
  }
}
