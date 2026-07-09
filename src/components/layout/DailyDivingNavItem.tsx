"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ArrowUpDown from "@/components/icons/ArrowUpDown";
import { useHoverOpen } from "@/lib/use-hover-open";
import HoverDropdown from "@/components/layout/HoverDropdown";

const sections = [
  { href: "/diving-center", key: "divingCenter" },
  { href: "/dive-sites", key: "diveSites" },
  { href: "/dive-stay", key: "diveStay" },
  { href: "/schedule", key: "schedule" },
] as const;

const itemClassName =
  "block rounded-xs text-[15px] px-2 py-0.75 transition-colors hover:bg-white/10 cursor-pointer";

interface Props {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export default function DailyDivingNavItem({
  variant = "desktop",
  onNavigate,
}: Props) {
  const tNav = useTranslations("Nav");
  const tSections = useTranslations("DailyDiving");
  const hover = useHoverOpen();
  const { open, setOpen } = hover;

  if (variant === "mobile") {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between font-medium py-3 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
        >
          {tNav("dailyDiving")}
          <ArrowUpDown down={open} showBase={false} size={16} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
              className="overflow-hidden"
            >
              <div className="pl-3 py-1 flex flex-col gap-1">
                {sections.map((section, index) => (
                  <Fragment key={section.key}>
                    <Link
                      href={section.href}
                      onClick={onNavigate}
                      className="py-0.75 transition-colors hover:bg-white/10"
                    >
                      {tSections(section.key)}
                    </Link>
                    {index < sections.length - 1 && (
                      <div aria-hidden className="h-px bg-white/10" />
                    )}
                  </Fragment>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <HoverDropdown
      hover={hover}
      align="start"
      triggerClassName="flex items-center gap-1 font-medium transition-colors cursor-pointer hover:bg-white/5 aria-expanded:bg-white/5 px-2 py-0.75 rounded-xs"
      contentClassName="w-48"
      renderTrigger={(open) => (
        <>
          {tNav("dailyDiving")}
          <ArrowUpDown down={!open} showBase={false} size={12} />
        </>
      )}
    >
      {sections.map((section, index) => (
        <Fragment key={section.key}>
          <Link
            href={section.href}
            onClick={() => setOpen(false)}
            className={itemClassName}
          >
            {tSections(section.key)}
          </Link>
          {index < sections.length - 1 && (
            <div aria-hidden className="my-1 h-px bg-white/10" />
          )}
        </Fragment>
      ))}
    </HoverDropdown>
  );
}
