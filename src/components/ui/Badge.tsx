import type { ReactNode } from "react";

type Tone = "primary" | "teal" | "amber" | "slate" | "coral";

const tones: Record<Tone, string> = {
  primary: "bg-primary-50 text-primary-700 ring-primary-200",
  teal: "bg-teal-50 text-teal-700 ring-teal-200",
  amber: "bg-amber-50 text-amber-700 ring-amber-200",
  slate: "bg-slate-100 text-slate-600 ring-slate-200",
  coral: "bg-orange-50 text-coral-600 ring-orange-200",
};

export function Badge({ children, tone = "slate" }: { children: ReactNode; tone?: Tone }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
