import {
  siNextdotjs,
  siReact,
  siTypescript,
  siJavascript,
  siTailwindcss,
  siRedux,
  siHtml5,
  siCss,
  siNodedotjs,
  siExpress,
  siMongodb,
  siMongoose,
  siRedis,
  siSocketdotio,
  siGit,
  siGitlab,
  siDocker,
  siPython,
} from "simple-icons";
import { Boxes } from "lucide-react";

interface SimpleIcon {
  title: string;
  hex: string;
  path: string;
}

const iconMap: Record<string, SimpleIcon | null> = {
  nextjs: siNextdotjs,
  react: siReact,
  typescript: siTypescript,
  javascript: siJavascript,
  tailwind: siTailwindcss,
  redux: siRedux,
  html: siHtml5,
  css: siCss,
  nodejs: siNodedotjs,
  express: siExpress,
  mongodb: siMongodb,
  mongoose: siMongoose,
  redis: siRedis,
  socketio: siSocketdotio,
  git: siGit,
  gitlab: siGitlab,
  docker: siDocker,
  python: siPython,
  api: null, // no brand icon — uses a generic glyph
};

/** Lighten brand colors that are near-black so they stay visible on dark UI. */
function displayHex(hex: string): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance < 0.22 ? "#E7E8EE" : `#${clean}`;
}

interface TechIconProps {
  slug: string;
  name: string;
  className?: string;
}

/**
 * Renders a recognizable brand glyph. Default color is muted; the brand color
 * is applied on hover via a CSS variable (set inline, read by an arbitrary
 * Tailwind value) so the whole set stays visually consistent until hovered.
 */
export function TechIcon({ slug, name, className }: TechIconProps) {
  const icon = iconMap[slug];

  if (!icon) {
    return (
      <Boxes
        className={className}
        aria-hidden
        strokeWidth={1.5}
      />
    );
  }

  return (
    <svg
      role="img"
      aria-label={name}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      style={{ ["--brand" as string]: displayHex(icon.hex) }}
    >
      <path d={icon.path} />
    </svg>
  );
}
