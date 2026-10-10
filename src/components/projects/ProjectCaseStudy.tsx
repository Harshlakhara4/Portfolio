"use client";

import Image from "next/image";
import {
  Check,
  ExternalLink,
  Github,
  MessageCircle,
  TrendingUp,
} from "lucide-react";
import type { Project } from "@/data/projects";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { ProjectVisual } from "./ProjectVisual";
import { statusStyles } from "./statusStyles";
import { buildWhatsAppLink } from "@/data/profile";
import { cn } from "@/lib/utils";

interface ProjectCaseStudyProps {
  project: Project;
  onClose: () => void;
}

export function ProjectCaseStudy({ project, onClose }: ProjectCaseStudyProps) {
  const whatsappLink = buildWhatsAppLink(
    `Hi Harsh, I viewed your ${project.title} project and would like to discuss a similar project.`,
  );

  return (
    <Modal onClose={onClose} label={`${project.title} case study`} size="xl">
      {/* Showcase image — shown at native aspect so nothing is cropped */}
      <div
        className="relative w-full bg-ink-900"
        style={{ aspectRatio: String(project.imageAspect) }}
      >
        <ProjectVisual
          project={project}
          priority
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1024px"
        />
      </div>

      {/* Body */}
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-2">
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
        <h2 className="mt-3 font-display text-3xl font-bold leading-tight text-cloud sm:text-4xl">
          {project.title}
        </h2>
        <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-cloud-muted">
          {project.shortDescription}
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          {/* Main column */}
          <div className="space-y-7">
            <Block title="Project overview">{project.overview}</Block>
            <Block title="Business context">{project.problem}</Block>
            <Block title="Solution &amp; approach">{project.solution}</Block>

            {/* Business value callout */}
            <div className="flex items-start gap-3 rounded-2xl border border-white/10 bg-gradient-to-br from-violet/10 to-sky/5 p-5">
              <TrendingUp className="mt-0.5 h-5 w-5 shrink-0 text-violet-soft" aria-hidden />
              <div>
                <p className="text-sm font-medium text-cloud">Business value</p>
                <p className="mt-1 text-sm leading-relaxed text-cloud-muted">
                  {project.businessValue}
                </p>
              </div>
            </div>

            {/* Optional screenshots */}
            {project.screenshots.length > 0 && (
              <div>
                <h3 className="mb-3 font-display text-lg font-semibold text-cloud">
                  Screens
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.screenshots.map((shot) => (
                    <div
                      key={shot.src}
                      className="relative aspect-video overflow-hidden rounded-xl border border-white/10"
                    >
                      <Image
                        src={shot.src}
                        alt={shot.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, 400px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="space-y-7">
            <div>
              <h3 className="mb-3 font-display text-lg font-semibold text-cloud">
                Selected features
              </h3>
              <ul className="space-y-2.5">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-cloud-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-violet-soft" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-display text-lg font-semibold text-cloud">
                Technology stack
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-cloud-muted"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Real links only */}
            {(project.liveUrl || project.repositoryUrl) && (
              <div className="flex flex-wrap gap-2">
                {project.liveUrl && (
                  <Button as="a" href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live Demo
                  </Button>
                )}
                {project.repositoryUrl && (
                  <Button as="a" href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                    <Github className="h-3.5 w-3.5" />
                    Source
                  </Button>
                )}
              </div>
            )}

            <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-violet/10 to-sky/5 p-5">
              <p className="text-sm text-cloud-muted">
                Want something similar for your business?
              </p>
              <Button
                as="a"
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                variant="whatsapp"
                size="sm"
                className="mt-3 w-full"
              >
                <MessageCircle className="h-4 w-4" />
                Discuss a Similar Project
              </Button>
            </div>
          </aside>
        </div>
      </div>
    </Modal>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="mb-2 font-display text-lg font-semibold text-cloud">
        {title}
      </h3>
      <p className="text-pretty leading-relaxed text-cloud-muted">{children}</p>
    </div>
  );
}
