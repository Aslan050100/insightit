import { contacts } from "@/content/data/contacts";
import { pick, type Locale } from "@/lib/i18n";

const SITE_URL = "https://insightit.kz";

/** Organization JSON-LD — rendered on every page (CODEX_TASKS P1-6). */
export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: contacts.brand,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo-icon.webp`,
    telephone: contacts.phone,
    sameAs: [`https://instagram.com/${contacts.instagram}`, `https://t.me/${contacts.telegram}`],
    areaServed: "Kazakhstan",
  };
}

/** LocalBusiness JSON-LD — only on /, /kz/ and /about/ per the doc. */
export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: contacts.brand,
    url: SITE_URL,
    telephone: contacts.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: pick(contacts.address, locale),
      addressCountry: "KZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: contacts.geo.lat,
      longitude: contacts.geo.lon,
    },
    openingHours: locale === "ru" ? "Mo-Fr 10:00-19:00" : pick(contacts.hours, locale),
  };
}

/** Service + Offer JSON-LD for a service page (/crm/, /1c/, /amocrm/, /web/, /support/). */
export function serviceJsonLd({
  name,
  description,
  url,
  priceValue,
}: {
  name: string;
  description: string;
  url: string;
  priceValue?: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url,
    provider: { "@type": "Organization", name: contacts.brand, url: SITE_URL },
    areaServed: "Kazakhstan",
    ...(priceValue
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: "KZT",
            price: priceValue,
            url,
          },
        }
      : {}),
  };
}

/** BreadcrumbList JSON-LD for any internal (non-home) page. */
export function breadcrumbJsonLd(
  locale: Locale,
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "InsightIT", item: `${SITE_URL}/${locale}/` },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.name,
        item: `${SITE_URL}/${locale}/${item.path}/`,
      })),
    ],
  };
}
