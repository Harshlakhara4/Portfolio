"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  onClose: () => void;
  label: string;
  children: React.ReactNode;
  className?: string;
  /** Max width utility class */
  size?: "md" | "lg" | "xl";
}

const sizeMap = {
  md: "sm:max-w-2xl",
  lg: "sm:max-w-3xl",
  xl: "sm:max-w-5xl",
};

/**
 * Accessible dialog primitive: portal, backdrop click + Escape to close,
 * focus trap, focus restore, and body scroll lock.
 *
 * Responsive behavior:
 * - Mobile: a near-full-height bottom sheet capped to the dynamic viewport
 *   (`dvh`), so it survives the mobile keyboard / browser chrome. Content
 *   scrolls INSIDE the panel; the close button stays pinned and visible.
 * - Desktop: a centered dialog capped to the viewport with internal scroll.
 * Entrance/exit animations collapse to a fade under reduced motion.
 */
export function Modal({
  onClose,
  label,
  children,
  className,
  size = "lg",
}: ModalProps) {
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    document.body.classList.add("modal-open");

    const panel = panelRef.current;
    const t = window.setTimeout(() => {
      const first = panel?.querySelector<HTMLElement>(FOCUSABLE);
      (first ?? panel)?.focus();
    }, 50);

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab" && panel) {
        const nodes = Array.from(
          panel.querySelectorAll<HTMLElement>(FOCUSABLE),
        ).filter((n) => n.offsetParent !== null);
        if (nodes.length === 0) return;
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-open");
      previouslyFocused.current?.focus?.();
    };
  }, [onClose]);

  const content = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: reduce ? 0 : 0.25 }}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          aria-hidden="true"
        />
        <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          tabIndex={-1}
          className={cn(
            "relative z-10 flex max-h-[92dvh] w-full flex-col overflow-hidden rounded-t-3xl border border-white/10 bg-ink-800 shadow-card sm:max-h-[88dvh] sm:rounded-3xl",
            sizeMap[size],
            className,
          )}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
          transition={{ duration: reduce ? 0 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${label}`}
            className="absolute right-3 top-3 z-30 grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-ink-900/70 text-cloud-muted backdrop-blur transition-colors hover:bg-white/10 hover:text-cloud"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
          {/* Scrollable content region — keeps the close button pinned */}
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(content, document.body);
}
