import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
}

/**
 * Consistent horizontal gutters + max width. 16px gutter on phones, growing on
 * larger screens, capped so line length stays readable.
 */
export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return (
    <Tag className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10", className)}>
      {children}
    </Tag>
  );
}
