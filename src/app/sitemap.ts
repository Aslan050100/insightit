import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = "https://insightit.kz";

/** Route segments (no leading/trailing slash), "" = locale root. Keep in sync
 * with the pages under src/app/[locale]/. */
const PAGES = ["", "crm", "1c", "amocrm", "web", "support", "about", "services", "cases"];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["ru", "kz"] as const;

  return locales.flatMap((locale) =>
    PAGES.map((path) => {
      const seg = path ? `${path}/` : "";
      return {
        url: `${SITE_URL}/${locale}/${seg}`,
        alternates: {
          languages: {
            ru: `${SITE_URL}/ru/${seg}`,
            kk: `${SITE_URL}/kz/${seg}`,
          },
        },
      };
    }),
  );
}
