/** Analytics goal tracking — Yandex.Metrika + GA4 (CODEX_TASKS P0-2). */

type TrackParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    ym?: (...args: unknown[]) => void;
    gtag?: (...args: unknown[]) => void;
  }
}

/** Yandex.Metrika counter id — see the ym(...) init call in [locale]/layout.tsx. */
const YM_COUNTER_ID = 112712468;

export function track(goal: string, params?: TrackParams): void {
  if (typeof window === "undefined") return;
  try {
    window.ym?.(YM_COUNTER_ID, "reachGoal", goal, params);
  } catch {
    // Metrika not loaded (blocked, slow network) — never break the caller for this.
  }
  try {
    window.gtag?.("event", goal, params);
  } catch {
    // Same for GA4.
  }
}
