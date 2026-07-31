"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

interface TypewriterHeadingProps {
  lead: string;
  accent: string;
  tail: string;
  /** milliseconds per character */
  speed?: number;
  /** initial delay before typing starts (ms) */
  delay?: number;
  className?: string;
}

export function TypewriterHeading({
  lead,
  accent,
  tail,
  speed = 38,
  delay = 180,
  className,
}: TypewriterHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);
  // once:true → types a single time when first entering view (i.e. on page entry);
  // it never resets or replays on subsequent scrolls.
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = usePrefersReducedMotion();
  const [count, setCount] = useState(0);

  const full = `${lead} ${accent} ${tail}`;
  const totalLen = full.length;

  useEffect(() => {
    if (reduce) {
      setCount(totalLen);
      return;
    }
    if (!inView) return;
    let timer: ReturnType<typeof setTimeout>;
    let interval: ReturnType<typeof setInterval>;
    timer = setTimeout(() => {
      interval = setInterval(() => {
        setCount((c) => {
          if (c >= totalLen) {
            clearInterval(interval);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, delay);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [inView, totalLen, speed, delay, reduce]);

  // Reconstruct the three styled segments based on how many characters are typed
  const leadEnd = lead.length;
  const leadPart = lead.slice(0, Math.min(count, leadEnd));
  const leadDone = count > leadEnd;

  const accentOffset = leadEnd + 1; // +1 for the space between lead and accent
  const accentPart = leadDone ? accent.slice(0, Math.max(0, count - accentOffset)) : "";
  const accentDone = count > accentOffset + accent.length;

  const tailOffset = accentOffset + accent.length + 1; // +1 for space between accent and tail
  const tailPart = accentDone ? tail.slice(0, Math.max(0, count - tailOffset)) : "";

  const done = count >= totalLen;

  return (
    <h1 ref={ref} className={className}>
      {leadPart}
      {leadDone && " "}
      {accentPart && <span className="text-gradient">{accentPart}</span>}
      {accentDone && " "}
      {tailPart}
      {!done && (
        <span className="cursor-blink ml-0.5 text-accent-2" aria-hidden="true">
          |
        </span>
      )}
    </h1>
  );
}
