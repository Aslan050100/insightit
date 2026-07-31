import { MotionReveal } from "@/components/motion/MotionReveal";
import { cn } from "@/lib/utils";

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <MotionReveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span className="eyebrow-line text-xs font-semibold uppercase tracking-[0.14em] text-accent">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-bold text-text sm:text-4xl md:text-[2.7rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </MotionReveal>
  );
}
