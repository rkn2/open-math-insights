export function NewsFeedItem({ date, title, tag }: { date: string; title: string; tag: string }) {
  return (
    <li className="flex flex-col gap-1 border-b border-slate-100 py-4 last:border-0 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex items-center gap-3">
        <span className="flex-none rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-700">
          {tag}
        </span>
        <span className="text-sm font-semibold text-slate-800">{title}</span>
      </div>
      <span className="flex-none text-xs text-slate-500">{date}</span>
    </li>
  );
}
