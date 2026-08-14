import type { ReactNode } from "react";

/**
 * Minimal markdown → React renderer for AI chat replies (bold, italic,
 * inline code, bullet/numbered lists, paragraphs, light headers). Builds
 * real React elements — never dangerouslySetInnerHTML — so there's no XSS
 * surface even though this text comes from an LLM we don't fully control.
 *
 * Deliberately small and hand-rolled rather than pulling in a markdown
 * library + AST, matching this project's existing style (see
 * shared/src/csv.ts's parser and its doc comment on the same reasoning):
 * chat replies are short and only ever use this narrow, predictable subset
 * of markdown — a full CommonMark parser would be a lot of dependency
 * surface for formatting a couple of sentences.
 */

function renderInline(text: string, prefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  // Order matters: **bold** must be tried before single *italic* so a
  // double-asterisk run isn't mistaken for two single-asterisk matches.
  const pattern = /\*\*(.+?)\*\*|`(.+?)`|\*(.+?)\*|_(.+?)_/g;
  let lastIndex = 0;
  let matchIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const key = `${prefix}-${matchIndex}`;
    const [, bold, code, italicStar, italicUnderscore] = match;
    if (bold !== undefined) {
      nodes.push(<strong key={key}>{bold}</strong>);
    } else if (code !== undefined) {
      nodes.push(
        <code key={key} className="rounded bg-slate-200/70 px-1 py-0.5 text-[0.85em]">
          {code}
        </code>,
      );
    } else if (italicStar !== undefined) {
      nodes.push(<em key={key}>{italicStar}</em>);
    } else if (italicUnderscore !== undefined) {
      nodes.push(<em key={key}>{italicUnderscore}</em>);
    }
    matchIndex += 1;
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));
  return nodes;
}

const LIST_MARKER = /^\s*([-*]|\d+\.)\s+/;
const HEADER = /^(#{1,4})\s+(.*)$/;

function isListLine(line: string): boolean {
  return LIST_MARKER.test(line);
}

function stripListMarker(line: string): string {
  return line.replace(LIST_MARKER, "");
}

export function MarkdownText({ text }: { text: string }): ReactNode {
  const blocks = text.trim().split(/\n{2,}/);

  return (
    <div className="space-y-2">
      {blocks.map((block, bi) => {
        const lines = block.split("\n").filter((l) => l.trim().length > 0);
        if (lines.length === 0) return null;

        if (lines.every(isListLine)) {
          const ordered = /^\s*\d+\./.test(lines[0]);
          const items = lines.map((line, li) => <li key={`li-${bi}-${li}`}>{renderInline(stripListMarker(line), `li-${bi}-${li}`)}</li>);
          return ordered ? (
            <ol key={`block-${bi}`} className="list-decimal space-y-0.5 pl-5">
              {items}
            </ol>
          ) : (
            <ul key={`block-${bi}`} className="list-disc space-y-0.5 pl-5">
              {items}
            </ul>
          );
        }

        const headerMatch = lines.length === 1 ? HEADER.exec(lines[0]) : null;
        if (headerMatch) {
          // Demoted so a chat reply's "#" can never outrank real page headings.
          return (
            <p key={`block-${bi}`} className="font-semibold">
              {renderInline(headerMatch[2], `block-${bi}`)}
            </p>
          );
        }

        return (
          <p key={`block-${bi}`}>
            {lines.map((line, li) => (
              <span key={`line-${bi}-${li}`}>
                {renderInline(line, `line-${bi}-${li}`)}
                {li < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  );
}
