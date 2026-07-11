import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import type { Trip, Locale } from "@/lib/api/types";

interface Props {
  trips: Trip[];
  locale: Locale;
}

export default async function SnorkelingSection({ trips, locale }: Props) {
  const t = await getTranslations("TripsPage");

  const features = [
    t("snorkelingFeature1"),
    t("snorkelingFeature2"),
    t("snorkelingFeature3"),
  ];

  return (
    <section className="bg-muted/40 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-16">
          <div className="relative aspect-square w-full max-w-md shrink-0 overflow-hidden rounded-xs lg:w-2/5 lg:max-w-none">
            <Image
              fill
              src={trips[0]?.images[0] ?? "/images/trip-placeholder-2.svg"}
              alt={trips[0]?.title[locale] ?? ""}
              className="object-cover"
            />
          </div>

          <div className="w-full lg:flex-1">
            <h2>{t("snorkelingHeading")}</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              {t("snorkelingSubheading")}
            </p>

            <ul className="mt-6 flex flex-col gap-2.5">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-2.5">
                  <Check className="size-4 shrink-0 text-teal" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {trips.map((trip) => {
                const price = Math.min(
                  ...trip.cabinPricing.map((tier) => tier.priceUsd),
                );

                return (
                  <Link
                    key={trip.id}
                    href={`/trips/${trip.slug}`}
                    className="flex items-center justify-between gap-4 rounded-lg bg-card px-4 py-3 shadow-lg ring-1 ring-black/5 transition-colors hover:ring-teal/30 sm:w-64"
                  >
                    <span className="font-medium text-heading">
                      {trip.title[locale]}
                    </span>
                    <span className="text-sm font-semibold text-teal">
                      <span className="align-top text-xs">€</span>
                      {price}
                    </span>
                  </Link>
                );
              })}
            </div>

            <Button
              asChild
              size="xl"
              variant="ocean"
              className="mt-8 rounded-xl"
            >
              <Link href="/trips">{t("viewAll")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
