import { MessageCircle, Check } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { MotionReveal } from "@/components/motion/MotionReveal";
import { buttonVariants } from "@/components/shared/Button";
import { slideInRight } from "@/lib/animations";
import { pick, type Locale } from "@/lib/i18n";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink } from "@/lib/links";
import { cn } from "@/lib/utils";

export interface ServiceHeroContent {
  badge: string;
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  cardTitle: string;
  points: readonly string[];
  statValue: string;
  statLabel: string;
  stat2Value: string;
  stat2Label: string;
}

export function ServiceHero({
  locale,
  content,
  secondaryHref = "#service-pricing",
}: {
  locale: Locale;
  content: ServiceHeroContent;
  secondaryHref?: string;
}) {
  const c = content;

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
                  href={waLink(contacts.whatsapp, pick(waMessages.general, locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
                >
                  <MessageCircle size={18} />
                  {c.ctaPrimary}
                </a>
                <a
                  href={secondaryHref}
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
                >
                  {c.ctaSecondary}
                </a>
              </div>
            </MotionStaggerItem>
          </MotionStagger>

          <MotionReveal variants={slideInRight}>
            <div className="card-surface card-accent rounded-3xl p-6 sm:p-8">
              <p className="font-heading text-lg font-semibold text-text">{c.cardTitle}</p>
              <ul className="mt-5 space-y-3">
                {c.points.map((item) => (
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
                    {c.statValue}
                  </div>
                  <p className="text-xs text-text-faint">{c.statLabel}</p>
                </div>
                <div className="h-10 w-px bg-line" />
                <div>
                  <div className="font-heading text-2xl font-bold text-text">
                    {c.stat2Value}
                  </div>
                  <p className="text-xs text-text-faint">{c.stat2Label}</p>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </Container>
    </section>
  );
}
