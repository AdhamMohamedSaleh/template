import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";
import CoursesListingClient from "@/components/courses/CoursesListingClient";
import PageBanner from "@/components/layout/PageBanner";

export default async function CoursesPage() {
  const t = await getTranslations("Courses");
  const tNav = await getTranslations("Nav");
  const locale = (await getLocale()) as Locale;
  const { data: courses } = await api.courses.list({ pageSize: 100 });

  return (
    <div>
      <PageBanner
        image="/images/page-banner-courses.svg"
        title={t("pageHeading")}
        description={t("pageSubheading")}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("courses") },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <CoursesListingClient courses={courses} locale={locale} />
        </div>
      </div>
    </div>
  );
}
