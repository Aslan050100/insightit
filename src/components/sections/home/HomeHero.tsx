import Link from "next/link";
import { ArrowUpRight, MessageCircle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { NodeGraph } from "@/components/shared/NodeGraph";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { StatCounter } from "@/components/motion/StatCounter";
import { TypewriterHeading } from "@/components/motion/TypewriterHeading";
import { buttonVariants } from "@/components/shared/Button";
import { localizedHref, pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink } from "@/lib/links";
import { cn } from "@/lib/utils";

export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.hero;

  return (
    <section className="radial-spot relative overflow-hidden">
      <Container className="relative">
        <div className="grid items-center gap-12 pb-16 pt-14 md:pb-24 md:pt-20 lg:grid-cols-[1.05fr_0.95fr]">
          <MotionStagger className="relative z-10">
            <MotionStaggerItem>
              <TypewriterHeading
                lead={h.titleLead}
                accent={h.titleAccent}
                tail={h.titleTail}
                className="text-4xl font-extrabold leading-[1.05] text-text sm:text-5xl lg:text-6xl"
              />
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                {h.subtitle}
              </p>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={waLink(contacts.whatsapp, pick(waMessages.audit, locale))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants({ variant: "primary", size: "lg" }))}
                >
                  <MessageCircle size={18} />
                  {h.ctaPrimary}
                </a>
                <Link
                  href={localizedHref(locale, "/services")}
                  className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}
                >
                  {h.ctaSecondary}
                  <ArrowUpRight size={18} />
                </Link>
              </div>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="mt-7 flex items-center gap-2 text-sm text-text-faint">
                <ShieldCheck size={16} className="text-accent" />
                {h.trust}
              </p>
            </MotionStaggerItem>
          </MotionStagger>

          {/* Visual */}
          <div className="relative hidden h-[420px] lg:block">
            <ParallaxLayer distance={80} className="absolute inset-0">
              <div className="absolute inset-0 opacity-90">
                <NodeGraph />
              </div>
            </ParallaxLayer>

            <div className="card-surface absolute right-2 top-6 rounded-2xl px-5 py-4">
              <div className="text-gradient font-heading text-3xl font-bold">
                <StatCounter value={50} suffix="+" />
              </div>
              <p className="mt-1 text-xs text-text-muted">
                {locale === "ru" ? "компаний нам доверяют" : "компания бізге сенеді"}
              </p>
            </div>

            <div className="card-surface absolute bottom-8 left-0 rounded-2xl px-5 py-4">
              <div className="font-heading text-3xl font-bold text-text">7–14</div>
              <p className="mt-1 text-xs text-text-muted">
                {locale === "ru" ? "дней на внедрение CRM" : "күнде CRM енгізу"}
              </p>
            </div>
          </div>
        </div>
      </Container>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line-strong to-transparent" />
    </section>
  );
}
