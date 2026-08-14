import type { GradeBand, DatasetLicense } from "@/shared/types";
import { SearchInput } from "@/components/ui/SearchInput";

const GRADE_BANDS: GradeBand[] = ["K-2", "3-5", "6-8", "9-12"];
const LICENSES: DatasetLicense[] = ["CC-BY-4.0", "CC0-1.0", "Public Domain"];

interface DatasetFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  gradeBand: GradeBand | "all";
  onGradeBandChange: (value: GradeBand | "all") => void;
  topic: string | "all";
  onTopicChange: (value: string | "all") => void;
  license: DatasetLicense | "all";
  onLicenseChange: (value: DatasetLicense | "all") => void;
  availableTopics: string[];
}

const selectClass =
  "rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-100";

export function DatasetFilterBar({
  search,
  onSearchChange,
  gradeBand,
  onGradeBandChange,
  topic,
  onTopicChange,
  license,
  onLicenseChange,
  availableTopics,
}: DatasetFilterBarProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="sm:w-72">
        <SearchInput
          placeholder="Search datasets by keyword…"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      <select
        className={selectClass}
        value={gradeBand}
        onChange={(e) => onGradeBandChange(e.target.value as GradeBand | "all")}
        aria-label="Filter by grade band"
      >
        <option value="all">All grade bands</option>
        {GRADE_BANDS.map((gb) => (
          <option key={gb} value={gb}>
            Grades {gb}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={topic}
        onChange={(e) => onTopicChange(e.target.value)}
        aria-label="Filter by topic"
      >
        <option value="all">All topics</option>
        {availableTopics.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>

      <select
        className={selectClass}
        value={license}
        onChange={(e) => onLicenseChange(e.target.value as DatasetLicense | "all")}
        aria-label="Filter by license"
      >
        <option value="all">All licenses</option>
        {LICENSES.map((l) => (
          <option key={l} value={l}>
            {l}
          </option>
        ))}
      </select>
    </div>
  );
}
