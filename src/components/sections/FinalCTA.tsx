"use client";

import { ArrowRight, MessageCircle } from "lucide-react";
import { profile, buildWhatsAppLink } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { useInquiry } from "@/components/providers/InquiryProvider";

const whatsappLink = buildWhatsAppLink(
  `Hi ${profile.name.split(" ")[0]}, let's build something. I'd like to discuss a project.`,
);

export function FinalCTA() {
  const { open } = useInquiry();

  return (
    <section className="relative overflow-hidden py-16 sm:py-28">
      <div className="ambient left-1/2 top-1/2 h-[30rem] w-[55rem] -translate-x-1/2 -translate-y-1/2 bg-violet/15" aria-hidden />
      <Container className="relative">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-ink-700 to-ink-900 px-6 py-16 text-center sm:px-16 sm:py-24">
          <div className="absolute inset-0 bg-dotgrid opacity-50" aria-hidden />
          <div className="ambient right-[-10%] top-[-30%] h-72 w-72 bg-sky/20" aria-hidden />

          <div className="relative mx-auto max-w-3xl">
            <Reveal>
              <h2 className="text-balance font-display text-fluid-2xl font-bold leading-[1.05] text-cloud">
                Let&apos;s build something{" "}
                <span className="text-gradient-accent">valuable.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mx-auto mt-5 max-w-xl text-pretty text-fluid-base leading-relaxed text-cloud-muted">
                If you have an idea, a business problem, or an existing product
                that needs improvement, let&apos;s talk.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button size="lg" onClick={() => open({ title: "Start a Project" })}>
                  Start a Project
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
                <Button
                  as="a"
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="whatsapp"
                  size="lg"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden />
                  Connect on WhatsApp
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
