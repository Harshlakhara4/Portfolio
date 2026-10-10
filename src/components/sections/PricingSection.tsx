"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, ArrowRight, Sparkles, X } from "lucide-react";
import { pricingPackages, pricingNote } from "@/data/pricing";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { formatPrice, cn } from "@/lib/utils";

export function PricingSection() {
  const { open } = useInquiry();
  const reduce = useReducedMotion();

  return (
    <section
      id="pricing"
      className="relative scroll-mt-20 bg-ink-800/30 py-16 sm:py-28"
    >
      <Container className="relative">
        <SectionHeading
          index="07"
          eyebrow="Pricing"
          title="Clear starting points."
          description="Affordable, transparent starting prices to help you plan. These are examples, not fixed quotes — the final cost always depends on the confirmed scope."
        />

        <div className="mt-14 grid items-stretch gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {pricingPackages.map((pkg, i) => (
            <motion.div
              key={pkg.id}
              initial={reduce ? false : { opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "relative flex flex-col rounded-3xl border p-6 transition-colors",
                pkg.highlighted
                  ? "border-violet/40 bg-gradient-to-b from-violet/10 to-ink-800/60 shadow-glow"
                  : "border-white/10 bg-ink-800/40 hover:border-white/20",
              )}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-6 inline-flex items-center gap-1.5 rounded-full border border-violet/40 bg-ink-900 px-3 py-1 text-[0.7rem] font-medium text-violet-soft">
                  <Sparkles className="h-3 w-3" aria-hidden />
                  Most popular
                </span>
              )}

              <h3 className="font-display text-lg font-semibold text-cloud">
                {pkg.name}
              </h3>
              <p className="mt-1.5 min-h-[2.5rem] text-sm text-cloud-muted">
                {pkg.tagline}
              </p>

              <div className="mt-5">
                {pkg.startsAt && (
                  <span className="block text-xs text-cloud-dim">Starting at</span>
                )}
                <span className="font-display text-3xl font-bold text-cloud">
                  {pkg.currency}
                  {formatPrice(pkg.startingPrice)}
                </span>
              </div>

              {/* Deliverables */}
              <ul className="mt-5 grid gap-2">
                {pkg.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-cloud-muted"
                  >
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        pkg.highlighted ? "text-violet-soft" : "text-sky-soft",
                      )}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Revisions */}
              <p className="mt-4 rounded-lg border border-white/8 bg-white/[0.02] px-3 py-2 text-xs text-cloud-muted">
                <span className="text-cloud">Revisions:</span> {pkg.revisions}
              </p>

              {/* Exclusions */}
              <div className="mt-3">
                <p className="mb-1.5 text-[0.7rem] uppercase tracking-wider text-cloud-dim">
                  Not included
                </p>
                <ul className="grid gap-1">
                  {pkg.exclusions.map((ex) => (
                    <li
                      key={ex}
                      className="flex items-start gap-2 text-xs text-cloud-dim"
                    >
                      <X className="mt-0.5 h-3 w-3 shrink-0 text-cloud-dim/70" aria-hidden />
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={pkg.highlighted ? "primary" : "secondary"}
                className="mt-6 w-full"
                size="sm"
                onClick={() => open({ pkg: pkg.id, title: `Start: ${pkg.name}` })}
              >
                Get a Custom Quote
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </motion.div>
          ))}
        </div>

        <p className="mx-auto mt-10 max-w-3xl text-center text-sm leading-relaxed text-cloud-dim">
          {pricingNote}
        </p>
      </Container>
    </section>
  );
}
