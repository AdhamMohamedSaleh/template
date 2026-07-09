import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import ActivityForm from "@/components/dashboard/activities/ActivityForm";
import { api } from "@/lib/api";

export default async function EditActivityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("Dashboard");
  const activity = await api.activities.get(id);

  if (!activity) notFound();

  return (
    <div>
      <h1 className="mb-6">
        {t("edit")} {t("activities")}
      </h1>
      <ActivityForm activity={activity} />
    </div>
  );
}
