import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EntityTable from "@/components/dashboard/EntityTable";
import EntityRowActions from "@/components/dashboard/EntityRowActions";
import { api } from "@/lib/api";
import { Course, Locale } from "@/lib/api/types";
import { removeCourse } from "./actions";

export default async function CoursesListPage() {
  const t = await getTranslations("Dashboard");
  const tLevels = await getTranslations("Courses");
  const locale = (await getLocale()) as Locale;
  const { data: courses } = await api.courses.list({ pageSize: 100 });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1>{t("courses")}</h1>
        <Button asChild>
          <Link href="/dashboard/courses/new">{t("new")}</Link>
        </Button>
      </div>

      <EntityTable<Course>
        rows={courses}
        rowKey={(row) => row.id}
        emptyMessage={t("noResults")}
        columns={[
          { header: t("title"), cell: (row) => row.title[locale] },
          {
            header: t("level"),
            cell: (row) => <Badge variant="secondary">{tLevels(row.level)}</Badge>,
          },
          { header: t("price"), cell: (row) => `$${row.priceUsd}` },
          { header: t("duration"), cell: (row) => `${row.durationDays}d` },
        ]}
        renderActions={(row) => (
          <EntityRowActions
            editHref={`/dashboard/courses/${row.id}/edit`}
            onDelete={removeCourse.bind(null, row.id)}
          />
        )}
      />
    </div>
  );
}
