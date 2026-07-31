import { Container } from "@/components/shared/Container";
import { LogoMarquee } from "@/components/motion/LogoMarquee";
import { ClientLogo } from "@/components/shared/ClientLogo";
import { clients } from "@/content/data/clients";
import type { Dictionary } from "@/content/dictionaries";

export function ClientsMarquee({ dict }: { dict: Dictionary }) {
  const items = clients.map((c) => <ClientLogo key={c.file} client={c} />);

  return (
    <section className="border-y border-line bg-surface-1/30 py-12 md:py-16">
      <Container>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.16em] text-text-faint">
          {dict.casesPage.logosTitle} · 50+
        </p>
      </Container>
      <div className="mt-8">
        <LogoMarquee items={items} />
      </div>
    </section>
  );
}
