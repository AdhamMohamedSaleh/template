// components/icons/ArrowUpDown.tsx
"use client";

import { motion } from "framer-motion";

interface Props {
  down?: boolean;
  showBase?: boolean;
  size?: number;
}

const ease = [0.65, 0, 0.35, 1] as const;
const t = { duration: 0.2, ease };

const states = {
  up: {
    base: { x1: 3.5, y1: 11, x2: 10.5, y2: 11, opacity: 1 },
    left: { x1: 4, y1: 8, x2: 7, y2: 5, opacity: 1 },
    right: { x1: 10, y1: 8, x2: 7, y2: 5, opacity: 1 },
  },
  down: {
    base: { x1: 3.5, y1: 11, x2: 10.5, y2: 11, opacity: 1 },
    left: { x1: 4, y1: 6, x2: 7, y2: 9, opacity: 1 },
    right: { x1: 10, y1: 6, x2: 7, y2: 9, opacity: 1 },
  },
};

export default function ArrowUpDown({
  down = false,
  showBase = true,
  size = 24,
}: Props) {
  const s = down ? states.down : states.up;

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
      {/* base line — hide for the plain arrow variant */}
      <motion.line
        initial={{ ...s.base, opacity: showBase ? 1 : 0 }}
        animate={{ ...s.base, opacity: showBase ? 1 : 0 }}
        transition={{ ...t, opacity: { duration: 0.15 } }}
      />
      {/* left leg */}
      <motion.line initial={s.left} animate={s.left} transition={t} />
      {/* right leg */}
      <motion.line initial={s.right} animate={s.right} transition={t} />
    </svg>
  );
}
