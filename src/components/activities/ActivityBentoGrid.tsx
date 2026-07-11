import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { Activity, Locale } from "@/lib/api/types";

const TILE_SIZES = [
  "md:col-span-2 md:row-span-1 mb-6",
  "md:col-span-1 md:row-span-2 mb-10",
  "md:col-span-2 md:row-span-1 -mt-6 -mb-18",
  "md:col-span-1 md:row-span-1 mt-18",
  "md:col-span-1 md:row-span-1 mt-18",
  "md:col-span-1 md:row-span-1 -mt-10",
];

interface Props {
  activities: Activity[];
}

export default async function ActivityBentoGrid({ activities }: Props) {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("ActivitiesPage");

  return (
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:auto-rows-[220px] lg:auto-rows-[260px]">
        {activities.slice(0, TILE_SIZES.length).map((activity, index) => (
          <Link
            key={activity.id}
            href={`/activities/${activity.slug}`}
            className={`group relative h-72 overflow-hidden rounded-sm md:h-auto ${
              TILE_SIZES[index % TILE_SIZES.length]
            }`}
          >
            <div className="absolute inset-0">
              <Image
                fill
                src={activity.images[0]}
                alt={activity.title[locale]}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-ocean-950/0 transition-colors duration-500 ease-in-out group-hover:bg-ocean-950/60" />
            </div>
            <div className="absolute inset-y-0 right-0 w-0 overflow-hidden transition-[width] duration-500 ease-in-out group-hover:w-7/9">
              <Image
                fill
                src={activity.images[1] ?? activity.images[0]}
                alt=""
                aria-hidden
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-linear-to-t from-ocean-950 via-ocean-950/40 to-transparent transition-colors duration-300 group-hover:from-ocean-950/95 group-hover:via-ocean-950/60" />

            <div className="absolute top-4 right-4 rounded-xs bg-ocean-500 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
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
