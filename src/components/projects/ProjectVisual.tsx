import Image from "next/image";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const accentMap = {
  violet: {
    from: "from-violet/30",
    via: "via-violet/10",
    ring: "ring-violet/20",
    text: "text-violet-soft",
    bar: "bg-violet/60",
  },
  sky: {
    from: "from-sky/30",
    via: "via-sky/10",
    ring: "ring-sky/20",
    text: "text-sky-soft",
    bar: "bg-sky/60",
  },
  mixed: {
    from: "from-violet/30",
    via: "via-sky/10",
    ring: "ring-white/15",
    text: "text-cloud",
    bar: "bg-gradient-to-r from-violet to-sky",
  },
} as const;

interface ProjectVisualProps {
  project: Project;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Renders the supplied showcase image when `project.image` is set, otherwise a
 * tasteful, clearly-abstract preview (never a misleading stock photo). The
 * parent sets the aspect ratio (from `project.imageAspect`) so the image shows
 * at its native ratio — no cropping of baked-in artwork, no layout shift.
 */
export function ProjectVisual({
  project,
  priority,
  className,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px",
}: ProjectVisualProps) {
  const accent = accentMap[project.accent];

  if (project.image) {
    return (
      <div className={cn("relative h-full w-full overflow-hidden bg-ink-900", className)}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes={sizes}
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.03]"
          style={{ objectPosition: project.imagePosition ?? "center" }}
          priority={priority}
        />
      </div>
    );
  }

  // --- Generated abstract preview (fallback when no image is supplied) ---
  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden bg-ink-800 bg-dotgrid",
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br to-transparent opacity-80",
          accent.from,
          accent.via,
        )}
      />
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div
          className={cn(
            "w-full max-w-[82%] rounded-xl border border-white/10 bg-ink-900/70 p-3 shadow-card ring-1 transition-transform duration-700 ease-premium group-hover:-translate-y-1 group-hover:scale-[1.02]",
            accent.ring,
          )}
        >
          <div className="mb-3 flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-2 h-2 w-20 rounded-full bg-white/10" />
          </div>
          <div className="flex gap-2">
            <div className="hidden w-1/4 flex-col gap-1.5 sm:flex">
              <span className="h-2 rounded bg-white/10" />
              <span className="h-2 w-4/5 rounded bg-white/5" />
              <span className="h-2 w-3/5 rounded bg-white/5" />
              <span className="h-2 w-4/5 rounded bg-white/5" />
            </div>
            <div className="flex-1 space-y-2">
              <div className={cn("h-7 w-2/3 rounded-md", accent.bar)} />
              <div className="grid grid-cols-3 gap-2">
                <span className="h-10 rounded-md bg-white/5" />
                <span className="h-10 rounded-md bg-white/5" />
                <span className="h-10 rounded-md bg-white/5" />
              </div>
              <span className="block h-2 w-full rounded bg-white/5" />
              <span className="block h-2 w-5/6 rounded bg-white/5" />
            </div>
          </div>
        </div>
      </div>
      <span
        className={cn(
          "absolute bottom-3 right-4 font-display text-5xl font-bold opacity-10",
          accent.text,
        )}
      >
        {project.title.charAt(0)}
      </span>
    </div>
  );
}
