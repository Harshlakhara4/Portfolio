/**
 * PRICING / PROJECT PACKAGES
 * -----------------------------------------------------------------------------
 * Editable INR example starting prices — not binding quotes. `id` values are
 * used by pricing CTAs to preselect the package in the inquiry modal.
 */

export interface PricingPackage {
  id: string;
  name: string;
  /** Numeric starting price (INR) */
  startingPrice: number;
  currency: string;
  /** "Starting at" wording vs a flat example price */
  startsAt: boolean;
  /** Who it's for */
  tagline: string;
  /** Included deliverables (page/feature limits folded in where relevant) */
  deliverables: string[];
  /** Revision allowance */
  revisions: string;
  /** What is not included */
  exclusions: string[];
  /** Subtle emphasis on one package */
  highlighted: boolean;
}

export const pricingNote =
  "All prices are indicative starting points, not fixed quotes. The final price depends on the confirmed scope, number of pages, and complexity. Domain, hosting, paid third-party services, and ongoing maintenance may cost extra. Complex applications are quoted individually — they can't always be delivered at the minimum displayed price.";

export const pricingPackages: PricingPackage[] = [
  {
    id: "landing-page",
    name: "Landing Page",
    startingPrice: 3999,
    currency: "₹",
    startsAt: false,
    tagline: "For a focused, single-page presence or a specific offer.",
    deliverables: [
      "One responsive page",
      "Business introduction section",
      "Services or offer section",
      "Contact details + WhatsApp CTA",
      "Basic on-page SEO",
    ],
    revisions: "2 revision rounds",
    exclusions: [
      "Multi-page content",
      "Backend or database",
      "Copywriting & logo design",
    ],
    highlighted: false,
  },
  {
    id: "business-website",
    name: "Business Website",
    startingPrice: 7999,
    currency: "₹",
    startsAt: false,
    tagline: "For small businesses needing a complete online presence.",
    deliverables: [
      "Up to 5 pages",
      "Responsive design",
      "Essential business information & services",
      "Contact functionality + WhatsApp integration",
      "Basic SEO foundations",
    ],
    revisions: "2 revision rounds",
    exclusions: [
      "Custom web-app features",
      "Backend workflows / authentication",
      "Paid integrations",
    ],
    highlighted: false,
  },
  {
    id: "growth-website",
    name: "Growth Website",
    startingPrice: 12999,
    currency: "₹",
    startsAt: false,
    tagline: "For businesses ready to generate and capture more leads.",
    deliverables: [
      "Up to 8 pages",
      "More customised design",
      "Restrained, tasteful animations",
      "Lead-capture functionality",
      "Agreed third-party integrations",
    ],
    revisions: "2 revision rounds",
    exclusions: [
      "Full custom application logic",
      "Complex dashboards",
      "Paid service subscriptions",
    ],
    highlighted: true,
  },
  {
    id: "custom-web-app",
    name: "Custom Web Application",
    startingPrice: 24999,
    currency: "₹",
    startsAt: true,
    tagline: "For products needing real backend functionality & workflows.",
    deliverables: [
      "Custom frontend",
      "Backend / API development",
      "Database design & integration",
      "Agreed business workflows",
      "Auth, dashboards & integrations when quoted",
    ],
    revisions: "Revision scope agreed per milestone",
    exclusions: [
      "Features not covered in the quotation",
      "Ongoing maintenance (optional add-on)",
      "Paid infrastructure & services",
    ],
    highlighted: false,
  },
];
