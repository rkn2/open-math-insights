import { STANDARDS_DICTIONARY, type StandardEntry } from "@/data/standardsDictionary";

export interface StandardMatch {
  standard: StandardEntry;
  matchedKeywords: string[];
  /** Fraction of the standard's keyword list found in the input, 0–1. */
  score: number;
}

/**
 * Real (if intentionally simple) keyword-overlap scoring: normalize the input
 * text, substring-match each standard's keyword list, and rank by the
 * fraction of that standard's keywords present — so a standard with a few
 * precise hits outranks one with many generic partial hits.
 */
export function alignToStandards(text: string, limit = 6): StandardMatch[] {
  const normalized = text.toLowerCase();
  if (!normalized.trim()) return [];

  const matches: StandardMatch[] = STANDARDS_DICTIONARY.map((standard) => {
    const matchedKeywords = standard.keywords.filter((kw) => normalized.includes(kw));
    return {
      standard,
      matchedKeywords,
      score: matchedKeywords.length / standard.keywords.length,
    };
  }).filter((m) => m.matchedKeywords.length > 0);

  matches.sort((a, b) => b.score - a.score || b.matchedKeywords.length - a.matchedKeywords.length);
  return matches.slice(0, limit);
}
