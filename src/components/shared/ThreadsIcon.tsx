/** Threads glyph (lucide-react v1 removed brand icons), stroke style to match lucide. */
export function ThreadsIcon({
  size = 18,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2c4.5 0 7 2.7 7 7.2v2.8c0 5-2.7 8-7 8s-7-2.7-7-7.5c0-4.3 2.2-6.3 6-6.3 3.3 0 5 1.6 5 4.2 0 2.1-1.2 3.3-3.1 3.3-1.4 0-2.2-.7-2.2-1.8 0-.9.6-1.5 1.6-1.5" />
    </svg>
  );
}
