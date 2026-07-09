import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EntityTable from "@/components/dashboard/EntityTable";
import EntityRowActions from "@/components/dashboard/EntityRowActions";
import { api } from "@/lib/api";
import { Trip, Locale } from "@/lib/api/types";
import { removeTrip } from "./actions";

export default async function TripsListPage() {
  const t = await getTranslations("Dashboard");
  const locale = (await getLocale()) as Locale;
  const { data: trips } = await api.trips.list({ pageSize: 100 });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1>{t("trips")}</h1>
        <Button asChild>
          <Link href="/dashboard/trips/new">{t("new")}</Link>
        </Button>
      </div>

      <EntityTable<Trip>
        rows={trips}
        rowKey={(row) => row.id}
        emptyMessage={t("noResults")}
        columns={[
          { header: t("title"), cell: (row) => row.title[locale] },
          {
            header: t("category"),
            cell: (row) => <Badge variant="secondary">{row.category}</Badge>,
          },
          { header: t("duration"), cell: (row) => `${row.durationDays}d` },
        ]}
        renderActions={(row) => (
          <EntityRowActions
            editHref={`/dashboard/trips/${row.id}/edit`}
            onDelete={removeTrip.bind(null, row.id)}
          />
        )}
      />
    </div>
  );
}
