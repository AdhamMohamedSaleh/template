"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export function useHoverOpen(closeDelay = 150) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => clearCloseTimeout, [clearCloseTimeout]);

  const onMouseEnter = useCallback(() => {
    clearCloseTimeout();
    setOpen(true);
  }, [clearCloseTimeout]);

  const onMouseLeave = useCallback(() => {
    clearCloseTimeout();
    timeoutRef.current = setTimeout(() => setOpen(false), closeDelay);
  }, [clearCloseTimeout, closeDelay]);

  return { open, setOpen, onMouseEnter, onMouseLeave };
}
