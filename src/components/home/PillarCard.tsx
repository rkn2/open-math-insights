import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function PillarCard({
  icon,
  title,
  description,
  to,
  accent,
  featured = false,
  className = "",
}: {
  icon: ReactNode;
  title: string;
  description: string;
  to: string;
  accent: "primary" | "teal" | "amber" | "coral";
  featured?: boolean;
  className?: string;
}) {
  const accentClasses: Record<typeof accent, string> = {
    primary: "bg-primary-50 text-primary-600 group-hover:bg-primary-600",
    teal: "bg-teal-50 text-teal-600 group-hover:bg-teal-600",
    amber: "bg-amber-50 text-amber-600 group-hover:bg-amber-500",
    coral: "bg-orange-50 text-coral-600 group-hover:bg-coral-500",
  };

  return (
    <Link
      to={to}
      className={`group flex h-full rounded-xl border border-slate-100 bg-white shadow-card transition-all hover:-translate-y-1 hover:shadow-soft ${
        featured ? "flex-row items-center gap-8 p-8" : "flex-col p-7"
      } ${className}`}
    >
      <span
        className={`flex items-center justify-center rounded-xl transition-colors group-hover:text-white ${
          featured ? "h-16 w-16" : "h-12 w-12"
        } ${accentClasses[accent]}`}
      >
        {icon}
      </span>
      <div className={featured ? "flex-1" : ""}>
        <h3 className={`font-display font-bold text-slate-900 ${featured ? "text-2xl" : "mt-5 text-xl"}`}>{title}</h3>
        <p className={`mt-2 text-slate-600 ${featured ? "text-base" : "flex-1 text-sm"}`}>{description}</p>
        <span className="mt-4 inline-block text-sm font-semibold text-primary-600">Learn more →</span>
      </div>
    </Link>
  );
}
