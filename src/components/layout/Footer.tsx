import Link from "next/link";
import { Phone, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Container } from "@/components/shared/Container";
import { Logo } from "@/components/shared/Logo";
import { InstagramIcon } from "@/components/shared/InstagramIcon";
import { localizedHref, pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";
import { contacts } from "@/content/data/contacts";
import { waLink, telLink, mailLink, tgLink, igLink } from "@/lib/links";
import { cn } from "@/lib/utils";

const NAV = [
  { key: "services", href: "/services" },
  { key: "crm", href: "/crm" },
  { key: "cases", href: "/cases" },
  { key: "about", href: "/about" },
  { key: "contacts", href: "/#contacts" },
] as const;

const socialClass =
  "flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-text-muted transition-colors hover:border-accent/40 hover:text-text";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-surface-1/40">
      <Container>
        <div className="grid gap-10 py-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-text-muted">
              {dict.footer.tagline}
            </p>
            <div className="mt-5 flex items-center gap-2.5">
              <a className={socialClass} href={waLink(contacts.whatsapp)} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <MessageCircle size={16} />
              </a>
              <a className={socialClass} href={tgLink(contacts.telegram)} target="_blank" rel="noopener noreferrer" aria-label="Telegram">
                <Send size={16} />
              </a>
              <a className={socialClass} href={igLink(contacts.instagram)} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <InstagramIcon size={16} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold text-text">{dict.footer.navTitle}</h3>
            <ul className="mt-4 space-y-2.5">
              {NAV.map((item) => (
                <li key={item.key}>
                  <Link
                    href={localizedHref(locale, item.href)}
                    className="text-sm text-text-muted transition-colors hover:text-text"
                  >
                    {dict.nav[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <h3 className="text-sm font-semibold text-text">{dict.footer.contactsTitle}</h3>
            <ul className="mt-4 space-y-3 text-sm text-text-muted">
              <li>
                <a href={telLink(contacts.phone)} className="flex items-center gap-2.5 transition-colors hover:text-text">
                  <Phone size={15} className="text-accent" />
                  {contacts.phone}
                </a>
              </li>
              <li>
                <a href={mailLink(contacts.email)} className="flex items-center gap-2.5 transition-colors hover:text-text">
                  <Mail size={15} className="text-accent" />
                  {contacts.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-accent" />
                {pick(contacts.address, locale)}
              </li>
            </ul>
          </div>
        </div>

        <div className={cn("flex flex-col items-center justify-between gap-3 border-t border-line py-6 text-xs text-text-faint sm:flex-row")}>
          <p>
            © {year} {contacts.brand}. {dict.footer.rights}
          </p>
          <p>{contacts.domain}</p>
        </div>
      </Container>
    </footer>
  );
}
