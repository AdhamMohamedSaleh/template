import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import EntityTable from "@/components/dashboard/EntityTable";
import EntityRowActions from "@/components/dashboard/EntityRowActions";
import { api } from "@/lib/api";
import { Activity, Locale } from "@/lib/api/types";
import { removeActivity } from "./actions";

export default async function ActivitiesListPage() {
  const t = await getTranslations("Dashboard");
  const locale = (await getLocale()) as Locale;
  const { data: activities } = await api.activities.list({ pageSize: 100 });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1>{t("activities")}</h1>
        <Button asChild>
          <Link href="/dashboard/activities/new">{t("new")}</Link>
        </Button>
      </div>

      <EntityTable<Activity>
        rows={activities}
        rowKey={(row) => row.id}
        emptyMessage={t("noResults")}
        columns={[
          { header: t("title"), cell: (row) => row.title[locale] },
          { header: t("price"), cell: (row) => `$${row.priceUsd}` },
          { header: t("duration"), cell: (row) => `${row.durationHours}h` },
        ]}
        renderActions={(row) => (
          <EntityRowActions
            editHref={`/dashboard/activities/${row.id}/edit`}
            onDelete={removeActivity.bind(null, row.id)}
          />
        )}
      />
    </div>
  );
}
