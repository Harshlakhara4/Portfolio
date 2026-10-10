import { skillCategories } from "@/data/skills";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TechIcon } from "./TechIcon";

export function SkillsSection() {
  return (
    <section id="skills" className="relative scroll-mt-20 py-16 sm:py-28">
      <Container className="relative">
        <SectionHeading
          index="04"
          eyebrow="Tech Stack"
          title="Built with the right tools."
          description="The technologies I reach for, grouped by where they fit. No invented expertise percentages — just the stack I genuinely work with."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, i) => (
            <Reveal key={category.title} delay={0.05 * i}>
              <div className="h-full rounded-3xl border border-white/10 bg-ink-800/40 p-6">
                <h3 className="font-display text-lg font-semibold text-cloud">
                  {category.title}
                </h3>
                <p className="mt-1.5 text-sm leading-relaxed text-cloud-muted">
                  {category.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2.5">
                  {category.skills
                    .filter((s) => s.enabled)
                    .map((skill) => (
                      <div
                        key={skill.name}
                        className="group inline-flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] px-3 py-2 transition-colors hover:border-white/20 hover:bg-white/[0.05]"
                      >
                        <TechIcon
                          slug={skill.icon}
                          name={skill.name}
                          className="h-4 w-4 text-cloud-muted transition-colors group-hover:[color:var(--brand)]"
                        />
                        <span className="text-sm text-cloud-muted transition-colors group-hover:text-cloud">
                          {skill.name}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
