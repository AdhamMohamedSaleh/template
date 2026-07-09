import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Activity, Locale } from "@/lib/api/types";

const TILE_SIZES = [
  "md:col-span-2 md:row-span-2",
  "md:col-span-2 md:row-span-1",
  "md:col-span-1 md:row-span-1",
  "md:col-span-1 md:row-span-1",
];

interface Props {
  activities: Activity[];
}

export default async function ActivityBentoGrid({ activities }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("ActivitiesPage");

  return (
    <div className="grid grid-cols-1 gap-2.5 md:h-150 md:grid-cols-4 md:grid-rows-2 md:auto-rows-fr lg:h-170">
      {activities.map((activity, index) => (
        <Link
          key={activity.id}
          href={`/activities/${activity.slug}`}
          className={`group relative h-72 overflow-hidden rounded-md md:h-auto ${
            TILE_SIZES[index] ?? "md:col-span-1 md:row-span-1"
          }`}
        >
          <Image
            fill
            src={activity.images[0]}
            alt={activity.title[locale]}
            className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-ocean-950 via-ocean-950/40 to-transparent transition-colors duration-300 group-hover:from-ocean-950/95 group-hover:via-ocean-950/60" />

          <div className="absolute top-4 right-4 rounded-lg bg-ocean-950/70 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            {t("activityDuration", { hours: activity.durationHours })}
          </div>

          <div className="absolute inset-x-0 bottom-0 p-5">
            <h3 className="text-lg font-heading font-bold text-white">
              {activity.title[locale]}
            </h3>

            <div className="mt-2 grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-hover:grid-rows-[1fr]">
              <p className="overflow-hidden text-sm text-white/80">
                {activity.summary[locale]}
              </p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3">
              <span className="text-sm font-semibold text-white">
                <span className="align-top text-xs">€</span>
                {activity.priceUsd}
              </span>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {t("viewDetails")}
                <ArrowUpRight className="size-4" aria-hidden />
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
