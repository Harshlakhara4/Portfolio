"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  Globe,
  Layers,
  LayoutDashboard,
  Workflow,
  ArrowRight,
  Check,
  type LucideIcon,
} from "lucide-react";
import { services, type Service } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useInquiry } from "@/components/providers/InquiryProvider";

const iconMap: Record<Service["icon"], LucideIcon> = {
  globe: Globe,
  layers: Layers,
  "layout-dashboard": LayoutDashboard,
  workflow: Workflow,
};

export function ServicesSection() {
  const { open } = useInquiry();
  const reduce = useReducedMotion();

  return (
    <section
      id="services"
      className="relative scroll-mt-20 overflow-x-clip bg-ink-800/30 py-16 sm:py-28"
    >
      <div className="ambient right-[-5%] top-32 h-96 w-96 bg-sky/10" aria-hidden />
      <Container className="relative">
        <SectionHeading
          index="05"
          eyebrow="Services"
          title="How I can help your business."
          description="Four ways I typically work with clients — from a first website to a full application and ongoing improvements."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <motion.div
                key={service.id}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-800/40 p-7 transition-colors hover:border-white/20"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/20 to-sky/10 text-violet-soft">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>

                <h3 className="font-display text-xl font-semibold text-cloud">
                  {service.title}
                </h3>
                <p className="mt-2 text-sm text-cloud-muted">{service.forWho}</p>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-cloud/80">
                  {service.solution}
                </p>

                <ul className="mt-5 grid gap-2">
                  {service.deliverables.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-sm text-cloud-muted"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-sky-soft" aria-hidden />
                      {d}
                    </li>
                  ))}
                </ul>

                <button
                  type="button"
                  onClick={() =>
                    open({
                      service: service.id,
                      title: `Discuss: ${service.title}`,
                    })
                  }
                  className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-cloud transition-colors hover:text-violet-soft"
                >
                  Discuss This Service
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
