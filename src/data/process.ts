export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the business, requirements, audience, and goals before anything is built.",
  },
  {
    number: "02",
    title: "Plan",
    description:
      "Define the scope, technical approach, milestones, and deliverables so expectations are clear.",
  },
  {
    number: "03",
    title: "Design & Build",
    description:
      "Develop the interface, backend, integrations, and the essential workflows that matter.",
  },
  {
    number: "04",
    title: "Test & Refine",
    description:
      "Validate functionality, responsiveness, error handling, and usability across devices.",
  },
  {
    number: "05",
    title: "Launch & Handover",
    description:
      "Deploy the solution, verify the production experience, and provide the agreed handover.",
  },
];
