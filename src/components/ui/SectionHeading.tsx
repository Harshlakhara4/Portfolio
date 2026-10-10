import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
  /** Index number shown as a mono label, e.g. "02" */
  index?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  index,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {(eyebrow || index) && (
        <Reveal>
          <div
            className={cn(
              "mb-4 flex items-center gap-3",
              align === "center" && "justify-center",
            )}
          >
            {index && <span className="mono-label text-violet-soft">{index}</span>}
            {eyebrow && (
              <span className="mono-label flex items-center gap-2">
                <span className="h-px w-8 bg-gradient-to-r from-violet to-transparent" />
                {eyebrow}
              </span>
            )}
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="text-balance text-fluid-2xl font-semibold leading-[1.05] text-cloud">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="mt-5 text-pretty text-fluid-base leading-relaxed text-cloud-muted">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
