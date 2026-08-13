import type { ReactNode } from "react";
import { Link } from "react-router-dom";

export function PillarCard({
  icon,
  title,
  description,
  to,
  accent,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  to: string;
  accent: "primary" | "teal" | "amber" | "coral";
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
      className="group flex h-full flex-col rounded-2xl border border-slate-100 bg-white p-7 shadow-card transition-all hover:-translate-y-1 hover:shadow-soft"
    >
      <span
        className={`flex h-12 w-12 items-center justify-center rounded-xl transition-colors group-hover:text-white ${accentClasses[accent]}`}
      >
        {icon}
      </span>
      <h3 className="mt-5 font-display text-xl font-bold text-slate-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{description}</p>
      <span className="mt-4 text-sm font-semibold text-primary-600">Learn more →</span>
    </Link>
  );
}
