import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import StaticPageForm from "@/components/dashboard/pages/StaticPageForm";
import { api } from "@/lib/api";

export default async function EditStaticPagePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("Dashboard");
  const page = await api.staticPages.get(id);

  if (!page) notFound();

  return (
    <div>
      <h1 className="mb-6">
        {t("edit")} {t("pages")}
      </h1>
      <StaticPageForm page={page} />
    </div>
  );
}
