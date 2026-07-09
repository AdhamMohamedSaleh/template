"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useHoverOpen } from "@/lib/use-hover-open";
import { cn } from "@/lib/utils";

interface HoverController {
  open: boolean;
  setOpen: (open: boolean) => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface Props {
  renderTrigger: (open: boolean) => React.ReactNode;
  align?: "start" | "end";
  triggerClassName?: string;
  contentClassName?: string;
  children: React.ReactNode;
  /** Pass an existing useHoverOpen() instance to control this from outside (e.g. to close it after a selection). Omit to let the component manage its own state. */
  hover?: HoverController;
}

export default function HoverDropdown({
  renderTrigger,
  align = "start",
  triggerClassName,
  contentClassName,
  children,
  hover,
}: Props) {
  const internal = useHoverOpen();
  const { open, setOpen, onMouseEnter, onMouseLeave } = hover ?? internal;
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    function onClickOutside(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onClickOutside);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className={triggerClassName}
      >
        {renderTrigger(open)}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: [0.65, 0, 0.35, 1] }}
            className={cn(
              "absolute top-full z-50 mt-2 min-w-40 rounded-xs border border-white/10 bg-ocean p-1 shadow-lg",
              align === "end" ? "right-0" : "left-0",
              contentClassName,
            )}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
