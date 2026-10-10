"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { scrollToSection } from "@/lib/utils";

interface HeroContentProps {
  videoSrc: string | null;
  posterSrc: string | null;
}

export function HeroContent({ videoSrc, posterSrc }: HeroContentProps) {
  const reduce = useReducedMotion();
  const { open } = useInquiry();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoFailed, setVideoFailed] = useState(false);
  // Starts false so the server render shows the poster first (no hydration /
  // autoplay hiccups). Enabled after mount on every screen, mobile included,
  // whenever motion is allowed — the clip is small and loops muted inline.
  const [canUseVideo, setCanUseVideo] = useState(false);

  useEffect(() => {
    setCanUseVideo(!reduce);
  }, [reduce]);

  // Play the video when we have a file and motion is allowed (mobile + desktop).
  const showVideo = !!videoSrc && canUseVideo && !videoFailed;

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !showVideo) return;
    // Best-effort autoplay; ignore rejection (some browsers block it).
    const play = v.play();
    if (play && typeof play.catch === "function") play.catch(() => {});
  }, [showVideo]);

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: 0.1 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden pb-16 pt-28 sm:pb-20"
    >
      {/* ---------- Background media ---------- */}
      <div className="absolute inset-0 -z-10">
        {/* Base poster / gradient — always present (no layout shift, no 404) */}
        <div
          className="absolute inset-0 bg-ink-900 bg-cover bg-center"
          style={
            posterSrc ? { backgroundImage: `url(${posterSrc})` } : undefined
          }
        />
        {/* Animated ambient glows (cheap transform/opacity, reduced-motion safe) */}
        <div className="ambient left-[-10%] top-[-10%] h-[42rem] w-[42rem] animate-drift-slow bg-violet/25" />
        <div className="ambient bottom-[-20%] right-[-5%] h-[36rem] w-[36rem] animate-drift-slow bg-sky/20 [animation-delay:-6s]" />

        {/* Optional video layer */}
        {showVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={posterSrc ?? undefined}
            onError={() => setVideoFailed(true)}
          >
            <source src={videoSrc!} type="video/mp4" />
          </video>
        )}

        {/* Readability overlays */}
        <div className="absolute inset-0 bg-ink-900/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-900/80 via-transparent to-transparent" />
      </div>

      {/* ---------- Content ---------- */}
      <Container>
        <motion.div
          className="max-w-4xl"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-cloud-muted backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-violet-soft" aria-hidden />
              <span className="mono-label !text-cloud-muted">
                {profile.eyebrow}
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 text-balance font-display text-fluid-hero font-bold leading-[0.98] tracking-tight text-cloud"
          >
            I Build{" "}
            <span className="text-gradient-accent">Digital Experiences</span>{" "}
            <span className="block sm:inline">That Move</span>{" "}
            <span className="relative whitespace-nowrap">
              Businesses
            </span>{" "}
            Forward.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-xl text-pretty text-fluid-lg leading-relaxed text-cloud-muted"
          >
            {profile.subheadline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => open({ title: "Start a Project" })}
            >
              Start a Project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto"
              onClick={() => scrollToSection("work")}
            >
              Explore My Work
            </Button>
          </motion.div>

          {profile.isAvailable && (
            <motion.div
              variants={item}
              className="mt-8 inline-flex items-center gap-2.5 text-sm text-cloud-muted"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              {profile.availabilityStatus}
            </motion.div>
          )}
        </motion.div>
      </Container>

      {/* ---------- Scroll indicator ---------- */}
      <motion.button
        onClick={() => scrollToSection("work")}
        aria-label="Scroll to work"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-cloud-dim transition-colors hover:text-cloud sm:flex"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <span className="mono-label text-[0.6rem]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/15 p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-cloud-muted"
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.button>
    </section>
  );
}
