"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/data/nav";
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { useInquiry } from "@/components/providers/InquiryProvider";
import { scrollToSection, cn } from "@/lib/utils";

export function Navbar() {
  const reduce = useReducedMotion();
  const { open } = useInquiry();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Scroll state for background blur
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking
  useEffect(() => {
    const ids = [...navLinks.map((l) => l.target), "hero"];
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock scroll while the mobile menu is open
  useEffect(() => {
    if (menuOpen) document.body.classList.add("modal-open");
    else document.body.classList.remove("modal-open");
    return () => document.body.classList.remove("modal-open");
  }, [menuOpen]);

  // Escape closes the mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  function go(target: string) {
    setMenuOpen(false);
    scrollToSection(target);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <div
        className={cn(
          "transition-all duration-500 ease-premium",
          scrolled
            ? "border-b border-white/10 bg-ink-900/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-[72px]">
          {/* Wordmark */}
          <button
            onClick={() => go("hero")}
            className="group flex items-center gap-2 font-display text-sm font-bold tracking-tight text-cloud"
            aria-label={`${profile.name} — back to top`}
          >
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-violet to-sky text-xs font-bold text-white shadow-glow">
              {profile.wordmarkShort}
            </span>
            <span className="hidden sm:inline">
              {profile.wordmark.split(".")[0]}
              <span className="text-cloud-dim">.</span>
              <span className="text-cloud-muted">
                {profile.wordmark.split(".")[1]}
              </span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {navLinks.map((link) => {
              const isActive = active === link.target;
              return (
                <button
                  key={link.target}
                  onClick={() => go(link.target)}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    isActive
                      ? "text-cloud"
                      : "text-cloud-muted hover:text-cloud",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/8 ring-1 ring-white/10"
                      transition={{
                        duration: reduce ? 0 : 0.4,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-3">
            {profile.isAvailable && (
              <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-cloud-muted md:inline-flex">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-pulse-soft rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                </span>
                Available
              </span>
            )}

            <Button
              size="sm"
              className="hidden sm:inline-flex"
              onClick={() => open({ title: "Let's Work Together" })}
            >
              Let&apos;s Work Together
            </Button>

            {/* Mobile menu toggle */}
            <button
              ref={menuButtonRef}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-cloud lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </Container>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-b border-white/10 bg-ink-900/95 backdrop-blur-xl">
              <Container className="py-4">
                <nav className="flex flex-col" aria-label="Mobile">
                  {navLinks.map((link, i) => (
                    <motion.button
                      key={link.target}
                      onClick={() => go(link.target)}
                      className="flex items-center justify-between border-b border-white/5 py-3.5 text-left text-lg text-cloud"
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: reduce ? 0 : i * 0.05 }}
                    >
                      {link.label}
                      <span className="mono-label text-cloud-dim">
                        0{i + 1}
                      </span>
                    </motion.button>
                  ))}
                </nav>
                <Button
                  className="mt-5 w-full"
                  onClick={() => {
                    setMenuOpen(false);
                    open({ title: "Let's Work Together" });
                  }}
                >
                  Let&apos;s Work Together
                </Button>
              </Container>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
