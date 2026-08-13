import type { ReactNode } from "react";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

interface ToolCardProps {
  icon: ReactNode;
  name: string;
  description: string;
  status?: "available" | "coming-soon";
  footer?: ReactNode;
}

export function ToolCard({ icon, name, description, status = "available", footer }: ToolCardProps) {
  return (
    <Card hover className="flex h-full flex-col">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
        {icon}
      </div>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-display text-lg font-bold text-slate-900">{name}</h3>
        {status === "coming-soon" && <Badge tone="amber">Coming soon</Badge>}
      </div>
      <p className="mt-2 flex-1 text-sm text-slate-600">{description}</p>
      {footer && <div className="mt-4">{footer}</div>}
    </Card>
  );
}
