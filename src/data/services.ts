/**
 * SERVICES DATA
 * -----------------------------------------------------------------------------
 * `id` values are used by Service CTAs to preselect the service in the
 * inquiry modal. Keep them stable.
 */

export interface Service {
  id: string;
  title: string;
  /** The target client's problem */
  forWho: string;
  /** Short solution framing */
  solution: string;
  deliverables: string[];
  /** lucide-react icon name resolved in ServicesSection */
  icon: "globe" | "layers" | "layout-dashboard" | "workflow";
}

export const services: Service[] = [
  {
    id: "business-websites",
    title: "Business Websites",
    forWho: "For businesses that need a professional online presence.",
    solution:
      "A fast, responsive website that clearly presents who you are and makes it easy for customers to reach you.",
    deliverables: [
      "Responsive website design and development",
      "Business information and service pages",
      "Contact forms and WhatsApp integration",
      "Basic on-page SEO",
      "Deployment and launch support",
    ],
    icon: "globe",
  },
  {
    id: "web-applications",
    title: "Full-Stack Web Applications",
    forWho: "For businesses that need more than a static website.",
    solution:
      "A custom application with a real backend, database, and the workflows your operations depend on.",
    deliverables: [
      "React or Next.js frontend",
      "Backend APIs",
      "Database design and integration",
      "Authentication and role-based access",
      "Business workflows and integrations",
    ],
    icon: "layers",
  },
  {
    id: "admin-dashboards",
    title: "Admin Panels & Dashboards",
    forWho: "For businesses that need to manage information and operations.",
    solution:
      "A clear interface to manage your data, with the search, filtering, and permissions a team actually needs.",
    deliverables: [
      "Data management interfaces",
      "CRUD workflows",
      "Search, filtering, and pagination",
      "Role-based permissions",
      "Reports and operational dashboards",
    ],
    icon: "layout-dashboard",
  },
  {
    id: "automation-improvements",
    title: "Automation & Website Improvements",
    forWho:
      "For businesses that want to reduce repetitive work or improve an existing system.",
    solution:
      "Targeted improvements and automation that make your existing product faster, cleaner, and less manual.",
    deliverables: [
      "API integrations",
      "Workflow improvements",
      "Bug fixes and performance improvements",
      "Selected automation workflows",
      "Maintenance and technical support",
    ],
    icon: "workflow",
  },
];
