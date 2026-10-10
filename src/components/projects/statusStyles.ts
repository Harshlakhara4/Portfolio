import type { ProjectStatus } from "@/data/projects";

export const statusStyles: Record<ProjectStatus, string> = {
  Live: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  "In Development": "border-amber-400/30 bg-amber-400/10 text-amber-200",
  "Case Study": "border-sky/30 bg-sky/10 text-sky-soft",
  Concept: "border-violet/30 bg-violet/10 text-violet-soft",
};
