import { getTranslations } from "next-intl/server";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { api } from "@/lib/api";

export default async function DashboardOverviewPage() {
  const t = await getTranslations("Dashboard");

  const [courses, trips, activities, blogPosts, bookings] = await Promise.all([
    api.courses.list({ pageSize: 1 }),
    api.trips.list({ pageSize: 1 }),
    api.activities.list({ pageSize: 1 }),
    api.blogPosts.list({ pageSize: 1 }),
    api.bookings.list({ status: "pending", pageSize: 1 }),
  ]);

  const stats = [
    { label: t("courses"), value: courses.total },
    { label: t("trips"), value: trips.total },
    { label: t("activities"), value: activities.total },
    { label: t("blog"), value: blogPosts.total },
    { label: t("bookings"), value: bookings.total },
  ];

  return (
    <div>
      <h1 className="mb-6">{t("overview")}</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader>
              <CardTitle>{stat.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-3xl font-semibold text-white">
              {stat.value}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
