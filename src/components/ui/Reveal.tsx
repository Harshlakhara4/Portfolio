"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger delay in seconds */
  delay?: number;
  /** Direction the element travels from */
  from?: "up" | "down" | "left" | "right" | "none";
  /** Render as a different element */
  as?: "div" | "li" | "span" | "section";
  /** Animate once (default) or every time it enters */
  once?: boolean;
}

/**
 * Scroll-triggered reveal. Uses opacity + transform only (cheap to animate),
 * and fully disables motion when the user prefers reduced motion — content is
 * always visible regardless of whether the animation runs.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  from = "up",
  as = "div",
  once = true,
}: RevealProps) {
  const reduce = useReducedMotion();

  const offset = 26;
  const initial =
    from === "up"
      ? { y: offset }
      : from === "down"
        ? { y: -offset }
        : from === "left"
          ? { x: offset }
          : from === "right"
            ? { x: -offset }
            : {};

  const variants: Variants = {
    hidden: { opacity: 0, scale: 0.92, ...initial },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={cn(className)}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.2, margin: "0px 0px -80px 0px" }}
    >
      {children}
    </MotionTag>
  );
}
