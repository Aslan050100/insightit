import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n";

type LocalizedText = Record<Locale, string>;

/**
 * Build a per-page generateMetadata from localized title/description, plus a
 * self-referencing canonical + hreflang set (each page previously inherited
 * the root layout's "/${locale}" canonical, so every internal page pointed
 * search engines back at the homepage — see CODEX_TASKS P0-3).
 *
 * `path` is the route segment with no leading/trailing slash, e.g. "crm" or
 * "" for the locale root.
 */
export function pageMeta(
  path: string,
  titles: LocalizedText,
  descriptions?: LocalizedText,
) {
  const seg = path ? `${path.replace(/^\/+|\/+$/g, "")}/` : "";
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
      alternates: {
        canonical: `/${loc}/${seg}`,
        languages: {
          ru: `/ru/${seg}`,
          kk: `/kz/${seg}`,
          "x-default": `/ru/${seg}`,
        },
      },
    };
  };
}
