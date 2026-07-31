import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

type LocalizedText = Record<Locale, string>;

/** Build a per-page generateMetadata from localized title/description. */
export function pageMeta(titles: LocalizedText, descriptions?: LocalizedText) {
  return async function generateMetadata({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> {
    const { locale } = await params;
    const loc: Locale = isLocale(locale) ? locale : "ru";
    return {
      title: titles[loc],
      description: descriptions?.[loc],
    };
  };
}
