import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

type Level = "Beginner" | "Intermediate" | "Advanced";

const levelTone: Record<Level, "teal" | "primary" | "coral"> = {
  Beginner: "teal",
  Intermediate: "primary",
  Advanced: "coral",
};

export function CourseCard({
  title,
  description,
  level,
  duration,
}: {
  title: string;
  description: string;
  level: Level;
  duration: string;
}) {
  return (
    <Card hover className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <Badge tone={levelTone[level]}>{level}</Badge>
        <span className="text-xs font-medium text-slate-400">{duration}</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{description}</p>
      <span className="mt-4 text-sm font-semibold text-primary-600">Start course →</span>
    </Card>
  );
}
