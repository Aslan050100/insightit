interface TypewriterHeadingProps {
  lead: string;
  accent: string;
  tail: string;
  className?: string;
}

/**
 * Renders the full H1 text immediately (search engines and no-JS visitors
 * must see the real heading, not an empty typing cursor — see CODEX_TASKS
 * P0-5). The entrance motion comes from the surrounding MotionStaggerItem,
 * same as every other hero element, so no extra animation is needed here.
 */
export function TypewriterHeading({ lead, accent, tail, className }: TypewriterHeadingProps) {
  return (
    <h1 className={className}>
      {lead} <span className="text-gradient">{accent}</span> {tail}
    </h1>
  );
}
