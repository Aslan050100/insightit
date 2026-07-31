import { MapPin } from "lucide-react";
import { Container } from "@/components/shared/Container";

/**
 * Keyless, reliably-frameable OpenStreetMap embed (Google's `output=embed`
 * refuses to render in an iframe via X-Frame-Options). Below the map, a link
 * opens the location in Google Maps in a new tab.
 */
export function MapEmbed({
  lat,
  lon,
  label,
}: {
  lat: number;
  lon: number;
  label: string;
}) {
  const dLon = 0.006;
  const dLat = 0.003;
  const bbox = `${lon - dLon},${lat - dLat},${lon + dLon},${lat + dLat}`;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;
  const gmaps = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

  return (
    <section className="pb-20 md:pb-28">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-line">
          <iframe
            src={src}
            title="InsightIT — карта"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full md:h-[400px]"
            style={{
              border: 0,
              filter: "invert(0.92) hue-rotate(180deg) saturate(0.8) contrast(0.9)",
            }}
          />
          <a
            href={gmaps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-t border-line bg-surface-1 px-5 py-4 text-sm font-medium text-text-muted transition-colors hover:text-text"
          >
            <MapPin size={16} className="shrink-0 text-accent" />
            {label}
          </a>
        </div>
      </Container>
    </section>
  );
}
