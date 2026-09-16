import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { GlassFilter } from "@/components/shared/GlassFilter";
import { getDictionary } from "@/content/dictionaries";
import { isLocale, locales, htmlLang, type Locale } from "@/lib/i18n";

const inter = Inter({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const SITE_URL = "https://insightit.kz";

const META: Record<Locale, { title: string; description: string }> = {
  ru: {
    title: "InsightIT — IT-партнёр для бизнеса: сайты, приложения, Bitrix24 / CRM",
    description:
      "InsightIT — внедрение Bitrix24 и CRM, разработка сайтов и приложений, автоматизация продаж и бизнес-процессов в Казахстане. Нам доверяют 50+ компаний.",
  },
  kz: {
    title: "InsightIT — бизнеске IT-серіктес: сайт, қосымша, Bitrix24 / CRM",
    description:
      "InsightIT — Bitrix24 және CRM енгізу, сайт пен қосымша әзірлеу, сату мен бизнес-процестерді автоматтандыру. Бізге 50+ компания сенеді.",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const loc: Locale = isLocale(locale) ? locale : "ru";
  const meta = META[loc];

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: meta.title, template: "%s | InsightIT" },
    description: meta.description,
    alternates: {
      canonical: `/${loc}`,
      languages: { ru: "/ru", kk: "/kz" },
    },
    openGraph: {
      type: "website",
      siteName: "InsightIT",
      title: meta.title,
      description: meta.description,
      locale: htmlLang[loc],
      url: `${SITE_URL}/${loc}`,
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);

  return (
    <html lang={htmlLang[locale]} className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-night text-text antialiased">
        <GlassFilter />
        <ScrollProgress />
        <Header locale={locale} dict={dict} />
        <PageTransition>{children}</PageTransition>
        <Footer locale={locale} dict={dict} />
        <Script id="bitrix24-crm-widget" strategy="afterInteractive">
          {`(function(w,d,u){var s=d.createElement('script');s.async=true;s.src=u+'?'+(Date.now()/60000|0);var h=d.getElementsByTagName('script')[0];h.parentNode.insertBefore(s,h);})(window,document,'https://cdn-ru.bitrix24.kz/b27351276/crm/site_button/loader_1_56dniu.js');`}
        </Script>
        <Script
          id="gtag-js"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-BX6Z6416PR"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-BX6Z6416PR');`}
        </Script>
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`(function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
          })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=112712468', 'ym');
          ym(112712468, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`}
        </Script>
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://mc.yandex.ru/watch/112712468" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
