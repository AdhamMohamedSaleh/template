"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import MenuClose from "@/components/icons/MenuClose";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const t = useTranslations("Dashboard");

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-white md:hidden"
        aria-label={open ? "Close menu" : "Open menu"}
      >
        <MenuClose open={open} size={20} />
      </button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="left"
          className="w-64 border-white/10 bg-ocean-950"
        >
          <SheetTitle className="sr-only">{t("overview")}</SheetTitle>
          <SheetDescription className="sr-only">
            Dashboard navigation
          </SheetDescription>

          <nav className="flex flex-col gap-1 px-4 pt-10">
            {NAV_ITEMS.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xs px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:bg-white/10 hover:text-white",
                    active && "bg-white/10 text-white",
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
