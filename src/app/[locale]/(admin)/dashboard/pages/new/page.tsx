import { getTranslations } from "next-intl/server";
import StaticPageForm from "@/components/dashboard/pages/StaticPageForm";

export default async function NewStaticPagePage() {
  const t = await getTranslations("Dashboard");

  return (
    <div>
      <h1 className="mb-6">
        {t("new")} {t("pages")}
      </h1>
      <StaticPageForm />
    </div>
  );
}
