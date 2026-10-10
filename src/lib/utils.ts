/** Tiny classnames helper (no external dependency). */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format an INR amount like 15000 -> "15,000". */
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat("en-IN").format(amount);
}

/** Smoothly scroll to a section id, respecting the sticky nav offset. */
export function scrollToSection(id: string): void {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id);
  if (!el) return;
  const prefersReduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  el.scrollIntoView({
    behavior: prefersReduced ? "auto" : "smooth",
    block: "start",
  });
}
