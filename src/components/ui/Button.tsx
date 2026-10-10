import { forwardRef } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 ease-premium focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-violet to-sky text-white shadow-glow hover:shadow-[0_0_50px_-10px_rgba(139,92,246,0.7)] hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-white/5 text-cloud hairline hover:bg-white/10 hover:-translate-y-0.5 active:translate-y-0",
  ghost: "text-cloud-muted hover:text-cloud hover:bg-white/5",
  whatsapp:
    "bg-[#25D366] text-[#07130b] hover:bg-[#2ee578] hover:-translate-y-0.5 active:translate-y-0 font-semibold",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-sm sm:text-base",
  lg: "px-7 py-3.5 text-base",
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    as?: "button";
  };

type ButtonAsLink = BaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    as: "a";
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(function Button(
  { variant = "primary", size = "md", className, children, ...props },
  ref,
) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (props.as === "a") {
    const { as: _as, ...rest } = props;
    return (
      <a ref={ref as React.Ref<HTMLAnchorElement>} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { as: _as, type, ...rest } = props as ButtonAsButton;
  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={type ?? "button"}
      className={classes}
      {...rest}
    >
      {children}
    </button>
  );
});
