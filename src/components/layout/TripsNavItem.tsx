"use client";

import { Fragment } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ArrowUpDown from "@/components/icons/ArrowUpDown";
import { useHoverOpen } from "@/lib/use-hover-open";
import HoverDropdown from "@/components/layout/HoverDropdown";
import { TripCategory } from "@/lib/api/types";

const categories: TripCategory[] = ["day-trip", "liveaboard", "snorkeling"];

const itemClassName =
  "block rounded-xs px-2 py-0.75 text-[15px] transition-colors hover:bg-white/10 cursor-pointer";

interface Props {
  variant?: "desktop" | "mobile";
  onNavigate?: () => void;
}

export default function TripsNavItem({
  variant = "desktop",
  onNavigate,
}: Props) {
  const tNav = useTranslations("Nav");
  const tCategories = useTranslations("Trips");
  const tTrips = useTranslations("TripsPage");
  const hover = useHoverOpen();
  const { open, setOpen } = hover;

  if (variant === "mobile") {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between font-medium py-3 border-b border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
        >
          {tNav("trips")}
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
                {categories.map((category) => (
                  <Fragment key={category}>
                    <Link
                      href={`/trips#${category}`}
                      onClick={onNavigate}
                      className="py-0.75 transition-colors hover:bg-white/10"
                    >
                      {tCategories(category)}
                    </Link>
                    <div aria-hidden className="h-px bg-white/10" />
                  </Fragment>
                ))}
                <Link
                  href="/liveaboard"
                  onClick={onNavigate}
                  className="py-0.75 transition-colors hover:bg-white/10"
                >
                  {tTrips("viewFleetLink")}
                </Link>
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
          {tNav("trips")}
          <ArrowUpDown down={!open} showBase={false} size={12} />
        </>
      )}
    >
      {categories.map((category) => (
        <Fragment key={category}>
          <Link
            href={`/trips#${category}`}
            onClick={() => setOpen(false)}
            className={itemClassName}
          >
            {tCategories(category)}
          </Link>
          <div aria-hidden className="my-1 h-px bg-white/10" />
        </Fragment>
      ))}
      <Link
        href="/liveaboard"
        onClick={() => setOpen(false)}
        className={itemClassName}
      >
        {tTrips("viewFleetLink")}
      </Link>
    </HoverDropdown>
  );
}
