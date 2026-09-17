# InsightIT.kz

Премиум, тёмный, двуязычный (RU/KZ) сайт IT-агентства InsightIT с моушн-дизайном.

## Стек
- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind CSS v4** (CSS-first `@theme`, тёмная тема)
- **Motion** (Framer Motion) — анимации
- **lucide-react** — иконки
- Деплой: **Vercel**

## Запуск
```bash
npm install
npm run dev      # http://localhost:3000 → /ru
npm run build
npm run start
```

## Структура
- `src/app/[locale]/` — страницы (ru/kz): `/`, `/services`, `/crm`, `/cases`, `/about`, `/contacts`
- `src/proxy.ts` — определение языка + редирект на `/ru` или `/kz`
- `src/app/globals.css` — тёмная дизайн-система (токены `@theme`)
- `src/content/ru.ts` + `kz.ts` — все UI-тексты (RU — канон, KZ типобезопасно синхронизирован)
- `src/content/data/*` — данные (услуги, кейсы, тарифы, отзывы, партнёры, контакты)
- `src/components/` — `layout/`, `motion/`, `shared/`, `forms/`, `sections/`

## Язык
`/ru` (по умолчанию) и `/kz`. Переключатель в шапке сохраняет путь и пишет cookie `NEXT_LOCALE`.
Чтобы изменить тексты — правьте `src/content/ru.ts` и `src/content/kz.ts` (ключи должны совпадать, иначе ошибка сборки).

## ✅ Уже интегрировано (реальные данные)
- **Логотипы клиентов** (27 шт.) — `public/clients/`, данные в `src/content/data/clients.ts`.
  Показаны на главной (маркиза «НАМ ДОВЕРЯЮТ · 50+») и на `/cases` (сетка). Нормализованы в белый (`brightness-0 invert`).
- **Сертификат amoCRM** — `public/brand/amocrm-certificate.jpg`, на странице `/about`.

## ⚠️ Заменить реальными данными (сейчас — заглушки)
1. **Логотип InsightIT** — `src/components/shared/Logo.tsx` (SVG-плейсхолдер). Присланные файлы оказались логотипами Mereketoi, не InsightIT. Нужен реальный логотип InsightIT → `public/brand/`.
2. **Названия/порядок клиентов** в `clients.ts` — проставлены по доменам, проверьте (alt/title).
3. **Логотипы тех-партнёров** (Bitrix24, amoCRM, 1С, Wazzup…) — пока текстовые чипы (`LogoChip`) в `PartnersMarquee`.
4. **Фото основателя** — `AboutFounder.tsx` (сейчас инициалы «АА»). Фото → `public/team/`.
4. **Отзывы** — `src/content/data/testimonials.ts` — тексты составлены по смыслу, **подтвердите/замените дословными**.
5. **Telegram** — `src/content/data/contacts.ts`, поле `telegram: "insightitkz"` — подтверждено клиентом.
6. **Кейсы** — метрики в `src/content/data/cases.ts` (Etasa +40%, Dveriline ×2 и т.д.) — проверьте.
7. **Цвета бренда** — токены в `src/app/globals.css` (`@theme`). Если есть фирменные цвета — подставьте.

## Деплой на Vercel
```bash
vercel               # связать проект
vercel --prod        # прод
```
Подключите домен `insightit.kz` в настройках проекта Vercel.

## Контакты (источник правды)
`src/content/data/contacts.ts` — телефон, email, адрес, соцсети, готовые тексты для WhatsApp.
