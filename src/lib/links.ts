/** Builders for outbound contact deep-links (the primary conversion path). */

export function waLink(phoneDigits: string, text?: string): string {
  const base = `https://wa.me/${phoneDigits}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function telLink(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function mailLink(email: string, subject?: string, body?: string): string {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${email}${qs ? `?${qs}` : ""}`;
}

export function tgLink(user: string): string {
  return `https://t.me/${user.replace(/^@/, "")}`;
}

export function igLink(user: string): string {
  return `https://instagram.com/${user.replace(/^@/, "")}`;
}
