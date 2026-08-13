import { forwardRef } from "react";
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";
import { Link, type LinkProps } from "react-router-dom";

type Variant = "primary" | "secondary" | "outline" | "outlineLight" | "light" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary: "bg-primary-600 text-white hover:bg-primary-700 shadow-soft",
  secondary: "bg-teal-500 text-white hover:bg-teal-600 shadow-soft",
  outline: "border-2 border-primary-200 text-primary-700 hover:bg-primary-50",
  // For use on dark backgrounds (e.g. the hero) — kept as its own variant rather
  // than layering override classes onto `outline`, since Tailwind can't guarantee
  // class-attribute order wins when two utility classes touch the same property.
  outlineLight: "border-2 border-white/30 text-white hover:bg-white/10",
  // Solid white button, for use on saturated/colored backgrounds (e.g. the Slack CTA banner).
  light: "bg-white text-primary-700 hover:bg-primary-50 shadow-soft",
  ghost: "text-primary-700 hover:bg-primary-50",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

interface ButtonOwnProps {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
}

type ButtonProps = ButtonOwnProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", icon, className = "", children, ...props },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
});

type ButtonLinkProps = ButtonOwnProps & LinkProps;

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon}
      {children}
    </Link>
  );
}

type ButtonAnchorProps = ButtonOwnProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export function ButtonAnchor({
  variant = "primary",
  size = "md",
  icon,
  className = "",
  children,
  ...props
}: ButtonAnchorProps) {
  return (
    <a className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {icon}
      {children}
    </a>
  );
}
