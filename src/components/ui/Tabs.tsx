import { useState } from "react";
import type { ReactNode } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, initialId }: { items: TabItem[]; initialId?: string }) {
  const [activeId, setActiveId] = useState(initialId ?? items[0]?.id);
  const active = items.find((i) => i.id === activeId) ?? items[0];

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-1 border-b border-slate-200">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={item.id === active?.id}
            onClick={() => setActiveId(item.id)}
            className={`rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
              item.id === active?.id
                ? "border-b-2 border-primary-600 text-primary-700"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="pt-6">{active?.content}</div>
    </div>
  );
}
