"use client";

import { motion } from "framer-motion";

interface Props {
  open: boolean;
  size?: number;
}

const ease = [0.65, 0, 0.35, 1] as const;
const t = { duration: 0.2, ease };

const closed = {
  line1: { x1: 2.5, y1: 4, x2: 11.5, y2: 4, opacity: 1 },
  line2: { x1: 2.5, y1: 7, x2: 11.5, y2: 7, opacity: 1 },
  line3: { x1: 2.5, y1: 10, x2: 11.5, y2: 10, opacity: 1 },
};

const opened = {
  line1: { x1: 9.828, y1: 4.172, x2: 4.172, y2: 9.828, opacity: 1 },
  line2: { x1: 4.172, y1: 4.172, x2: 9.828, y2: 9.828, opacity: 1 },
  line3: { x1: 7, y1: 7, x2: 7, y2: 7, opacity: 0 },
};

export default function MenuClose({ open, size = 24 }: Props) {
  const s = open ? opened : closed;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      style={{ display: "block", overflow: "visible" }}
    >
      <motion.line initial={s.line1} animate={s.line1} transition={t} />
      <motion.line initial={s.line2} animate={s.line2} transition={t} />
      <motion.line
        initial={s.line3}
        animate={s.line3}
        transition={{ ...t, opacity: { duration: 0.15, ease } }}
      />
    </svg>
  );
}
