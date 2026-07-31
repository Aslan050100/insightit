import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function GlowBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "glass-chip inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium text-text-muted",
        className,
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {children}
    </span>
  );
}
