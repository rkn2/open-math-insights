import { Card } from "@/components/ui/Card";

export function ContributorSpotlightCard({
  name,
  role,
  quote,
  initials,
}: {
  name: string;
  role: string;
  quote: string;
  initials: string;
}) {
  return (
    <Card>
      <div className="flex items-center gap-3">
        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-teal-500 font-display text-sm font-bold text-white">
          {initials}
        </span>
        <div>
          <p className="font-display text-sm font-bold text-slate-900">{name}</p>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
      <p className="mt-4 text-sm italic text-slate-600">“{quote}”</p>
    </Card>
  );
}
