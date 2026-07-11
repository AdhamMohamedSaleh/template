"use client";

import { useTranslations } from "next-intl";
import { Gauge, Eye, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DiveSite } from "@/lib/data/dive-sites";
import type { Locale } from "@/lib/api/types";

interface Props {
  site: DiveSite;
  locale: Locale;
  className?: string;
}

export default function DiveSiteCard({ site, locale, className }: Props) {
  const t = useTranslations("Home");
  const tCourses = useTranslations("Courses");

  return (
    <div
      className={cn(
        "w-64 overflow-hidden rounded-sm bg-card shadow-[inset_0_1px_0_rgba(255,255,255,0.5),inset_0_0_0_1px_rgba(255,255,255,0.08),0_10px_30px_-8px_rgba(4,28,44,0.5),0_0_28px_2px_rgba(15,139,141,0.4)] ring-1 ring-white/10",
        className,
      )}
    >
      <div className="relative h-32 w-full">
        <img
          src={site.image}
          alt={site.name[locale]}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-3 p-3">
        <p className="font-heading text-base font-semibold text-heading">
          {site.name[locale]}
        </p>
        <div className="flex flex-col gap-1.5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Gauge className="size-3.5 shrink-0 text-teal" aria-hidden />
            {t("maxDepth", { depth: site.maxDepthMeters })}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Eye className="size-3.5 shrink-0 text-teal" aria-hidden />
            {t("visibility", { meters: site.visibilityMeters })}
          </p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <GraduationCap className="size-3.5 shrink-0 text-teal" aria-hidden />
            {tCourses(site.difficulty)}
          </p>
        </div>
      </div>
    </div>
  );
}
