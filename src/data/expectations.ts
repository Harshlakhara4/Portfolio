/**
 * "WHAT YOU CAN EXPECT"
 * -----------------------------------------------------------------------------
 * Shown INSTEAD of testimonials until genuine client feedback exists.
 * No invented client names, logos, photos, or quotes.
 */

export interface Expectation {
  title: string;
  description: string;
  icon: "message-circle" | "list-checks" | "code-2" | "smartphone" | "git-branch";
}

export const expectations: Expectation[] = [
  {
    title: "Transparent communication",
    description:
      "Clear updates, honest timelines, and no vague promises. You always know where the project stands.",
    icon: "message-circle",
  },
  {
    title: "Clearly defined scope",
    description:
      "We agree on what's included before work starts, so there are no surprises on either side.",
    icon: "list-checks",
  },
  {
    title: "Maintainable code",
    description:
      "Clean, well-structured code that you or another developer can build on later without pain.",
    icon: "code-2",
  },
  {
    title: "Responsive by default",
    description:
      "Every build is designed to work well on mobile, tablet, and desktop — not just one screen.",
    icon: "smartphone",
  },
  {
    title: "Structured delivery",
    description:
      "A defined process from discovery to handover keeps the project moving and accountable.",
    icon: "git-branch",
  },
];

/** Genuine testimonials go here once available — the UI renders them automatically. */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  // Add REAL testimonials here. Example shape:
  // { quote: "...", author: "Full Name", role: "Founder, Company" },
];
