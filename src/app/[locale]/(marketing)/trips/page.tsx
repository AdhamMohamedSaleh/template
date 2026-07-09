import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";
import PageBanner from "@/components/layout/PageBanner";
import DayTripsSection from "@/components/trips/DayTripsSection";
import LiveaboardSection from "@/components/trips/LiveaboardSection";
import SnorkelingSection from "@/components/trips/SnorkelingSection";

export default async function TripsPage() {
  const t = await getTranslations("TripsPage");
  const tNav = await getTranslations("Nav");
  const locale = (await getLocale()) as Locale;
  const { data: trips } = await api.trips.list({ pageSize: 100 });

  const dayTrips = trips.filter((trip) => trip.category === "day-trip");
  const liveaboards = trips.filter((trip) => trip.category === "liveaboard");
  const snorkeling = trips.filter((trip) => trip.category === "snorkeling");

  return (
    <div>
      <PageBanner
        image="/images/page-banner-trips.svg"
        title={t("pageHeading")}
        description={t("pageSubheading")}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("trips") },
        ]}
      />

      <div id="day-trip" className="scroll-mt-20 md:scroll-mt-28">
        <DayTripsSection trips={dayTrips} locale={locale} />
      </div>

      <div id="liveaboard" className="scroll-mt-20 md:scroll-mt-28">
        <LiveaboardSection trips={liveaboards} locale={locale} />
      </div>

      <div id="snorkeling" className="scroll-mt-20 md:scroll-mt-28">
        <SnorkelingSection trips={snorkeling} locale={locale} />
      </div>
    </div>
  );
}
