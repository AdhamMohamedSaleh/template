"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Gauge, Eye, GraduationCap } from "lucide-react";
import DiveSiteCard from "@/components/dive-sites/DiveSiteCard";
import type { DiveSite } from "@/lib/data/dive-sites";
import type { Locale } from "@/lib/api/types";

const DiveSitesMap = dynamic(
  () => import("@/components/dive-sites/DiveSitesMap"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center bg-muted text-sm text-muted-foreground">
        …
      </div>
    ),
  },
);

interface Props {
  sites: DiveSite[];
  locale: Locale;
}

export default function DiveSitesExplorer({ sites, locale }: Props) {
  const [selectedId, setSelectedId] = useState(sites[0].id);
  const [hovered, setHovered] = useState<{
    site: DiveSite;
    x: number;
    y: number;
  } | null>(null);
  const t = useTranslations("Home");
  const tCourses = useTranslations("Courses");
  const selected = sites.find((site) => site.id === selectedId) ?? sites[0];

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="isolate h-125 overflow-hidden rounded-sm ring-1 ring-black/5 md:h-150">
          <DiveSitesMap
            sites={sites}
            selectedId={selectedId}
            onSelect={setSelectedId}
            locale={locale}
          />
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto lg:h-150">
          {sites.map((site) => (
            <button
              key={site.id}
              type="button"
              onClick={() => setSelectedId(site.id)}
              onMouseEnter={(e) =>
                setHovered({ site, x: e.clientX, y: e.clientY })
              }
              onMouseMove={(e) =>
                setHovered((prev) =>
                  prev?.site.id === site.id
                    ? { ...prev, x: e.clientX, y: e.clientY }
                    : prev,
                )
              }
              onMouseLeave={() =>
                setHovered((prev) => (prev?.site.id === site.id ? null : prev))
              }
              className={`rounded-sm px-4 py-3 text-left border border-border font-medium transition-colors cursor-pointer ${
                site.id === selectedId
                  ? "bg-teal text-white"
                  : "bg-card text-heading hover:bg-muted"
              }`}
            >
              {site.name[locale]}
            </button>
          ))}
        </div>
      </div>

      {hovered && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-[calc(100%+16px)]"
          style={{ left: hovered.x, top: hovered.y }}
        >
          <DiveSiteCard site={hovered.site} locale={locale} />
        </div>
      )}

      <div className="mt-10 border-t border-border pt-10">
        <div className="relative aspect-21/9 w-full overflow-hidden rounded-lg">
          <Image
            fill
            src={selected.image}
            alt={selected.name[locale]}
            sizes="(min-width: 1536px) 1504px, (min-width: 1280px) 1248px, (min-width: 1024px) 992px, (min-width: 768px) 736px, (min-width: 640px) 608px, calc(100vw - 32px)"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ocean-950 via-ocean-950/35 to-transparent" />

          <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
            <h2 className="text-white">{selected.name[locale]}</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/15 backdrop-blur-sm">
                <Gauge className="size-4 shrink-0 text-teal" aria-hidden />
                {t("maxDepth", { depth: selected.maxDepthMeters })}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/15 backdrop-blur-sm">
                <Eye className="size-4 shrink-0 text-teal" aria-hidden />
                {t("visibility", { meters: selected.visibilityMeters })}
              </span>
              <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm text-white ring-1 ring-white/15 backdrop-blur-sm">
                <GraduationCap className="size-4 shrink-0 text-teal" aria-hidden />
                {tCourses(selected.difficulty)}
              </span>
            </div>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-muted-foreground">
          {selected.description[locale]}
        </p>
      </div>
    </div>
  );
}
