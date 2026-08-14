import { useState, useRef, useCallback } from "react";
import type { ReactNode, KeyboardEvent } from "react";

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

export function Tabs({ items, initialId }: { items: TabItem[]; initialId?: string }) {
  const [activeId, setActiveId] = useState(initialId ?? items[0]?.id);
  const active = items.find((i) => i.id === activeId) ?? items[0];
  const tabRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  const setTabRef = useCallback((id: string) => (el: HTMLButtonElement | null) => {
    if (el) {
      tabRefs.current.set(id, el);
    } else {
      tabRefs.current.delete(id);
    }
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = items.findIndex((i) => i.id === activeId);
      let nextIndex: number | null = null;

      if (e.key === "ArrowRight") {
        nextIndex = (currentIndex + 1) % items.length;
      } else if (e.key === "ArrowLeft") {
        nextIndex = (currentIndex - 1 + items.length) % items.length;
      } else if (e.key === "Home") {
        nextIndex = 0;
      } else if (e.key === "End") {
        nextIndex = items.length - 1;
      }

      if (nextIndex !== null) {
        e.preventDefault();
        const nextId = items[nextIndex].id;
        setActiveId(nextId);
        tabRefs.current.get(nextId)?.focus();
      }
    },
    [items, activeId],
  );

  return (
    <div>
      <div role="tablist" className="flex flex-wrap gap-1 border-b border-slate-200" onKeyDown={handleKeyDown}>
        {items.map((item) => (
          <button
            key={item.id}
            ref={setTabRef(item.id)}
            id={`tab-${item.id}`}
            role="tab"
            aria-selected={item.id === active?.id}
            aria-controls={`tabpanel-${item.id}`}
            tabIndex={item.id === active?.id ? 0 : -1}
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
      <div
        id={`tabpanel-${active?.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${active?.id}`}
        tabIndex={0}
        className="pt-6"
      >
        {active?.content}
      </div>
    </div>
  );
}
