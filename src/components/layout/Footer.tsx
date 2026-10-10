"use client";

import { Github, Linkedin, Mail, ArrowUp, type LucideIcon } from "lucide-react";
import { profile, buildWhatsAppLink } from "@/data/profile";
import { navLinks } from "@/data/nav";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { scrollToSection } from "@/lib/utils";

const socialIconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  mail: Mail,
};

export function Footer() {
  const year = new Date().getFullYear();
  const social = profile.social.filter((s) => s.enabled && socialIconMap[s.icon]);

  return (
    <footer className="relative border-t border-white/10 bg-ink-900">
      <Container className="py-14">
        <Reveal>
          <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-2 font-display text-sm font-bold tracking-tight text-cloud"
              aria-label={`${profile.name} — back to top`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet to-sky text-xs font-bold text-white">
                {profile.wordmarkShort}
              </span>
              {profile.wordmark}
            </button>
            <p className="mt-4 text-sm leading-relaxed text-cloud-muted">
              {profile.positioning}
            </p>
            <div className="mt-5 flex gap-2.5">
              {social.map((s) => {
                const Icon = socialIconMap[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.icon === "mail" ? undefined : "_blank"}
                    rel={s.icon === "mail" ? undefined : "noopener noreferrer"}
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-cloud-muted transition-colors hover:border-white/25 hover:bg-white/5 hover:text-cloud"
                  >
                    <Icon className="h-4 w-4" aria-hidden />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <p className="mono-label mb-4">Navigate</p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.target}>
                  <button
                    onClick={() => scrollToSection(link.target)}
                    className="text-sm text-cloud-muted transition-colors hover:text-cloud"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="mono-label mb-4">Get in touch</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cloud-muted transition-colors hover:text-cloud"
                >
                  WhatsApp — {profile.whatsappDisplay}
                </a>
              </li>
              {profile.email && (
                <li>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-cloud-muted transition-colors hover:text-cloud"
                  >
                    {profile.email}
                  </a>
                </li>
              )}
              <li className="text-cloud-muted">{profile.location}</li>
              {profile.isAvailable && (
                <li className="inline-flex items-center gap-2 text-cloud-muted">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  {profile.availabilityStatus}
                </li>
              )}
            </ul>
          </div>
          </div>
        </Reveal>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 sm:flex-row">
          <p className="text-xs text-cloud-dim">
            © {year} {profile.name}. All rights reserved.
          </p>
          <button
            onClick={() => scrollToSection("hero")}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-xs text-cloud-muted transition-colors hover:border-white/25 hover:text-cloud"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5" aria-hidden />
          </button>
        </div>
      </Container>
    </footer>
  );
}
