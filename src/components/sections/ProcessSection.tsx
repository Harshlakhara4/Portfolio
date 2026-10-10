"use client";

import { motion, useReducedMotion } from "framer-motion";
import { processSteps } from "@/data/process";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProcessSection() {
  const reduce = useReducedMotion();

  const lineTransition = { duration: reduce ? 0 : 1.2, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <section id="process" className="relative scroll-mt-20 py-16 sm:py-28">
      <Container className="relative">
        <SectionHeading
          index="06"
          eyebrow="Process"
          title="From idea to launch."
          description="A clear, repeatable path that keeps every project accountable — from the first conversation to handover."
        />

        {/* Desktop: horizontal */}
        <div className="relative mt-16 hidden lg:block">
          {/* Base + animated line */}
          <div className="absolute left-0 right-0 top-6 h-px bg-white/10" />
          <motion.div
            className="absolute left-0 top-6 h-px origin-left bg-gradient-to-r from-violet via-sky to-violet"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition}
            style={{ width: "100%" }}
          />

          <div className="grid grid-cols-5 gap-4">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative pr-4"
                initial={reduce ? false : { opacity: 0, y: 20, scale: 0.94 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.12 }}
              >
                <span className="relative z-10 grid h-12 w-12 place-items-center rounded-full border border-white/15 bg-ink-900 font-mono text-sm text-violet-soft">
                  {step.number}
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold text-cloud">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cloud-muted">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile / tablet: vertical */}
        <div className="relative mt-12 lg:hidden">
          <div className="absolute bottom-2 left-6 top-2 w-px bg-white/10" />
          <motion.div
            className="absolute left-6 top-2 w-px origin-top bg-gradient-to-b from-violet via-sky to-violet"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={lineTransition}
            style={{ height: "calc(100% - 1rem)" }}
          />
          <div className="space-y-8">
            {processSteps.map((step, i) => (
              <motion.div
                key={step.number}
                className="relative flex gap-5 pl-0"
                initial={reduce ? false : { opacity: 0, x: 16, scale: 0.94 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-white/15 bg-ink-900 font-mono text-sm text-violet-soft">
                  {step.number}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-semibold text-cloud">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-cloud-muted">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
