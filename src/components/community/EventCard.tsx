import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function EventCard({
  date,
  title,
  description,
  kind,
}: {
  date: string;
  title: string;
  description: string;
  kind: "Recurring" | "Webinar" | "Sprint";
}) {
  return (
    <Card className="flex gap-4">
      <div className="flex-none rounded-xl bg-primary-50 px-3 py-2 text-center">
        <p className="font-display text-sm font-bold text-primary-700">{date}</p>
      </div>
      <div>
        <Badge tone="teal">{kind}</Badge>
        <h3 className="mt-1.5 font-display text-base font-bold text-slate-900">{title}</h3>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </Card>
  );
}
