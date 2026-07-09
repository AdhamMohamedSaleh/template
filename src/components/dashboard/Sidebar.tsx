"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { NAV_ITEMS } from "./nav-items";

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations("Dashboard");

  return (
    <nav className="flex flex-col gap-1 p-4">
      {NAV_ITEMS.map((item) => {
        const active =
          item.href === "/dashboard"
            ? pathname === "/dashboard"
            : pathname.startsWith(item.href);
        return (
          <Link
            key={item.key}
            href={item.href}
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
  );
}
