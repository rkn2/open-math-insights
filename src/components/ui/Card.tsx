import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, hover = false, className = "", ...props }: CardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-100 bg-white p-6 shadow-card ${
        hover ? "transition-all hover:-translate-y-0.5 hover:shadow-soft" : ""
      } ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
