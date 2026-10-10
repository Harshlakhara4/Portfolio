/**
 * PROJECT SHOWCASE DATA
 * -----------------------------------------------------------------------------
 * Each entry is presented honestly as a case study / concept — no invented
 * clients, live URLs, revenue, or user counts.
 *
 * - `image` points to the supplied showcase banner in /public/images/projects.
 *   `imageAspect` (width / height) renders it at its native ratio so the
 *   baked-in artwork/text is never cropped and there is no layout shift.
 * - `liveUrl` / `repositoryUrl` are null until a verified link exists — the
 *   corresponding button is then simply not rendered (no broken buttons).
 * - `technologies` reflect the stack typically used for these builds; treat as
 *   configurable draft data and adjust per project when confirmed.
 */

export type ProjectStatus = "Live" | "In Development" | "Case Study" | "Concept";

export interface ProjectImage {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  /** Concise card copy */
  shortDescription: string;
  /** Narrative project summary */
  overview: string;
  /** Business context / problem */
  problem: string;
  /** Solution & product approach */
  solution: string;
  /** One-line business value */
  businessValue: string;
  /** Selected features (shown where implemented) */
  features: string[];
  /** Configurable draft tech stack */
  technologies: string[];
  status: ProjectStatus;
  featured: boolean;
  accent: "violet" | "sky" | "mixed";
  /** Primary showcase image (in /public) or null for a generated preview */
  image: string | null;
  imageAlt: string;
  /** width / height — rendered as the media container's aspect-ratio */
  imageAspect: number;
  /** CSS object-position for any crop */
  imagePosition?: string;
  /** Real public links only — null hides the button */
  liveUrl: string | null;
  repositoryUrl: string | null;
  /** Optional additional screenshots for the case-study gallery */
  screenshots: ProjectImage[];
}

export const projects: Project[] = [
  {
    id: "ecommerce-website",
    slug: "ecommerce-website",
    title: "E-commerce Website",
    category: "E-commerce & Online Retail",
    shortDescription:
      "An intuitive online shopping experience built around product discovery, streamlined browsing, and a modern storefront.",
    overview:
      "A modern e-commerce website concept focused on an attractive, responsive online shopping experience — with intuitive product discovery, organized product categories, rich product details, and a streamlined purchasing journey that moves customers smoothly toward checkout.",
    problem:
      "Businesses need a digital storefront that organizes a growing product catalog and guides customers from discovery to checkout without a cluttered or confusing experience.",
    solution:
      "A responsive storefront with organized categories, detailed product pages, search and filtering, a shopping cart, and a streamlined checkout flow — supported by admin-side product, inventory, and pricing management.",
    businessValue:
      "Shows how a digital storefront can organize a product catalog, simplify discovery, and support a convenient shopping experience.",
    features: [
      "Product listing and product details",
      "Product categories",
      "Product search and filtering",
      "Shopping cart",
      "Checkout workflow",
      "Order management",
      "Customer account functionality",
      "Admin product management",
      "Inventory and pricing management",
      "Responsive mobile shopping experience",
    ],
    technologies: ["Next.js", "React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    status: "Case Study",
    featured: true,
    accent: "violet",
    image: "/images/projects/ecommerce-website.png",
    imageAlt:
      "E-commerce website and admin system showcase — storefront, mobile app, seller and delivery panels.",
    imageAspect: 1774 / 887,
    imagePosition: "center",
    liveUrl: null,
    repositoryUrl: null,
    screenshots: [],
  },
  {
    id: "pet-store",
    slug: "pet-store-platform",
    title: "Pet Store Platform",
    category: "Pet Care, E-commerce & Service Booking",
    shortDescription:
      "A pet-care platform concept combining online shopping, service discovery, and appointment management.",
    overview:
      "A pet-focused platform concept that brings pet products, service discovery, appointment booking, and veterinary availability into one experience. Alongside shopping, it includes a concept for service booking and an admin system for managing service categories, appointments, and availability.",
    problem:
      "Pet owners often juggle separate places to buy products and to book grooming or veterinary care. A pet business needs one place that brings shopping and service workflows together.",
    solution:
      "A pet product catalog with categories and details, cart and order workflow, plus pet-care service discovery, appointment booking, booking management, and veterinary availability — all manageable from an admin dashboard.",
    businessValue:
      "Explores how a pet business can bring product discovery and service workflows together in a more convenient digital experience.",
    features: [
      "Pet product catalog",
      "Product categories and product details",
      "Shopping cart and order workflow",
      "Pet-care services",
      "Service category management",
      "Appointment booking (concept)",
      "Booking management",
      "Veterinary availability information",
      "Admin dashboard",
      "Responsive customer-facing interface",
    ],
    technologies: ["Next.js", "React", "Node.js", "MongoDB", "Mongoose", "Tailwind CSS"],
    status: "Case Study",
    featured: true,
    accent: "sky",
    image: "/images/projects/pet-store.png",
    imageAlt:
      "Pet Store mobile app and admin panel showcase — shop, vet booking, and dashboard screens.",
    imageAspect: 1774 / 887,
    imagePosition: "center",
    liveUrl: null,
    repositoryUrl: null,
    screenshots: [],
  },
  {
    id: "vsmark-grocery",
    slug: "vs-mark-grocery-app",
    title: "VS Mark — Grocery App",
    category: "Grocery Commerce & Retail Technology",
    shortDescription:
      "A grocery commerce experience designed to make discovering everyday essentials and placing orders simple.",
    overview:
      "VS Mark is a grocery-focused project intended to make everyday shopping more convenient. Customers can discover grocery products, explore categories, manage their selections, and move through an ordering workflow — presented as a distinct grocery commerce experience rather than a generic store.",
    problem:
      "Everyday grocery shopping means many small, repeat purchases. Customers need fast browsing, clear categories, and a simple ordering flow for daily essentials.",
    solution:
      "A grocery-first interface with organized categories, product search, product details and pricing, a cart with quantity management, and a checkout / order-placement workflow — plus admin product, category, and inventory management.",
    businessValue:
      "Demonstrates an approach to simplifying grocery discovery and online ordering for everyday shopping needs.",
    features: [
      "Grocery product catalog",
      "Grocery categories",
      "Product search",
      "Product details and pricing",
      "Shopping cart",
      "Quantity management",
      "Checkout and order placement",
      "Order status / history",
      "Admin product and category management",
      "Inventory management",
      "Mobile-friendly shopping experience",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
    status: "Case Study",
    featured: false,
    accent: "mixed",
    image: "/images/projects/vsmark-grocery.png",
    imageAlt:
      "VS Mark grocery app and admin panel showcase — mobile shopping, order tracking, and dashboard.",
    imageAspect: 1774 / 887,
    imagePosition: "center",
    liveUrl: null,
    repositoryUrl: null,
    screenshots: [],
  },
  {
    id: "oneside-taxi",
    slug: "one-side-taxi",
    title: "One Side Taxi",
    category: "Mobility, Transportation & Booking Systems",
    shortDescription:
      "A route-based taxi booking platform concept with flexible vehicle and seat reservation workflows.",
    overview:
      "One Side Taxi focuses on making intercity taxi discovery and booking more straightforward. Customers can search for travel options by route and date, explore available services, and proceed with the relevant booking workflow. The project also explores two booking models — reserving an entire vehicle and reserving individual seats — depending on the configured service and availability rules.",
    problem:
      "Booking an intercity taxi often means phone calls and unclear pricing. Travelers need a clear way to search by route and date and choose how they want to book.",
    solution:
      "Route-based search with travel-date selection, one-way booking, and configurable vehicle-based or seat-based reservation workflows governed by availability and time-window rules — with admin-side taxi, driver, and booking management.",
    businessValue:
      "Demonstrates a transportation booking workflow with configurable booking options and route-oriented discovery.",
    features: [
      "Route-based taxi search",
      "Travel-date selection",
      "One-way taxi booking",
      "Round-trip / airport / rental services (where supported)",
      "Vehicle-based booking",
      "Seat-based booking",
      "Booking availability and time-window rules",
      "Trip and booking management",
      "Taxi and driver management",
      "Administrative booking workflows",
      "Responsive booking interface",
    ],
    technologies: ["React", "Node.js", "Express", "MongoDB", "REST APIs"],
    status: "Case Study",
    featured: false,
    accent: "violet",
    image: "/images/projects/oneside-taxi.png",
    imageAlt:
      "One Side Taxi booking platform showcase — route selection, trip steps, and booking interface.",
    imageAspect: 1536 / 1024,
    imagePosition: "center",
    liveUrl: null,
    repositoryUrl: null,
    screenshots: [],
  },
];
