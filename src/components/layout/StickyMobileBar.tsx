import Link from "next/link";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { contacts, waMessages } from "@/content/data/contacts";
import { telLink, waLink } from "@/lib/links";
import { localizedHref, pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

/**
 * Fixed 3-button action bar for phones (call / WhatsApp / jump to the
 * request form) — the primary conversion paths are one tap away instead of
 * a long scroll. Bitrix24's own floating chat button is hidden at this
 * breakpoint (globals.css) so the two don't stack. CODEX_TASKS P1-1.
 */
export function StickyMobileBar({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <nav
      className="glass-nav fixed inset-x-0 bottom-0 z-40 flex items-stretch border-t border-line pb-[env(safe-area-inset-bottom)] xl:hidden"
      aria-label={dict.common.menu}
    >
      <TrackedLink
        goal="tel_click"
        trackParams={{ place: "sticky" }}
        href={telLink(contacts.phone)}
        className="flex flex-1 flex-col items-center gap-1 py-2.5 text-text-muted transition-colors active:text-text"
      >
        <Phone size={18} className="text-accent" />
        <span className="text-[11px] font-medium">{dict.common.call}</span>
      </TrackedLink>
      <TrackedLink
        goal="wa_click"
        trackParams={{ place: "sticky" }}
        href={waLink(contacts.whatsapp, pick(waMessages.general, locale))}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 flex-col items-center gap-1 border-x border-line py-2.5 text-text-muted transition-colors active:text-text"
      >
        <MessageCircle size={18} className="text-accent" />
        <span className="text-[11px] font-medium">WhatsApp</span>
      </TrackedLink>
      <Link
        href={localizedHref(locale, "/#contacts")}
        className="flex flex-1 flex-col items-center gap-1 py-2.5 text-text-muted transition-colors active:text-text"
      >
        <FileText size={18} className="text-accent" />
        <span className="text-[11px] font-medium">{dict.common.requestShort}</span>
      </Link>
    </nav>
  );
}
