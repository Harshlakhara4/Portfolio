export interface NavLink {
  label: string;
  /** Section id to scroll to (without the leading #) */
  target: string;
}

export const navLinks: NavLink[] = [
  { label: "Work", target: "work" },
  { label: "About", target: "about" },
  { label: "Services", target: "services" },
  { label: "Process", target: "process" },
  { label: "Pricing", target: "pricing" },
  { label: "Contact", target: "contact" },
];
