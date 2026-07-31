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

export function WebHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const w = dict.websitesPage;

  return (
    <section className="radial-spot relative overflow-hidden border-b border-line">
      <Container>
        <div className="grid items-center gap-12 py-16 md:py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <MotionStagger>
            <MotionStaggerItem>
              <h1 className="text-4xl font-extrabold leading-[1.06] text-text sm:text-5xl">
                {w.title}
              </h1>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-text-muted">
                {w.subtitle}
              </p>
            </MotionStaggerItem>
            <MotionStaggerItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(contacts.whatsapp, pick(waMessages.general, locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
                >
                  <MessageCircle size={18} />
                  {w.ctaPrimary}
                </a>
                <a
                  href="#web-pricing"
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
                >
                  {w.ctaSecondary}
                </a>
              </div>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionReveal variants={slideInRight}>
            <div className="card-surface card-accent rounded-3xl p-6 sm:p-8">
              <p className="font-heading text-lg font-semibold text-text">
                {w.heroCardTitle}
              </p>
              <ul className="mt-5 space-y-3">
                {w.heroPoints.map((item) => (
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
                  <div className="text-gradient font-heading text-2xl font-bold">
                    {w.heroStatValue}
                  </div>
                  <p className="text-xs text-text-faint">{w.heroStatLabel}</p>
                </div>
                <div className="h-10 w-px bg-line" />
                <div>
                  <div className="font-heading text-2xl font-bold text-text">
                    {w.heroStat2Value}
                  </div>
                  <p className="text-xs text-text-faint">{w.heroStat2Label}</p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
