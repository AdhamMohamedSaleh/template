import { getLocale, getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import { CourseLevel, Locale } from "@/lib/api/types";
import CoursesListing from "@/components/courses/CoursesListing";
import PageBanner from "@/components/layout/PageBanner";

const PAGE_SIZE = 6;
const LEVELS: readonly (CourseLevel | "all")[] = [
  "all",
  "beginner",
  "advanced",
  "professional",
];

function parseLevel(value: string | undefined): CourseLevel | "all" {
  return (LEVELS as readonly string[]).includes(value ?? "")
    ? (value as CourseLevel | "all")
    : "all";
}

interface Props {
  searchParams: Promise<{ page?: string; level?: string }>;
}

export default async function CoursesPage({ searchParams }: Props) {
  const t = await getTranslations("Courses");
  const tNav = await getTranslations("Nav");
  const locale = (await getLocale()) as Locale;
  const { page: pageParam, level: levelParam } = await searchParams;

  const level = parseLevel(levelParam);
  const page = Math.max(1, Number(pageParam) || 1);

  const {
    data: courses,
    totalPages,
    page: currentPage,
  } = await api.courses.list({
    page,
    pageSize: PAGE_SIZE,
    filters: level === "all" ? undefined : { level },
  });

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
          <CoursesListing
            courses={courses}
            locale={locale}
            level={level}
            page={currentPage}
            totalPages={totalPages}
          />
        </div>
      </div>
    </div>
  );
}
