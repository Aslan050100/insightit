import { Phone, Mail, MapPin, Clock, MessageCircle, Send } from "lucide-react";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { contacts, waMessages } from "@/content/data/contacts";
import { waLink, telLink, mailLink, tgLink, igLink } from "@/lib/links";
import { buttonVariants } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

const social =
  "flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-text-muted transition-colors hover:border-accent/40 hover:text-text";

export function ContactChannels({
  locale,
  c,
}: {
  locale: Locale;
  c: Dictionary["contactsPage"];
}) {
  const rows = [
    {
      icon: Phone,
      label: c.phoneLabel,
      value: contacts.phone,
      href: telLink(contacts.phone),
    },
    {
      icon: Mail,
      label: c.emailLabel,
      value: contacts.email,
      href: mailLink(contacts.email),
    },
    {
      icon: MapPin,
      label: c.addressLabel,
      value: pick(contacts.address, locale),
    },
    {
      icon: Clock,
      label: c.hoursLabel,
      value: pick(contacts.hours, locale),
    },
  ];

  return (
    <div className="flex h-full flex-col justify-between">
      <div>
        <h3 className="text-lg font-semibold text-text">{c.channelsTitle}</h3>
        <ul className="mt-5 space-y-4">
          {rows.map((row) => {
            const Icon = row.icon;
            const content = (
              <div className="flex items-start gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
                  <Icon size={17} />
                </span>
                <div>
                  <p className="text-xs uppercase tracking-wide text-text-faint">{row.label}</p>
                  <p className="mt-0.5 text-sm font-medium text-text">{row.value}</p>
                </div>
              </div>
            );
            return (
              <li key={row.label}>
                {row.href ? (
                  <a href={row.href} className="block transition-opacity hover:opacity-80">
                    {content}
                  </a>
                ) : (
                  content
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-6 flex items-center gap-2.5">
          <a className={social} href={waLink(contacts.whatsapp, pick(waMessages.general, locale))} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
            <MessageCircle size={18} />
          </a>
          <a className={social} href={tgLink(contacts.telegram)} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
            <Send size={18} />
          </a>
          <a className={social} href={igLink(contacts.instagram)} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <InstagramIcon size={18} />
          </a>
        </div>
      </div>

      <a
        href={waLink(contacts.whatsapp, pick(waMessages.audit, locale))}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(buttonVariants({ variant: "secondary", size: "lg" }), "mt-8 w-full")}
      >
        <MessageCircle size={18} />
        {c.formSubmit}
      </a>
    </div>
  );
}
