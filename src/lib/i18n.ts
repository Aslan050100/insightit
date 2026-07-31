export const locales = ["ru", "kz"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ru";

/** <html lang="…"> value per locale (Kazakh = "kk" per BCP-47). */
export const htmlLang: Record<Locale, string> = { ru: "ru", kz: "kk" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** A value that exists in both languages. */
export type Localized = { ru: string; kz: string };

/** Render the right language out of a Localized value. */
export function pick(value: Localized, locale: Locale): string {
  return value[locale];
}

/** Build a locale-prefixed href, e.g. localizedHref("kz", "/crm") -> "/kz/crm". */
export function localizedHref(locale: Locale, path: string): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}
