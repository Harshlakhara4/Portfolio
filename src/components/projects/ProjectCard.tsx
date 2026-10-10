"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "./ProjectVisual";
import { statusStyles } from "./statusStyles";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  onOpen: (project: Project) => void;
  priority?: boolean;
}

export function ProjectCard({ project, onOpen, priority }: ProjectCardProps) {
  const reduce = useReducedMotion();

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 28, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-ink-800/50 transition-colors duration-500 hover:border-white/20"
    >
      {/* Visual */}
      <button
        type="button"
        onClick={() => onOpen(project)}
        aria-label={`Explore project: ${project.title}`}
        className="relative block w-full overflow-hidden text-left"
      >
        <div className="relative" style={{ aspectRatio: String(project.imageAspect) }}>
          <ProjectVisual project={project} priority={priority} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-900/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </div>
      </button>

      {/* Body */}
      <div className="flex flex-1 flex-col p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="mono-label !text-cloud-muted">{project.category}</span>
          <span
            className={cn(
              "rounded-full border px-2.5 py-0.5 text-[0.68rem] font-medium",
              statusStyles[project.status],
            )}
          >
            {project.status}
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-cloud sm:text-2xl">
          {project.title}
        </h3>
        <p className="mt-2 text-pretty text-sm leading-relaxed text-cloud-muted">
          {project.shortDescription}
        </p>

        {/* Tech chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-white/10 bg-white/[0.03] px-2 py-1 text-[0.7rem] text-cloud-muted"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/5 pt-4">
          <button
            type="button"
            onClick={() => onOpen(project)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-cloud transition-colors hover:text-violet-soft"
          >
            Explore Project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Only render real links */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-cloud-muted transition-colors hover:text-cloud"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Live Demo
            </a>
          )}
          {project.repositoryUrl && (
            <a
              href={project.repositoryUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-cloud-muted transition-colors hover:text-cloud"
            >
              <Github className="h-3.5 w-3.5" />
              Source
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
