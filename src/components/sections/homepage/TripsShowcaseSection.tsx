import { api } from "@/lib/api";
import TripsShowcaseCarousel from "@/components/sections/homepage/TripsShowcaseCarousel";

export default async function TripsShowcaseSection() {
  const { data: trips } = await api.trips.list({ pageSize: 100 });

  return (
    <section className="overflow-hidden bg-ocean-950 py-20 md:py-28">
      <div className="ml-72 pl-4">
        <TripsShowcaseCarousel trips={trips} />
      </div>
    </section>
  );
}
