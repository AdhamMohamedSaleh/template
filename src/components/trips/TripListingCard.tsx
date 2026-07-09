import { useTranslations } from "next-intl";
import { Clock } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Trip, Locale } from "@/lib/api/types";

interface Props {
  trip: Trip;
  locale: Locale;
}

export default function TripListingCard({ trip, locale }: Props) {
  const t = useTranslations("Home");
  const tTrips = useTranslations("TripsPage");
  const tCategories = useTranslations("Trips");

  const fromPrice = Math.min(...trip.cabinPricing.map((tier) => tier.priceUsd));
  const durationLabel =
    trip.category === "liveaboard"
      ? t("tripNights", { nights: trip.durationDays })
      : tCategories(trip.category);

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-lg ring-1 ring-black/5">
      <div className="image-shine relative h-52 w-full shrink-0">
        <Image
          fill
          src={trip.images[0]}
          alt={trip.title[locale]}
          className="object-cover"
        />
        <Badge variant="secondary" className="absolute top-3 left-3 uppercase">
          {tCategories(trip.category)}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div>
          <h3>{trip.title[locale]}</h3>

          <p className="mt-2 line-clamp-3 text-muted-foreground">
            {trip.summary[locale]}
          </p>

          <ul className="mt-3 flex flex-col gap-1.5 text-base text-muted-foreground">
            <li className="flex items-center gap-2">
              <Clock className="size-4 shrink-0 text-teal" aria-hidden />
              {durationLabel}
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold text-heading">
            <span className="align-top text-base">€</span>
            {fromPrice}
          </span>
          <Button asChild size="default" variant="ocean" className="rounded-xl">
            <Link href={`/trips/${trip.slug}`}>{tTrips("viewTrip")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
