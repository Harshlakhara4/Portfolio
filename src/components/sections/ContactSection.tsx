import { MessageCircle, MapPin, Clock, Github, Linkedin, Phone } from "lucide-react";
import { profile, buildWhatsAppLink } from "@/data/profile";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";

const whatsappDefault = buildWhatsAppLink();
const github = profile.social.find((s) => s.icon === "github" && s.enabled);
const linkedin = profile.social.find((s) => s.icon === "linkedin" && s.enabled);

export function ContactSection() {
  return (
    <section id="contact" className="relative scroll-mt-20 overflow-x-clip py-16 sm:py-28">
      <div className="ambient left-1/2 top-0 h-96 w-[40rem] -translate-x-1/2 bg-violet/10" aria-hidden />
      <Container className="relative">
        <SectionHeading
          index="10"
          eyebrow="Contact"
          title="Have a project in mind?"
          description="Tell me what you're building. Let's discuss the right solution for your business."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          {/* Left: direct channels */}
          <div className="space-y-4">
            <Reveal>
              <a
                href={whatsappDefault}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/40 p-5 transition-colors hover:border-[#25D366]/40 hover:bg-[#25D366]/5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#25D366]/15 text-[#25D366]">
                  <MessageCircle className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-cloud">WhatsApp</p>
                  <p className="truncate text-sm text-cloud-muted">
                    Fastest way to reach me — {profile.whatsappDisplay}
                  </p>
                </div>
              </a>
            </Reveal>

            <Reveal delay={0.05}>
              <a
                href={`tel:+${profile.phone}`}
                className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-ink-800/40 p-5 transition-colors hover:border-violet/40 hover:bg-violet/5"
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-violet/15 text-violet-soft">
                  <Phone className="h-5 w-5" aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-cloud">Call</p>
                  <p className="truncate text-sm text-cloud-muted">
                    {profile.phoneDisplay}
                  </p>
                </div>
              </a>
            </Reveal>

            {/* Professional links */}
            {(github || linkedin) && (
              <Reveal delay={0.1}>
                <div className="flex gap-4">
                  {linkedin && (
                    <a
                      href={linkedin.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:border-white/25"
                    >
                      <Linkedin className="h-5 w-5 shrink-0 text-sky-soft" aria-hidden />
                      <span className="text-sm text-cloud">LinkedIn</span>
                    </a>
                  )}
                  {github && (
                    <a
                      href={github.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition-colors hover:border-white/25"
                    >
                      <Github className="h-5 w-5 shrink-0 text-cloud" aria-hidden />
                      <span className="text-sm text-cloud">GitHub</span>
                    </a>
                  )}
                </div>
              </Reveal>
            )}

            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <MapPin className="h-5 w-5 shrink-0 text-cloud-muted" aria-hidden />
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-wider text-cloud-dim">
                      Based in
                    </p>
                    <p className="text-sm text-cloud">{profile.location}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
                  <Clock className="h-5 w-5 shrink-0 text-cloud-muted" aria-hidden />
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-wider text-cloud-dim">
                      Availability
                    </p>
                    <p className="text-sm text-cloud">
                      {profile.isAvailable ? "Open to projects" : "Currently full"}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 text-sm leading-relaxed text-cloud-muted">
                Prefer the form? Fill it in and I&apos;ll reply on WhatsApp. The
                more context you share about your goals and requirements, the
                more useful my first response will be.
              </p>
            </Reveal>
          </div>

          {/* Right: form */}
          <Reveal from="right" delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-ink-800/50 p-6 sm:p-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
