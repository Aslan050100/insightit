import { cn } from "@/lib/utils";

/**
 * Decorative "automation pipeline" node graph — the site's signature motif.
 * Lines flow (current) and nodes breathe (pulse). Pure SVG + CSS, no assets.
 */
export function NodeGraph({ className }: { className?: string }) {
  const nodes: [number, number, number][] = [
    [60, 80, 4],
    [60, 200, 4],
    [60, 320, 4],
    [200, 140, 5],
    [200, 260, 5],
    [330, 200, 6],
    [440, 110, 4],
    [440, 290, 4],
  ];
  const edges: [number, number][] = [
    [0, 3],
    [1, 3],
    [1, 4],
    [2, 4],
    [3, 5],
    [4, 5],
    [5, 6],
    [5, 7],
  ];

  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      className={cn("h-full w-full", className)}
      aria-hidden="true"
    >
      <g stroke="url(#ng-line)" strokeWidth="1.4" opacity="0.6">
        {edges.map(([a, b], i) => (
          <line
            key={i}
            className="ng-line-flow"
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            style={{ animationDelay: `${(i % 4) * -0.4}s` }}
          />
        ))}
      </g>
      {nodes.map(([x, y, r], i) => (
        <g key={i}>
          <circle
            className="ng-glow-pulse"
            cx={x}
            cy={y}
            r={r + 5}
            fill="url(#ng-glow)"
            style={{ animationDelay: `${(i % 5) * -0.6}s` }}
          />
          <circle
            className="ng-node-pulse"
            cx={x}
            cy={y}
            r={r}
            fill={i === 5 ? "#C6D3E8" : "#9DB0CE"}
            style={{ animationDelay: `${(i % 5) * -0.6}s` }}
          />
        </g>
      ))}
      <defs>
        <linearGradient id="ng-line" x1="0" y1="0" x2="500" y2="400" gradientUnits="userSpaceOnUse">
          <stop stopColor="#9DB0CE" />
          <stop offset="1" stopColor="#C6D3E8" />
        </linearGradient>
        <radialGradient id="ng-glow">
          <stop stopColor="#9DB0CE" stopOpacity="0.7" />
          <stop offset="1" stopColor="#9DB0CE" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  );
}
