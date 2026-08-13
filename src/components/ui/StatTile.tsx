interface StatTileProps {
  value: string;
  label: string;
  loading?: boolean;
}

export function StatTile({ value, label, loading = false }: StatTileProps) {
  return (
    <div className="text-center sm:text-left">
      <div
        className={`font-display text-3xl font-bold text-white sm:text-4xl ${
          loading ? "animate-pulse opacity-70" : ""
        }`}
      >
        {value}
      </div>
      <div className="mt-1 text-sm font-medium text-primary-100">{label}</div>
    </div>
  );
}
