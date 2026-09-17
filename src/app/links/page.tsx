import type { ComponentType } from "react";
import Image from "next/image";
import { Globe, MessageCircle, Send, Rocket, Tag, CalendarDays } from "lucide-react";
import { ThreadsIcon } from "@/components/shared/ThreadsIcon";
import { waLink, tgLink } from "@/lib/links";

interface LinkItem {
  label: string;
  sub?: string;
  href: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  highlighted?: boolean;
}

const LINKS: LinkItem[] = [
  {
    label: "Конференция CRMConf 2026",
    sub: "Регистрация",
    href: "https://crmconf.kz/?utm_source=instagram&utm_medium=referral&utm_campaign=kz_conf_crmconf2026&utm_content=taplink",
    icon: CalendarDays,
    highlighted: true,
  },
  {
    label: "Открыть бесплатно Bitrix24",
    href: "https://www.bitrix24.kz/create.php?p=18219024&_gl=1*1oiyk8q*_gcl_au*MTA4NTAwMjgyOS4xNzg3OTEwOTM2LjE0NTkwMDg4NzUuMTc4OTM2ODA4MC4xNzg5MzY4MDc5LjEyMzA5MTEzNjkuMTc4OTI4MzA5OS4xNzg5MzY4MDc5*_ga*MTQ2MDE1MzQ5NS4xNzM3MzYzODYx*_ga_Z0EJ6SW6G4*czE3ODk2Mjc0NjgkbzQxOSRnMSR0MTc4OTYyNzQ3MiRqNTYkbDAkaDA.",
    icon: Rocket,
  },
  {
    label: "Цены и тарифы Bitrix24",
    href: "https://www.bitrix24.kz/prices/?p=18219024&_gl=1*3hbort*_gcl_au*MTA4NTAwMjgyOS4xNzg3OTEwOTM2LjE0NTkwMDg4NzUuMTc4OTM2ODA4MC4xNzg5MzY4MDc5LjEyMzA5MTEzNjkuMTc4OTI4MzA5OS4xNzg5MzY4MDc5*_ga*MTQ2MDE1MzQ5NS4xNzM3MzYzODYx*_ga_Z0EJ6SW6G4*czE3ODk2Mjc0NjgkbzQxOSRnMSR0MTc4OTYyNzQ3MiRqNTYkbDAkaDA.",
    icon: Tag,
  },
  {
    label: "insightit.kz",
    sub: "Наш сайт",
    href: "https://insightit.kz",
    icon: Globe,
  },
  {
    label: "WhatsApp",
    href: waLink("77004040032", "Здравствуйте! Я из Instagram, хочу узнать подробнее об InsightIT."),
    icon: MessageCircle,
  },
  {
    label: "Telegram",
    sub: "@insightitkz",
    href: tgLink("insightitkz"),
    icon: Send,
  },
  {
    label: "Threads",
    sub: "@insightit.kz",
    href: "https://www.threads.com/@insightit.kz",
    icon: ThreadsIcon,
  },
];

export default function LinksPage() {
  return (
    <main className="radial-spot flex min-h-screen flex-col items-center px-5 py-14">
      <div className="flex w-full max-w-sm flex-col items-center">
        <span className="card-surface flex h-20 w-20 items-center justify-center overflow-hidden rounded-3xl">
          <Image
            src="/brand/logo-icon.png"
            alt="InsightIT"
            width={1144}
            height={772}
            priority
            className="h-12 w-auto select-none"
          />
        </span>

        <h1 className="mt-5 font-heading text-xl font-bold tracking-tight text-text">
          <span className="text-text">Insight</span>
          <span className="text-accent">IT</span>
        </h1>
        <p className="mt-1.5 text-center text-sm text-text-muted">
          IT-партнёр для бизнеса: Bitrix24 / CRM, сайты и автоматизация
        </p>

        <div className="mt-8 flex w-full flex-col gap-3.5">
          {LINKS.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={
                  item.highlighted
                    ? "card-accent card-surface flex items-center gap-3.5 rounded-2xl px-5 py-4 transition-transform active:scale-[0.98]"
                    : "card-surface flex items-center gap-3.5 rounded-2xl px-5 py-4 transition-transform active:scale-[0.98]"
                }
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                  <Icon size={18} />
                </span>
                <span className="flex-1">
                  <span className="block text-sm font-semibold text-text">{item.label}</span>
                  {item.sub && (
                    <span className="block text-xs text-text-muted">{item.sub}</span>
                  )}
                </span>
              </a>
            );
          })}
        </div>

        <p className="mt-10 text-xs text-text-faint">© {new Date().getFullYear()} InsightIT</p>
      </div>
    </main>
  );
}
