"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, GraduationCap, Briefcase, MapPin, Code2, Clock } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useInquiry } from "@/components/providers/InquiryProvider";

const focusAreas = [
  "Full-stack web applications",
  "Business websites",
  "Admin dashboards",
  "API & database design",
];

export function AboutSection() {
  const { open } = useInquiry();
  const reduce = useReducedMotion();

  return (
    <section id="about" className="relative scroll-mt-20 overflow-x-clip bg-ink-800/30 py-16 sm:py-28">
      <Container className="relative grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center lg:gap-16">
        {/* Text */}
        <div>
          <SectionHeading
            index="03"
            eyebrow="About"
            title="The developer behind the work."
          />

          <div className="mt-6 space-y-4">
            {profile.bio.map((para, i) => (
              <Reveal key={i} delay={0.05 * i}>
                <p className="text-pretty text-fluid-base leading-relaxed text-cloud-muted">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>

          {/* Quick facts */}
          <Reveal delay={0.1}>
            <dl className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Fact icon={<Briefcase className="h-4 w-4" />} label="Works at" value={profile.company} />
              <Fact icon={<Clock className="h-4 w-4" />} label="Experience" value="2 years" />
              <Fact icon={<GraduationCap className="h-4 w-4" />} label="Education" value="BCA" />
              <Fact icon={<Code2 className="h-4 w-4" />} label="Focus" value="Frontend + Backend" />
              <Fact icon={<MapPin className="h-4 w-4" />} label="Based in" value={profile.location} />
            </dl>
          </Reveal>

          {/* Current focus */}
          <Reveal delay={0.15}>
            <div className="mt-8">
              <p className="mono-label mb-3">Currently building</p>
              <div className="flex flex-wrap gap-2">
                {focusAreas.map((f) => (
                  <span
                    key={f}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-sm text-cloud-muted"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <Button
              className="mt-9"
              onClick={() => open({ title: "Let's discuss your project" })}
            >
              Discuss a project
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </Reveal>
        </div>

        {/* Portrait panel */}
        <Reveal from="right" delay={0.1}>
          <div className="relative mx-auto max-w-sm lg:max-w-none">
            <div className="ambient -right-8 -top-8 h-56 w-56 bg-violet/25" aria-hidden />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-ink-800">
              {profile.profileImage ? (
                <Image
                  src={profile.profileImage}
                  alt={`${profile.name}, ${profile.title}`}
                  fill
                  sizes="(max-width: 1024px) 384px, 440px"
                  className="object-cover"
                />
              ) : (
                <PortraitFallback reduce={!!reduce} />
              )}
              {/* Name plate */}
              <div className="absolute inset-x-0 bottom-0 border-t border-white/10 bg-ink-900/70 p-5 backdrop-blur">
                <p className="font-display text-lg font-semibold text-cloud">
                  {profile.name}
                </p>
                <p className="text-sm text-cloud-muted">{profile.title}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Fact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-violet/15 text-violet-soft">
        {icon}
      </span>
      <div className="min-w-0">
        <dt className="text-[0.7rem] uppercase tracking-wider text-cloud-dim">
          {label}
        </dt>
        <dd className="truncate text-sm text-cloud">{value}</dd>
      </div>
    </div>
  );
}

function PortraitFallback({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-dotgrid">
      <div className="absolute inset-0 bg-gradient-to-br from-violet/20 via-transparent to-sky/15" />
      <motion.div
        className="relative grid h-32 w-32 place-items-center rounded-full border border-white/10 bg-ink-900/60 backdrop-blur"
        animate={reduce ? undefined : { y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-display text-5xl font-bold text-gradient-accent">
          {profile.wordmarkShort}
        </span>
      </motion.div>
      <span className="absolute bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-white/10 bg-ink-900/60 px-3 py-1 text-[0.7rem] text-cloud-dim backdrop-blur">
        Add a portrait in profile.ts
      </span>
    </div>
  );
}
