import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { ClientLogo } from "@/components/shared/ClientLogo";
import { clients } from "@/content/data/clients";
import type { Dictionary } from "@/content/dictionaries";

export function ClientLogosWall({ dict }: { dict: Dictionary }) {
  return (
    <Section className="border-t border-line bg-surface-1/30">
      <Container>
        <SectionTitle
          eyebrow={dict.casesPage.eyebrow}
          title={dict.casesPage.logosTitle}
          subtitle={dict.casesPage.logosSubtitle}
          align="center"
        />
        <MotionStagger className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {clients.map((c) => (
            <MotionStaggerItem key={c.file}>
              <ClientLogo client={c} className="h-16 w-full" />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>
    </Section>
  );
}
