import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n";
import { pageMeta } from "@/lib/metadata";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/shared/Container";
import { pick } from "@/lib/i18n";
import { privacySections } from "@/content/data/privacy";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/jsonld";

export const generateMetadata = pageMeta(
  "privacy",
  {
    ru: "Политика конфиденциальности — InsightIT",
    kz: "Құпиялылық саясаты — InsightIT",
  },
  {
    ru: "Как InsightIT собирает, использует и защищает персональные данные посетителей сайта insightit.kz.",
    kz: "InsightIT insightit.kz сайты қонақтарының дербес деректерін қалай жинайды, пайдаланады және қорғайды.",
  },
);

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const isRu = locale === "ru";

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(locale, [
          { name: isRu ? "Политика конфиденциальности" : "Құпиялылық саясаты", path: "privacy" },
        ])}
      />
      <PageHero
        eyebrow={isRu ? "Юридическая информация" : "Заңды ақпарат"}
        title={isRu ? "Политика конфиденциальности" : "Құпиялылық саясаты"}
        subtitle={
          isRu
            ? "Как мы собираем, используем и защищаем персональные данные посетителей сайта."
            : "Біз сайт қонақтарының дербес деректерін қалай жинаймыз, пайдаланамыз және қорғаймыз."
        }
      />

      <Container className="py-14 md:py-20">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-amber-400/40 bg-amber-400/10 p-4 text-sm text-amber-200">
            {isRu
              ? "TODO_OWNER: текст ниже — типовой шаблон по закону РК «О персональных данных и их защите». Перед публикацией на проде его должен проверить и подтвердить юрист."
              : "TODO_OWNER: төмендегі мәтін — ҚР «Дербес деректер және оларды қорғау туралы» заңы бойынша үлгі шаблон. Продакшенге шығармас бұрын оны заңгер тексеруі керек."}
          </div>

          <div className="mt-10 space-y-8">
            {privacySections.map((section) => (
              <div key={section.title.ru}>
                <h2 className="font-heading text-xl font-bold text-text">
                  {pick(section.title, locale)}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-text-muted">
                  {pick(section.body, locale)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
