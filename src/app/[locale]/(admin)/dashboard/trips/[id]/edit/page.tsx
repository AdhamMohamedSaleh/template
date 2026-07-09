import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import TripForm from "@/components/dashboard/trips/TripForm";
import { api } from "@/lib/api";

export default async function EditTripPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("Dashboard");
  const trip = await api.trips.get(id);

  if (!trip) notFound();

  return (
    <div>
      <h1 className="mb-6">
        {t("edit")} {t("trips")}
      </h1>
      <TripForm trip={trip} />
    </div>
  );
}
