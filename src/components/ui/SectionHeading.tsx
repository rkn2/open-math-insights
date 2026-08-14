import type { ReactNode } from "react";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({ eyebrow, title, subtitle, align = "left", as: Tag = "h2" }: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-teal-600">
          {eyebrow}
        </p>
      )}
      <Tag className="font-display text-balance text-3xl font-bold text-slate-900 sm:text-4xl">
        {title}
      </Tag>
      {subtitle && <p className="mt-3 text-lg text-slate-600">{subtitle}</p>}
    </div>
  );
}
