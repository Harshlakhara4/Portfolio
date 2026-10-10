"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { ProjectCaseStudy } from "@/components/projects/ProjectCaseStudy";

export function ProjectsSection() {
  const [active, setActive] = useState<Project | null>(null);

  return (
    <section id="work" className="relative scroll-mt-20 overflow-x-clip py-16 sm:py-28">
      <div className="ambient left-[-10%] top-20 h-96 w-96 bg-violet/10" aria-hidden />

      <Container className="relative">
        <SectionHeading
          index="01"
          eyebrow="Selected Work"
          title="A closer look at the products I build."
          description="A selection of the digital products, platforms, and systems I've been building — presented honestly by their real stage of development."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={setActive}
              priority={i < 2}
            />
          ))}
        </div>
      </Container>

      {active && (
        <ProjectCaseStudy project={active} onClose={() => setActive(null)} />
      )}
    </section>
  );
}
