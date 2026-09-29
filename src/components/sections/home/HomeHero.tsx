import { MessageCircle, Video, BadgeCheck, Users, MapPin, CalendarCheck } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { NodeGraph } from "@/components/shared/NodeGraph";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { ParallaxLayer } from "@/components/motion/ParallaxLayer";
import { StatCounter } from "@/components/motion/StatCounter";
import { TypewriterHeading } from "@/components/motion/TypewriterHeading";
import { HeroLeadButton } from "@/components/shared/HeroLeadButton";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink } from "@/lib/links";

export function HomeHero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const h = dict.hero;
  const m = dict.demoModal;

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
                className="text-3xl font-extrabold leading-[1.05] text-text sm:text-4xl lg:text-5xl"
              />
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="mt-4 text-lg font-semibold text-accent-2 sm:text-xl">{h.tagline}</p>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg">
                {h.subtitle}
              </p>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="mt-4 text-sm font-medium text-text-muted">{h.statsLine}</p>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <HeroLeadButton
                  locale={locale}
                  common={dict.common}
                  variant="primary"
                  icon={<MessageCircle size={18} />}
                  label={h.ctaPrimary}
                  formName="audit"
                  modalEyebrow={dict.leadMagnet.eyebrow}
                  modalTitle={dict.leadMagnet.title}
                  modalDesc={dict.leadMagnet.desc}
                  namePlaceholder={dict.leadMagnet.namePlaceholder}
                  phonePlaceholder={dict.leadMagnet.phonePlaceholder}
                  submitLabel={dict.leadMagnet.submit}
                  sendingLabel={dict.leadMagnet.sending}
                  successMessage={dict.leadMagnet.success}
                  waMessage={pick(waMessages.audit, locale)}
                  closeLabel={dict.common.close}
                />
                <HeroLeadButton
                  locale={locale}
                  common={dict.common}
                  variant="secondary"
                  icon={<Video size={18} />}
                  label={h.ctaSecondary}
                  openGoal="demo_click"
                  formName="demo"
                  modalEyebrow={m.eyebrow}
                  modalTitle={m.title}
                  modalDesc={m.desc}
                  namePlaceholder={m.namePlaceholder}
                  phonePlaceholder={m.phonePlaceholder}
                  submitLabel={m.submit}
                  sendingLabel={m.sending}
                  successMessage={m.success}
                  waMessage={pick(waMessages.crm, locale)}
                  closeLabel={dict.common.close}
                />
              </div>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <TrackedLink
                goal="wa_click"
                trackParams={{ place: "hero" }}
                href={waLink(contacts.whatsapp, pick(waMessages.audit, locale))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block text-sm text-text-muted underline transition-colors hover:text-text"
              >
                {h.ctaWhatsapp}
              </TrackedLink>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <div className="mt-6 flex flex-wrap items-center gap-2.5">
                <a
                  href={contacts.bitrix24PartnerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:text-text"
                >
                  <BadgeCheck size={14} className="text-accent" />
                  {h.trustPartner}
                </a>
                <span className="glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-text-muted">
                  <CalendarCheck size={14} className="text-accent" />
                  {h.trustSince}
                </span>
                <span className="glass-chip inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-text-muted">
                  <Users size={14} className="text-accent" />
                  {h.trustClients}
                </span>
              </div>
            </MotionStaggerItem>

            <MotionStaggerItem>
              <p className="mt-4 flex items-start gap-2 text-xs text-text-faint">
                <MapPin size={14} className="mt-0.5 shrink-0 text-accent" />
                {dict.common.geography}
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
