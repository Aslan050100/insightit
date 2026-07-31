import type { ReactNode } from "react";

export function LogoMarquee({ items }: { items: ReactNode[] }) {
  return (
    <div className="marquee relative w-full overflow-hidden py-2">
      <div className="marquee-track flex w-max items-center gap-3 sm:gap-4">
        {items.map((item, i) => (
          <div key={i} className="shrink-0">
            {item}
          </div>
        ))}
        {items.map((item, i) => (
          <div key={`dup-${i}`} className="shrink-0" aria-hidden>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
