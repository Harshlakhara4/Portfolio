/**
 * CENTRAL PROFILE CONFIGURATION
 * -----------------------------------------------------------------------------
 * Single source of truth for personal + contact details. Edit here to
 * personalise the whole site.
 *
 * Email note: `email` is intentionally optional. When it is `null`, every
 * email-specific CTA is hidden automatically and WhatsApp becomes the primary
 * channel. Set a real address later to switch email CTAs back on.
 */

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "whatsapp" | "twitter";
  enabled: boolean;
}

export interface Profile {
  name: string;
  wordmark: string;
  wordmarkShort: string;
  title: string;
  positioning: string;
  company: string;
  location: string;

  eyebrow: string;
  headline: string;
  subheadline: string;

  bio: string[];

  availabilityStatus: string;
  isAvailable: boolean;

  /** Optional email — null hides all email CTAs. */
  email: string | null;
  /** International format, digits only, for the wa.me link (e.g. 917357081980) */
  whatsappNumber: string;
  /** Pretty version shown in the UI */
  whatsappDisplay: string;
  /** Phone number, digits only (for tel: links) */
  phone: string;
  phoneDisplay: string;

  heroVideo: string;
  heroPoster: string;
  profileImage: string | null;
  ogImage: string;

  siteUrl: string;
  siteName: string;
  metaDescription: string;

  social: SocialLink[];
}

export const profile: Profile = {
  name: "Harsh Lakhara",
  wordmark: "HARSH.LAKHARA",
  wordmarkShort: "HL",
  title: "Full-Stack Developer",
  positioning:
    "I build modern websites, web applications, admin dashboards, and business automation systems.",
  company: "DexterDigi",
  location: "India",

  eyebrow: "INDEPENDENT FULL-STACK DEVELOPER",
  headline: "I Build Digital Experiences That Move Businesses Forward.",
  subheadline:
    "From high-converting websites to powerful web applications, I turn business ideas into reliable digital products.",

  bio: [
    "I'm Harsh Lakhara, a full-stack developer focused on building thoughtful digital products for businesses. I work across the frontend and backend, helping turn ideas into responsive websites, functional applications, and practical business systems.",
    "I care about clean architecture, useful user experiences, maintainable code, and delivering solutions that serve a real business purpose.",
  ],

  availabilityStatus: "Available for selected projects",
  isAvailable: true,

  // No public email configured yet — email CTAs stay hidden until this is set.
  email: null,
  whatsappNumber: "917357081980",
  whatsappDisplay: "+91 73570 81980",
  phone: "917357081980",
  phoneDisplay: "+91 73570 81980",

  heroVideo: "/videos/hero-loop.mp4",
  heroPoster: "/images/hero-poster.webp",
  profileImage: "/images/profile.jpg",
  ogImage: "/images/og-image.svg",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
    "https://harshlakhara.dev", // TODO: replace with your real domain
  siteName: "Harsh Lakhara — Full-Stack Developer",
  metaDescription:
    "Harsh Lakhara is an independent full-stack developer building high-converting websites, web applications, admin dashboards, and business automation systems with React, Next.js, and Node.js.",

  social: [
    {
      label: "GitHub",
      href: "https://github.com/Harshlakhara4",
      icon: "github",
      enabled: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/harsh-lakhara-981b6b361/",
      icon: "linkedin",
      enabled: true,
    },
  ],
};

/** The default prefilled WhatsApp message used by standalone WhatsApp CTAs. */
export const defaultInquiryMessage =
  "Hi Harsh, I visited your portfolio and would like to discuss a website or web application project.";

/** Build a properly-encoded WhatsApp deep link with an optional prefilled message. */
export function buildWhatsAppLink(message?: string): string {
  const base = `https://wa.me/${profile.whatsappNumber}`;
  const text = message ?? defaultInquiryMessage;
  return `${base}?text=${encodeURIComponent(text)}`;
}

/** Build a mailto link — returns null when no email is configured. */
export function buildMailtoLink(
  subject?: string,
  body?: string,
): string | null {
  if (!profile.email) return null;
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const qs = params.toString();
  return `mailto:${profile.email}${qs ? `?${qs}` : ""}`;
}
