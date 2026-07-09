import { getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import PageBanner from "@/components/layout/PageBanner";
import ActivityBentoGrid from "@/components/activities/ActivityBentoGrid";

export default async function ActivitiesPage() {
  const t = await getTranslations("ActivitiesPage");
  const tNav = await getTranslations("Nav");
  const { data: activities } = await api.activities.list({ pageSize: 100 });

  return (
    <div>
      <PageBanner
        image="/images/page-banner-activities.svg"
        title={t("pageHeading")}
        description={t("pageSubheading")}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("activities") },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <ActivityBentoGrid activities={activities} />
        </div>
      </div>
    </div>
  );
}
