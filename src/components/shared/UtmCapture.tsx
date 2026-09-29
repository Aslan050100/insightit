"use client";

import { useEffect } from "react";
import { captureUtm } from "@/lib/utm";

/** Mounted once in the root layout — stores utm_* query params for lead attribution. */
export function UtmCapture() {
  useEffect(() => {
    captureUtm();
  }, []);
  return null;
}
