export function TutorialListItem({ title, minutes }: { title: string; minutes: number }) {
  return (
    <li className="flex items-center justify-between gap-4 border-b border-slate-100 py-4 last:border-0">
      <div className="flex items-center gap-3">
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-50 text-primary-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0 0 10 9.87v4.263a1 1 0 0 0 1.555.832l3.197-2.132a1 1 0 0 0 0-1.664Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </span>
        <span className="text-sm font-semibold text-slate-800">{title}</span>
      </div>
      <span className="flex-none text-xs text-slate-400">{minutes} min</span>
    </li>
  );
}
