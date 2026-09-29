"use client";

import type { AnchorHTMLAttributes } from "react";
import { track } from "@/lib/track";

interface TrackedLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Analytics goal name, e.g. "wa_click" | "tel_click" | "tg_click". */
  goal: string;
  trackParams?: Record<string, string | number | boolean | undefined>;
}

/**
 * A plain `<a>` that also fires a Metrika/GA4 goal on click. Exists because
 * several call sites (Footer, ContactChannels, HomeHero, …) are Server
 * Components — a native element there can't carry an inline onClick, since
 * functions can't cross the server/client boundary (see CODEX_TASKS P0-2).
 */
export function TrackedLink({ goal, trackParams, onClick, ...rest }: TrackedLinkProps) {
  return (
    <a
      {...rest}
      onClick={(e) => {
        track(goal, trackParams);
        onClick?.(e);
      }}
    />
  );
}
