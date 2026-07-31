import { cn } from "@/lib/utils";

/**
 * Placeholder brand chip (no real logos yet). Swap for real SVG/PNG
 * logos in /public/partners and /public/cases when assets arrive.
 */
export function LogoChip({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-14 items-center justify-center rounded-xl border border-line bg-surface-1/60 px-5",
        className,
      )}
    >
      <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-text-muted">
        {label}
      </span>
    </div>
  );
}
