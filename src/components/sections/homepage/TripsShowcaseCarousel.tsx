"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import type { Locale, Trip } from "@/lib/api/types";
import Image from "next/image";

interface Props {
  trips: Trip[];
}

export default function TripsShowcaseCarousel({ trips }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home");
  const tCategories = useTranslations("Trips");

  return (
    <Carousel opts={{ align: "start" }} className="group/carousel">
      <div className="grid gap-10 lg:grid-cols-[450px_1fr] lg:items-center lg:gap-20">
        <div className="relative">
          <DecorativeSquiggle className="pointer-events-none absolute -bottom-16 -left-10 -z-10 h-56 w-56 text-teal/20 lg:-left-16" />

          <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-ocean-300 uppercase">
            {t("tripsEyebrow")}
          </p>
          <h2 className="text-white">{t("tripsHeading")}</h2>
          <p className="mt-4 max-w-xs text-white/60 italic">
            {t("tripsSubheading")}
          </p>

          <div className="mt-8 hidden gap-3 lg:flex">
            <CarouselControlsSlot />
          </div>
        </div>

        <div className="relative min-w-0">
          <CarouselContent>
            {trips.map((trip) => (
              <CarouselItem
                key={trip.id}
                className="basis-[85%] sm:basis-[55%] lg:basis-md"
              >
                <TripCard
                  trip={trip}
                  locale={locale}
                  t={t}
                  tCategories={tCategories}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-6 flex gap-3 lg:hidden">
            <CarouselControlsSlot />
          </div>
        </div>
      </div>
    </Carousel>
  );
}

function CarouselControlsSlot() {
  return (
    <>
      <CarouselPrevious
        variant="outline-white"
        className="static rounded-xs translate-x-0 translate-y-0"
      />
      <CarouselNext
        variant="outline-white"
        className="static rounded-xs translate-x-0 translate-y-0"
      />
    </>
  );
}

function TripCard({
  trip,
  locale,
  t,
  tCategories,
}: {
  trip: Trip;
  locale: Locale;
  t: ReturnType<typeof useTranslations>;
  tCategories: ReturnType<typeof useTranslations>;
}) {
  const fromPrice = Math.min(...trip.cabinPricing.map((tier) => tier.priceUsd));
  const badgeLabel =
    trip.category === "liveaboard"
      ? t("tripNights", { nights: trip.durationDays })
      : tCategories(trip.category);

  return (
    <div className="group relative aspect-3/4 w-full overflow-hidden rounded-xs">
      <Image
        width={250}
        height={860}
        src={trip.images[0]}
        alt={trip.title[locale]}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-in-out"
      />

      <div className="absolute inset-0 bg-linear-to-t from-ocean-950 via-ocean-950/50 to-transparent transition-colors duration-300 group-hover:from-ocean-950/95 group-hover:via-ocean-950/70" />

      <div className="absolute top-4 right-4 rounded-xs bg-ocean-950/70 px-2.5 py-1 text-xs font-semibold tracking-wide text-white uppercase backdrop-blur-sm">
        {badgeLabel}
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-xs font-semibold tracking-[0.15em] text-ocean-300 uppercase">
          {tCategories(trip.category)}
        </p>
        <h3 className="mt-1 text-lg font-heading font-bold text-white">
          {trip.title[locale]}
        </h3>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-in-out group-hover:grid-rows-[1fr]">
          <p className="overflow-hidden text-sm text-white/75">
            {trip.summary[locale]}
          </p>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-sm font-semibold text-white">
            {t("fromPrice", { price: fromPrice })}
          </span>
          <Button
            asChild
            size="sm"
            variant="outline-white"
            className="translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Link href={`/trips/${trip.slug}`}>{t("exploreTrip")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function DecorativeSquiggle({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        d="M10 150 Q 50 100, 90 150 T 170 150"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M20 170 Q 60 120, 100 170 T 180 170"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M0 130 Q 40 80, 80 130 T 160 130"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}
