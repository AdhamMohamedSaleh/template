"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Gauge } from "lucide-react";
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
  const t = useTranslations("Home");
  const selected = sites.find((site) => site.id === selectedId) ?? sites[0];

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="h-105 overflow-hidden rounded-lg ring-1 ring-black/5 md:h-125">
          <DiveSitesMap
            sites={sites}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        <div className="flex flex-col gap-2 overflow-y-auto lg:h-125">
          {sites.map((site) => (
            <button
              key={site.id}
              type="button"
              onClick={() => setSelectedId(site.id)}
              className={`rounded-lg px-4 py-3 text-left font-medium transition-colors ${
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

      <div className="mt-10 grid gap-8 border-t border-border pt-10 lg:grid-cols-2 lg:items-center">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg">
          <Image
            fill
            src={selected.image}
            alt={selected.name[locale]}
            className="object-cover"
          />
        </div>

        <div>
          <h2>{selected.name[locale]}</h2>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Gauge className="size-4 shrink-0 text-teal" aria-hidden />
            {t("maxDepth", { depth: selected.maxDepthMeters })}
          </p>
          <p className="mt-4 text-muted-foreground">
            {selected.description[locale]}
          </p>
        </div>
      </div>
    </div>
  );
}
