/**
 * GlassFilter — SVG displacement filter that refracts the backdrop at the
 * edges of glass elements (iOS "liquid glass" lens look). The displacement
 * map is neutral grey (rgb 128,128 → no shift) across the centre and ramps
 * toward the borders, so only the edges bend/stretch the background while the
 * middle stays clear.
 *
 * The map is built from two gradients blended (screen) inside the filter:
 *   • X map (red channel)   → horizontal displacement, ramps at left/right edges
 *   • Y map (green channel) → vertical displacement, ramps at top/bottom edges
 *
 * The actual `backdrop-filter: … url(#glass-edge)` declaration is injected as a
 * raw <style> here so it bypasses the Tailwind/Lightning-CSS pipeline (which
 * drops url() backdrop filters). Browsers without url()-backdrop support keep
 * the plain blur defined by `.card-surface` in globals.css (progressive
 * enhancement).
 */

// rgb 128 = neutral (no displacement). Edges ramp toward 0 / 255 so the
// backdrop is sampled from just inside the element → stretched rim, no fringe.
const MAP_X =
  "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>" +
  "<defs><linearGradient id='x' x1='0' y1='0' x2='1' y2='0'>" +
  "<stop offset='0' stop-color='rgb(255,0,0)'/>" +
  "<stop offset='0.22' stop-color='rgb(128,0,0)'/>" +
  "<stop offset='0.78' stop-color='rgb(128,0,0)'/>" +
  "<stop offset='1' stop-color='rgb(0,0,0)'/>" +
  "</linearGradient></defs>" +
  "<rect width='100' height='100' fill='url(#x)'/></svg>";

const MAP_Y =
  "<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100'>" +
  "<defs><linearGradient id='y' x1='0' y1='0' x2='0' y2='1'>" +
  "<stop offset='0' stop-color='rgb(0,255,0)'/>" +
  "<stop offset='0.22' stop-color='rgb(0,128,0)'/>" +
  "<stop offset='0.78' stop-color='rgb(0,128,0)'/>" +
  "<stop offset='1' stop-color='rgb(0,0,0)'/>" +
  "</linearGradient></defs>" +
  "<rect width='100' height='100' fill='url(#y)'/></svg>";

const hrefX = `data:image/svg+xml,${encodeURIComponent(MAP_X)}`;
const hrefY = `data:image/svg+xml,${encodeURIComponent(MAP_Y)}`;

const ENHANCE_CSS = `
.card-surface {
  -webkit-backdrop-filter: blur(13px) saturate(1.5) url(#glass-edge);
  backdrop-filter: blur(13px) saturate(1.5) url(#glass-edge);
}
`;

export function GlassFilter() {
  return (
    <>
      <svg
        aria-hidden="true"
        focusable="false"
        width="0"
        height="0"
        style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}
      >
        <defs>
          <filter
            id="glass-edge"
            x="0"
            y="0"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href={hrefX}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="mx"
            />
            <feImage
              href={hrefY}
              x="0"
              y="0"
              width="100%"
              height="100%"
              preserveAspectRatio="none"
              result="my"
            />
            <feBlend in="mx" in2="my" mode="screen" result="map" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="map"
              scale="42"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      <style dangerouslySetInnerHTML={{ __html: ENHANCE_CSS }} />
    </>
  );
}
