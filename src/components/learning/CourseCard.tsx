import { Link } from "react-router-dom";
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
  href,
}: {
  title: string;
  description: string;
  level: Level;
  duration: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex items-center gap-2">
        <Badge tone={levelTone[level]}>{level}</Badge>
        <span className="text-xs font-medium text-slate-400">{duration}</span>
      </div>
      <h3 className="mt-3 font-display text-lg font-bold text-slate-900">{title}</h3>
      <p className="mt-2 flex-1 text-sm text-slate-600">{description}</p>
      {href ? (
        <span className="mt-4 text-sm font-semibold text-primary-600">Start course →</span>
      ) : (
        <span className="mt-4 text-sm font-semibold text-slate-400">Coming soon</span>
      )}
    </>
  );

  if (href) {
    return (
      <Link to={href} className="block">
        <Card hover className="flex h-full flex-col">{content}</Card>
      </Link>
    );
  }

  return <Card className="flex h-full flex-col opacity-75">{content}</Card>;
}
