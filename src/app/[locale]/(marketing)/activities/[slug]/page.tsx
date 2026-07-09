import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/layout/PageBanner";
import ActivityBookingCard from "@/components/activities/ActivityBookingCard";
import ActivityBentoGrid from "@/components/activities/ActivityBentoGrid";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const activity = await api.activities.getBySlug(slug);

  if (!activity) notFound();

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("ActivitiesPage");
  const tNav = await getTranslations("Nav");

  const { data: allActivities } = await api.activities.list({ pageSize: 100 });
  const relatedActivities = allActivities
    .filter((item) => item.id !== activity.id)
    .slice(0, 3);

  return (
    <div>
      <PageBanner
        image={activity.images[0]}
        title={activity.title[locale]}
        description={activity.summary[locale]}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("activities"), href: "/activities" },
          { label: activity.title[locale] },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:gap-16">
            <div>
              <h2>{t("aboutThisActivity", { name: activity.title[locale] })}</h2>
              <p className="mt-4 text-muted-foreground">
                {activity.description[locale]}
              </p>
            </div>

            <ActivityBookingCard activity={activity} locale={locale} />
          </div>

          {relatedActivities.length > 0 && (
            <div className="mt-20 border-t border-border pt-16 md:mt-28">
              <h2 className="mb-8 text-center">{t("relatedHeading")}</h2>
              <ActivityBentoGrid activities={relatedActivities} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
