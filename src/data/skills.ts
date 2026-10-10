/**
 * SKILLS / TECH STACK
 * -----------------------------------------------------------------------------
 * Grouped by category. No arbitrary percentage bars — just honest grouping.
 * `icon` is a slug mapped to an inline brand-style glyph in SkillsSection.
 * Toggle `enabled` to hide a technology without deleting it.
 */

export interface Skill {
  name: string;
  /** slug used to pick the inline icon */
  icon: string;
  enabled: boolean;
}

export interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend Development",
    description: "Interfaces that are fast, responsive, and pleasant to use.",
    skills: [
      { name: "Next.js", icon: "nextjs", enabled: true },
      { name: "React", icon: "react", enabled: true },
      { name: "TypeScript", icon: "typescript", enabled: true },
      { name: "JavaScript", icon: "javascript", enabled: true },
      { name: "Tailwind CSS", icon: "tailwind", enabled: true },
      { name: "Redux", icon: "redux", enabled: true },
      { name: "HTML5", icon: "html", enabled: true },
      { name: "CSS3", icon: "css", enabled: true },
    ],
  },
  {
    title: "Backend Development",
    description: "APIs and server logic that power real business workflows.",
    skills: [
      { name: "Node.js", icon: "nodejs", enabled: true },
      { name: "Express.js", icon: "express", enabled: true },
      { name: "REST APIs", icon: "api", enabled: true },
      { name: "Python / FastAPI", icon: "python", enabled: true },
    ],
  },
  {
    title: "Databases",
    description: "Data modelled to stay reliable as the product grows.",
    skills: [
      { name: "MongoDB", icon: "mongodb", enabled: true },
      { name: "Mongoose", icon: "mongoose", enabled: true },
      { name: "Redis", icon: "redis", enabled: true },
    ],
  },
  {
    title: "Realtime Applications",
    description: "Live, event-driven features that feel instant.",
    skills: [{ name: "Socket.IO", icon: "socketio", enabled: true }],
  },
  {
    title: "Development Tools",
    description: "The tooling that keeps delivery clean and repeatable.",
    skills: [
      { name: "Git", icon: "git", enabled: true },
      { name: "GitLab", icon: "gitlab", enabled: true },
      { name: "Docker", icon: "docker", enabled: true },
    ],
  },
];
