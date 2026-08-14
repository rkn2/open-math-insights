import { useCallback, useEffect, useState } from "react";
import { DatasetChat } from "@/components/chat/DatasetChat";

/**
 * Floating action button that opens the dataset discovery chat panel.
 * Renders in a fixed position at the bottom-right corner; the chat panel
 * slides up as an overlay when opened.
 */
export function DatasetChatButton() {
  const [open, setOpen] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  // After a brief delay, mark the pulse as "seen" so it only plays once
  useEffect(() => {
    const timer = setTimeout(() => setHasBeenSeen(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = useCallback(() => setOpen(true), []);
  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <>
      {/* Chat panel overlay */}
      {open && (
        <>
          {/* Backdrop for mobile */}
          <div
            className="fixed inset-0 z-40 bg-black/20 sm:hidden"
            onClick={handleClose}
            aria-hidden="true"
          />
          <div
            className={
              "fixed z-50 " +
              // Mobile: full width, anchored to bottom
              "inset-x-0 bottom-0 h-[85dvh] sm:inset-x-auto " +
              // Desktop: fixed-width panel, bottom-right, capped for short viewports
              "sm:bottom-6 sm:right-6 sm:h-[560px] sm:max-h-[calc(100dvh-3rem)] sm:w-[400px]"
            }
          >
            <DatasetChat onClose={handleClose} />
          </div>
        </>
      )}

      {/* Floating action button — hidden when chat is open */}
      {!open && (
        <button
          onClick={handleOpen}
          aria-label="Open dataset discovery chat"
          className={
            "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center " +
            "rounded-full bg-primary-600 text-white shadow-lg " +
            "transition-all hover:bg-primary-700 hover:shadow-xl hover:scale-105 " +
            "focus:outline-none focus:ring-2 focus:ring-primary-400 focus:ring-offset-2 " +
            (!hasBeenSeen ? "animate-pulse" : "")
          }
        >
          {/* Chat bubble icon */}
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
            />
          </svg>
        </button>
      )}
    </>
  );
}
