import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import TripListingCard from "@/components/trips/TripListingCard";
import type { Trip, Locale } from "@/lib/api/types";

interface Props {
  trips: Trip[];
  locale: Locale;
}

export default async function DayTripsSection({ trips, locale }: Props) {
  const t = await getTranslations("TripsPage");

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <h2>{t("dayTripsHeading")}</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {t("dayTripsSubheading")}
            </p>
          </div>

          <Button asChild size="lg" variant="brand" className="rounded-xl">
            <Link href="/booking?category=day-trip">{t("bookNow")}</Link>
          </Button>
        </div>

        <div className="mt-10 -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4">
          {trips.map((trip) => (
            <div key={trip.id} className="w-110 shrink-0 snap-start">
              <TripListingCard trip={trip} locale={locale} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
