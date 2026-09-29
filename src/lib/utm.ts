/** UTM capture for lead attribution (CODEX_TASKS P0-1). */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
type UtmKey = (typeof UTM_KEYS)[number];
export type UtmParams = Partial<Record<UtmKey, string>>;

const STORAGE_KEY = "insightit_utm";

/**
 * Call once per page load. If the current URL carries utm_* params, stores
 * them for the rest of the session (first-touch attribution) so a lead
 * submitted several pages later still carries the campaign that brought the
 * visitor in. A page with no utm_* params leaves whatever was already
 * stored untouched.
 */
export function captureUtm(): void {
  if (typeof window === "undefined") return;
  try {
    const params = new URLSearchParams(window.location.search);
    const found: UtmParams = {};
    let any = false;
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) {
        found[key] = value;
        any = true;
      }
    }
    if (any) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(found));
  } catch {
    // sessionStorage unavailable (private mode etc.) — lead just won't carry UTM.
  }
}

export function readUtm(): UtmParams {
  if (typeof window === "undefined") return {};
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmParams) : {};
  } catch {
    return {};
  }
}
