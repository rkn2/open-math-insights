import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/shared/types";
import { MarkdownText } from "@/components/datasets/MarkdownText";
import { generateResponse, prefetchCsvStats, shortLabel } from "@/lib/datasetSearch";
import { Link } from "react-router-dom";
import { mockDatasets } from "@/data/mockDatasets";

/** Extended message type that carries dataset IDs alongside content. */
type ChatTurn = ChatMessage & { datasetIds?: string[] };

const WELCOME_MESSAGE: ChatTurn = {
  role: "assistant",
  content:
    "Welcome to **Dataset Discovery**! I can help you explore the open math datasets indexed on OMI.\n\n" +
    "Try asking:\n" +
    "- What datasets do you have?\n" +
    "- What's the average NAEP math score?\n" +
    "- Do you have data for middle school?\n" +
    "- What international math data is available?",
};

interface DatasetChatProps {
  onClose: () => void;
}

export function DatasetChat({ onClose }: DatasetChatProps) {
  const [messages, setMessages] = useState<ChatTurn[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Warm the CSV cache on mount
  useEffect(() => {
    prefetchCsvStats();
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, loading]);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSend = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatTurn = { role: "user", content: trimmed };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const { text, datasetIds } = await generateResponse(trimmed);
      const assistantMessage: ChatTurn = {
        role: "assistant",
        content: text,
        datasetIds,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong while searching. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [input, loading]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  return (
    <div
      role="dialog"
      aria-label="Dataset Discovery chat"
      className="flex h-full flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-primary-600 px-4 py-3">
        <h2 className="font-display text-base font-semibold text-white">
          Dataset Discovery
        </h2>
        <button
          onClick={onClose}
          aria-label="Close chat"
          className="rounded-lg p-1 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Disclaimer */}
      <div className="border-b border-slate-100 bg-slate-50 px-4 py-2">
        <p className="text-xs text-slate-500">
          This chat searches the datasets indexed on OMI. It does not use an external AI model.
        </p>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div key={i}>
              <div
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-primary-600 text-white"
                      : "bg-slate-100 text-slate-800"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <MarkdownText text={msg.content} />
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
              {/* Render dataset links below assistant messages */}
              {msg.role === "assistant" && msg.datasetIds && msg.datasetIds.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2 pl-1">
                  {msg.datasetIds.map((id) => {
                    const ds = mockDatasets.find((d) => d.id === id);
                    if (!ds) return null;
                    return (
                      <Link
                        key={id}
                        to={`/data-depot/${id}`}
                        className="inline-flex items-center gap-1 rounded-lg border border-primary-200 bg-primary-50 px-2.5 py-1 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100"
                      >
                        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        {shortLabel(id)}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "0ms" }} />
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "150ms" }} />
                  <span className="inline-block h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: "300ms" }} />
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about datasets..."
            disabled={loading}
            className="flex-1 rounded-xl border border-slate-300 bg-slate-50 px-4 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-200 disabled:opacity-60"
            aria-label="Chat message input"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-600 text-white transition-colors hover:bg-primary-700 disabled:opacity-40 disabled:hover:bg-primary-600"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
