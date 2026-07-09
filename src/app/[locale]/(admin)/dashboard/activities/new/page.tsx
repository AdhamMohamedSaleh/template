import { getTranslations } from "next-intl/server";
import ActivityForm from "@/components/dashboard/activities/ActivityForm";

export default async function NewActivityPage() {
  const t = await getTranslations("Dashboard");

  return (
    <div>
      <h1 className="mb-6">
        {t("new")} {t("activities")}
      </h1>
      <ActivityForm />
    </div>
  );
}
