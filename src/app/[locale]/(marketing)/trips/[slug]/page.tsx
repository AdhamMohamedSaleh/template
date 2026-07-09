import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Clock } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TripListingCard from "@/components/trips/TripListingCard";
import PageBanner from "@/components/layout/PageBanner";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";

export default async function TripDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const trip = await api.trips.getBySlug(slug);

  if (!trip) notFound();

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Home");
  const tTrips = await getTranslations("TripsPage");
  const tCategories = await getTranslations("Trips");
  const tNav = await getTranslations("Nav");

  const { data: allTrips } = await api.trips.list({ pageSize: 100 });
  const relatedTrips = allTrips
    .filter((item) => item.category === trip.category && item.id !== trip.id)
    .slice(0, 3);

  const fromPrice = Math.min(...trip.cabinPricing.map((tier) => tier.priceUsd));
  const durationLabel =
    trip.category === "liveaboard"
      ? t("tripNights", { nights: trip.durationDays })
      : tCategories(trip.category);

  return (
    <div>
      <PageBanner
        image={trip.images[0]}
        title={trip.title[locale]}
        description={trip.summary[locale]}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("trips"), href: "/trips" },
          { label: trip.title[locale] },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Badge variant="secondary" className="uppercase">
            {tCategories(trip.category)}
          </Badge>

          <div className="mt-8">
            <h2>{tTrips("aboutThisTrip", { name: trip.title[locale] })}</h2>

            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-teal" aria-hidden />
                {durationLabel}
              </li>
            </ul>

            <p className="mt-6 text-muted-foreground">
              {trip.description[locale]}
            </p>
          </div>

          <div className="mt-12">
            <h2>{tTrips("itineraryHeading")}</h2>
            <ol className="mt-6 flex flex-col gap-6">
              {trip.itinerary.map((day) => (
                <li key={day.day} className="flex gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-teal text-sm font-bold text-white">
                    {day.day}
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-teal uppercase">
                      {tTrips("dayLabel", { day: day.day })}
                    </p>
                    <h3 className="text-lg">{day.title[locale]}</h3>
                    <p className="mt-1 text-muted-foreground">
                      {day.description[locale]}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-12">
            <h2>{tTrips("pricingHeading")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trip.cabinPricing.map((tier) => (
                <div
                  key={tier.id}
                  className="rounded-lg bg-card p-5 shadow-lg ring-1 ring-black/5"
                >
                  <p className="font-semibold text-heading">
                    {tier.label[locale]}
                  </p>
                  <p className="mt-2 text-2xl font-bold text-heading">
                    <span className="align-top text-base">€</span>
                    {tier.priceUsd}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
            <span className="text-2xl font-bold text-heading">
              <span className="align-top text-base">€</span>
              {fromPrice}
            </span>
            <Button asChild size="xl" variant="ocean" className="rounded-xl">
              <Link href={`/booking?trip=${trip.slug}`}>
                {tTrips("bookThisTrip")}
              </Link>
            </Button>
          </div>
        </div>

        {relatedTrips.length > 0 && (
          <div className="container mx-auto mt-20 border-t border-border px-4 pt-16 md:mt-28">
            <h2 className="mb-8 text-center">{tTrips("relatedHeading")}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedTrips.map((related) => (
                <TripListingCard key={related.id} trip={related} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
