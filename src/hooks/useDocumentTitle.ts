import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    const previous = document.title;
    document.title = title ? `${title} — Open Math Insights` : "Open Math Insights (OMI)";
    return () => { document.title = previous; };
  }, [title]);
}
