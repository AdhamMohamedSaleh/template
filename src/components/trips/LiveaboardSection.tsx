import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type { Trip, Locale } from "@/lib/api/types";

interface Props {
  trips: Trip[];
  locale: Locale;
}

export default async function LiveaboardSection({ trips, locale }: Props) {
  const t = await getTranslations("TripsPage");
  const tHome = await getTranslations("Home");

  return (
    <section className="bg-ocean-950 py-16 text-white md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-gold uppercase">
              {t("pageHeading")}
            </p>
            <h2 className="text-white">{t("liveaboardHeading")}</h2>
            <p className="mt-3 text-white/60">{t("liveaboardSubheading")}</p>
          </div>

          <Button asChild size="lg" variant="outline-white" className="rounded-xl">
            <Link href="/liveaboard">{t("viewFleetLink")}</Link>
          </Button>
        </div>

        <div className="mt-12 flex flex-col gap-8">
          {trips.map((trip) => {
            const highlights = trip.itinerary.slice(0, 3);

            return (
              <div
                key={trip.id}
                className="flex flex-col overflow-hidden rounded-lg bg-ocean-900 ring-1 ring-white/10 lg:flex-row"
              >
                <div className="relative h-56 w-full shrink-0 lg:h-auto lg:w-1/3">
                  <Image
                    fill
                    src={trip.images[0]}
                    alt={trip.title[locale]}
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between gap-6 p-6 lg:p-8">
                  <div>
                    <p className="text-sm font-semibold tracking-wide text-ocean-300 uppercase">
                      {tHome("tripNights", { nights: trip.durationDays })}
                    </p>
                    <h3 className="mt-1 text-white">{trip.title[locale]}</h3>
                    <p className="mt-2 text-white/70">{trip.summary[locale]}</p>

                    <ul className="mt-4 flex flex-col gap-1.5 text-sm text-white/60">
                      {highlights.map((day) => (
                        <li key={day.day} className="flex items-center gap-2">
                          <span className="text-gold">
                            {t("dayLabel", { day: day.day })}
                          </span>
                          {day.title[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
                    <div className="flex flex-wrap gap-2">
                      {trip.cabinPricing.map((tier) => (
                        <span
                          key={tier.id}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white"
                        >
                          {tier.label[locale]} — €{tier.priceUsd}
                        </span>
                      ))}
                    </div>

                    <Button
                      asChild
                      size="lg"
                      variant="primary"
                      className="rounded-xl"
                    >
                      <Link href={`/trips/${trip.slug}`}>
                        {t("viewItinerary")}
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
