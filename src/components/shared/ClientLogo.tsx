import type { Client } from "@/content/data/clients";
import { cn } from "@/lib/utils";

/**
 * Real client logo in its original brand colors, placed on a frosted-glass
 * plate (translucent, blurred — not a flat white box) so it reads on the dark theme.
 */
export function ClientLogo({
  client,
  className,
}: {
  client: Client;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "logo-glass flex h-14 items-center justify-center rounded-xl px-5",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={client.file}
        alt={client.name}
        title={client.name}
        decoding="async"
        className="max-h-7 w-auto max-w-[120px] object-contain"
      />
    </div>
  );
}
