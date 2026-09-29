import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/brand/logo-icon.webp"
        alt="InsightIT"
        width={260}
        height={175}
        priority
        className="h-9 w-auto select-none"
      />
      {showText && (
        <span className="font-heading text-lg font-bold tracking-tight">
          <span className="text-text">Insight</span>
          <span className="text-accent">IT</span>
        </span>
      )}
    </span>
  );
}
