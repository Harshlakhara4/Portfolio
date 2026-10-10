import {
  MessageCircle,
  ListChecks,
  Code2,
  Smartphone,
  GitBranch,
  Quote,
  type LucideIcon,
} from "lucide-react";
import {
  expectations,
  testimonials,
  type Expectation,
} from "@/data/expectations";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const iconMap: Record<Expectation["icon"], LucideIcon> = {
  "message-circle": MessageCircle,
  "list-checks": ListChecks,
  "code-2": Code2,
  smartphone: Smartphone,
  "git-branch": GitBranch,
};

export function TestimonialsSection() {
  const hasTestimonials = testimonials.length > 0;

  return (
    <section
      id="trust"
      aria-label={hasTestimonials ? "Testimonials" : "What you can expect"}
      className="relative scroll-mt-20 py-16 sm:py-28"
    >
      <Container className="relative">
        {hasTestimonials ? (
          <>
            <SectionHeading
              index="08"
              eyebrow="Testimonials"
              title="What clients say."
              align="center"
              className="mx-auto"
            />
            <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={i} delay={i * 0.05}>
                  <figure className="flex h-full flex-col rounded-3xl border border-white/10 bg-ink-800/40 p-7">
                    <Quote className="h-7 w-7 text-violet-soft/60" aria-hidden />
                    <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-cloud/90">
                      &ldquo;{t.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 border-t border-white/5 pt-4">
                      <p className="font-medium text-cloud">{t.author}</p>
                      <p className="text-sm text-cloud-muted">{t.role}</p>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </>
        ) : (
          <>
            <SectionHeading
              index="08"
              eyebrow="What You Can Expect"
              title="How it feels to work together."
              description="No invented reviews here — just a clear, honest commitment to how every project is handled."
              align="center"
              className="mx-auto"
            />
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {expectations.map((item, i) => {
                const Icon = iconMap[item.icon];
                return (
                  <Reveal key={item.title} delay={i * 0.05}>
                    <div className="h-full rounded-3xl border border-white/10 bg-ink-800/40 p-7 transition-colors hover:border-white/20">
                      <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet/20 to-sky/10 text-violet-soft">
                        <Icon className="h-5 w-5" aria-hidden />
                      </div>
                      <h3 className="font-display text-lg font-semibold text-cloud">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-cloud-muted">
                        {item.description}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </>
        )}
      </Container>
    </section>
  );
}
