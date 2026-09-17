import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import Script from "next/script";
import "../globals.css";

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

export const metadata: Metadata = {
  title: "InsightIT — ссылки",
  description: "Все ссылки InsightIT: WhatsApp, Telegram, сайт, Bitrix24 и конференция.",
  robots: { index: false, follow: false },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${inter.variable} ${manrope.variable}`}>
      <body className="min-h-screen bg-night text-text antialiased">
        {children}
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
