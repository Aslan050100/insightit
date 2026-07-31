import type { ReactNode } from "react";
import { Container } from "@/components/shared/Container";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="radial-spot relative overflow-hidden border-b border-line">
      <Container>
        <MotionStagger className="max-w-3xl py-16 md:py-24">
          <MotionStaggerItem>
            <span className="eyebrow-line text-xs font-semibold uppercase tracking-[0.14em] text-accent">
              {eyebrow}
            </span>
          </MotionStaggerItem>
          <MotionStaggerItem>
            <h1 className="mt-4 text-4xl font-extrabold leading-[1.06] text-text sm:text-5xl">
              {title}
            </h1>
          </MotionStaggerItem>
          {subtitle && (
            <MotionStaggerItem>
              <p className="mt-5 text-lg leading-relaxed text-text-muted">{subtitle}</p>
            </MotionStaggerItem>
          )}
          {children && (
            <MotionStaggerItem>
              <div className="mt-8">{children}</div>
            </MotionStaggerItem>
          )}
        </MotionStagger>
      </Container>
    </section>
  );
}
