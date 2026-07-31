import { MessageCircle, Check } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { buttonVariants } from "@/components/shared/Button";
import { slideInRight } from "@/lib/animations";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink } from "@/lib/links";
import { cn } from "@/lib/utils";

export function CrmHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const c = dict.crmPage;
  const checklist =
    locale === "ru"
      ? ["Все каналы в одном окне", "Воронки и автоматизация", "Обучение и поддержка"]
      : ["Барлық арна бір терезеде", "Воронкалар мен автоматтандыру", "Оқыту мен қолдау"];

  return (
    <section className="radial-spot relative overflow-hidden border-b border-line">
      <Container>
        <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionStagger>
            <MotionStaggerItem>
              <h1 className="text-4xl font-extrabold leading-[1.06] text-text sm:text-5xl">
                {c.title}
              </h1>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-muted">
                {c.subtitle}
              </p>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(contacts.whatsapp, pick(waMessages.audit, locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
                >
                  <MessageCircle size={18} />
                  {c.ctaPrimary}
                </a>
                <a
                  href="#crm-pricing"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
                >
                  {c.ctaSecondary}
                </a>
              </div>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionReveal variants={slideInRight}>
            <div className="card-surface card-accent rounded-3xl p-6 sm:p-8">
              <p className="font-heading text-lg font-semibold text-text">
                {dict.crmBand.title}
              </p>
              <ul className="mt-5 space-y-3">
                {checklist.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-text-muted">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg gradient-accent text-accent-fg">
                      <Check size={15} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-4 border-t border-line pt-5">
                <div>
                  <div className="font-heading text-2xl font-bold text-text">7–14</div>
                  <p className="text-xs text-text-faint">
                    {locale === "ru" ? "дней внедрение" : "күнде енгізу"}
                  </p>
                </div>
                <div className="h-10 w-px bg-line" />
                <div>
                  <div className="text-gradient font-heading text-2xl font-bold">50+</div>
                  <p className="text-xs text-text-faint">
                    {locale === "ru" ? "довольных компаний" : "ризашы компания"}
                  </p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
