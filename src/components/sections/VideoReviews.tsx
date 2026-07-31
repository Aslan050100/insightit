"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { Section } from "@/components/shared/Section";
import { Container } from "@/components/shared/Container";
import { SectionTitle } from "@/components/shared/SectionTitle";
import { MotionStagger, MotionStaggerItem } from "@/components/motion/MotionStagger";
import { videoReviews, type VideoReview } from "@/content/data/videoReviews";
import { pick, type Locale } from "@/lib/i18n";
import type { Dictionary } from "@/content/dictionaries";

function ReelCard({
  item,
  locale,
  watchLabel,
  onOpen,
}: {
  item: VideoReview;
  locale: Locale;
  watchLabel: string;
  onOpen: () => void;
}) {
  const [failed, setFailed] = useState(false);
  const showPoster = item.poster && !failed;

  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-2xl border border-line text-left outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      aria-label={`${watchLabel} — ${item.author}, ${item.company}`}
    >
      {/* Base layer: gradient + monogram, covered by the poster when present. */}
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-surface-2 to-surface-1">
        <span className="font-heading text-4xl font-bold text-accent/30">{item.monogram}</span>
      </div>
      {showPoster && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.poster}
          alt={item.author}
          loading="lazy"
          onError={() => setFailed(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      {/* Readability gradient + play button + caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full gradient-accent text-accent-fg shadow-[0_10px_30px_-8px_rgba(0,0,0,0.7)] transition-transform duration-300 group-hover:scale-110">
        <Play size={22} className="ml-0.5" fill="currentColor" />
      </span>
      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="text-sm font-semibold text-white">{item.author}</p>
        <p className="text-xs text-white/70">
          {pick(item.role, locale)} · {item.company}
        </p>
      </div>
    </button>
  );
}

export function VideoReviews({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const v = dict.videoSection;
  const [active, setActive] = useState<VideoReview | null>(null);

  useEffect(() => {
    if (!active) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  const soonText = locale === "ru" ? "Видео скоро добавим" : "Бейне жақында қосылады";

  return (
    <Section className="border-y border-line bg-surface-1/30">
      <Container>
        <SectionTitle eyebrow={v.eyebrow} title={v.title} subtitle={v.subtitle} />

        <MotionStagger className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
          {videoReviews.map((item) => (
            <MotionStaggerItem key={item.id} className="mx-auto w-full max-w-[260px]">
              <ReelCard
                item={item}
                locale={locale}
                watchLabel={v.watch}
                onOpen={() => setActive(item)}
              />
            </MotionStaggerItem>
          ))}
        </MotionStagger>
      </Container>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setActive(null)}
            role="dialog"
            aria-modal="true"
          >
            <div className="absolute inset-0 bg-night/85 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 flex aspect-[9/16] max-h-[85vh] w-full max-w-[calc(85vh*9/16)] items-center justify-center overflow-hidden rounded-3xl border border-line bg-surface-1"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 8 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {active.src ? (
                <video
                  src={active.src}
                  poster={active.poster}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-3 px-6 text-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full gradient-accent text-accent-fg">
                    <Play size={26} className="ml-1" fill="currentColor" />
                  </span>
                  <p className="font-heading text-lg font-semibold text-text">{active.author}</p>
                  <p className="text-sm text-text-muted">{soonText}</p>
                </div>
              )}

              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={dict.common.close}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-night/60 text-white backdrop-blur-sm transition-colors hover:bg-night/80"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
