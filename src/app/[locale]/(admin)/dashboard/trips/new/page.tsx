import { getTranslations } from "next-intl/server";
import TripForm from "@/components/dashboard/trips/TripForm";

export default async function NewTripPage() {
  const t = await getTranslations("Dashboard");

  return (
    <div>
      <h1 className="mb-6">
        {t("new")} {t("trips")}
      </h1>
      <TripForm />
    </div>
  );
}
