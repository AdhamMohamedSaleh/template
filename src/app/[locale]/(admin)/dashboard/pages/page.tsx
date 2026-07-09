import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import EntityTable from "@/components/dashboard/EntityTable";
import EntityRowActions from "@/components/dashboard/EntityRowActions";
import { api } from "@/lib/api";
import { StaticPage, Locale } from "@/lib/api/types";
import { removeStaticPage } from "./actions";

export default async function StaticPagesListPage() {
  const t = await getTranslations("Dashboard");
  const locale = (await getLocale()) as Locale;
  const { data: pages } = await api.staticPages.list({ pageSize: 100 });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1>{t("pages")}</h1>
        <Button asChild>
          <Link href="/dashboard/pages/new">{t("new")}</Link>
        </Button>
      </div>

      <EntityTable<StaticPage>
        rows={pages}
        rowKey={(row) => row.id}
        emptyMessage={t("noResults")}
        columns={[
          { header: t("title"), cell: (row) => row.title[locale] },
          { header: t("slug"), cell: (row) => row.slug },
        ]}
        renderActions={(row) => (
          <EntityRowActions
            editHref={`/dashboard/pages/${row.id}/edit`}
            onDelete={removeStaticPage.bind(null, row.id)}
          />
        )}
      />
    </div>
  );
}
