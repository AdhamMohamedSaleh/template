import Image from "next/image";
import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type { Activity, Locale } from "@/lib/api/types";

interface Props {
  activity: Activity;
  locale: Locale;
}

export default function ActivityBookingCard({ activity, locale }: Props) {
  const t = useTranslations("ActivitiesPage");

  return (
    <div className="overflow-hidden rounded-lg bg-card shadow-lg ring-1 ring-black/5 lg:sticky lg:top-32">
      <div className="relative aspect-4/3 w-full">
        <Image
          fill
          src={activity.images[0]}
          alt={activity.title[locale]}
          className="object-cover"
        />
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-heading">
            ${activity.priceUsd}
          </span>
          <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="size-4 text-teal" aria-hidden />
            {t("activityDuration", { hours: activity.durationHours })}
          </span>
        </div>

        <Button
          asChild
          size="xl"
          variant="ocean"
          className="mt-6 w-full rounded-xl text-lg "
        >
          <Link href={`/booking?activity=${activity.slug}`}>
            {t("bookThisActivity")}
          </Link>
        </Button>
      </div>
    </div>
  );
}
