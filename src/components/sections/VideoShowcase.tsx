"use client";

import { useRef, useState } from "react";
import { Play, ChevronLeft, ChevronRight, Film } from "lucide-react";
import { showcaseVideos, type ShowcaseVideo } from "@/data/videos";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";

const accentGrad: Record<ShowcaseVideo["accent"], string> = {
  violet: "from-violet/40 via-violet/10",
  sky: "from-sky/40 via-sky/10",
  mixed: "from-violet/40 via-sky/10",
};

export function VideoShowcase() {
  const [active, setActive] = useState<ShowcaseVideo | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <section
      id="motion"
      aria-label="Work in Motion"
      className="relative scroll-mt-20 py-16 sm:py-28"
    >
      <Container className="relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            index="02"
            eyebrow="Work in Motion"
            title="Interfaces and product walkthroughs."
            description="Selected interfaces, product walkthroughs, and digital experiences. Nothing autoplays — open a card to watch."
          />
          <div className="hidden gap-2 sm:flex">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-cloud-muted transition-colors hover:bg-white/5 hover:text-cloud"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-cloud-muted transition-colors hover:bg-white/5 hover:text-cloud"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </Container>

      <div
        ref={trackRef}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-4 sm:px-6 lg:px-10"
      >
        {showcaseVideos.map((video) => (
          <button
            key={video.id}
            type="button"
            onClick={() => setActive(video)}
            className="group relative w-[85%] shrink-0 snap-start overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 text-left transition-colors hover:border-white/20 sm:w-[60%] lg:w-[42%] xl:w-[34%]"
            aria-label={`Play preview: ${video.title}`}
          >
            <div className="relative aspect-video overflow-hidden">
              {/* Poster image if present, else animated gradient mockup */}
              <div
                className={cn(
                  "absolute inset-0 bg-ink-800 bg-dotgrid bg-gradient-to-br to-transparent",
                  accentGrad[video.accent],
                )}
                style={
                  video.poster
                    ? {
                        backgroundImage: `url(${video.poster})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }
                    : undefined
                }
              />
              {!video.poster && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Film className="h-14 w-14 text-white/10" aria-hidden />
                </div>
              )}
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-ink-900/50 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-violet/30">
                  <Play className="h-6 w-6 translate-x-0.5 text-cloud" aria-hidden />
                </span>
              </div>
              <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-ink-900/70 px-2.5 py-1 text-[0.68rem] text-cloud-muted backdrop-blur">
                {video.tag}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg font-semibold text-cloud">
                {video.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-cloud-muted">
                {video.description}
              </p>
            </div>
          </button>
        ))}
        <div className="w-1 shrink-0" aria-hidden />
      </div>

      {active && (
        <VideoModal video={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}

function VideoModal({
  video,
  onClose,
}: {
  video: ShowcaseVideo;
  onClose: () => void;
}) {
  return (
    <Modal onClose={onClose} label={`${video.title} preview`} size="xl" className="overflow-hidden">
      <div className="relative aspect-video w-full overflow-hidden rounded-t-3xl bg-black">
        {video.src ? (
          // Loaded lazily — only mounted while the modal is open.
          <video
            className="h-full w-full"
            controls
            autoPlay
            playsInline
            preload="metadata"
            poster={video.poster ?? undefined}
          >
            <source src={video.src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div
            className={cn(
              "flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br to-transparent p-8 text-center",
              accentGrad[video.accent],
            )}
          >
            <Film className="h-12 w-12 text-white/30" aria-hidden />
            <p className="max-w-md text-sm text-cloud-muted">
              A recorded walkthrough for this item hasn&apos;t been added yet.
              Real video walkthroughs can be dropped in and linked from{" "}
              <code className="rounded bg-white/5 px-1.5 py-0.5 text-xs text-cloud">
                src/data/videos.ts
              </code>
              .
            </p>
          </div>
        )}
      </div>
      <div className="p-6 sm:p-8">
        <span className="mono-label !text-cloud-muted">{video.tag}</span>
        <h2 className="mt-2 font-display text-2xl font-semibold text-cloud">
          {video.title}
        </h2>
        <p className="mt-2 text-cloud-muted">{video.description}</p>
      </div>
    </Modal>
  );
}
