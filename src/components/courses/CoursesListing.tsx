import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Pagination } from "@/components/ui/pagination";
import CourseListingCard from "@/components/courses/CourseListingCard";
import { cn } from "@/lib/utils";
import type { Course, CourseLevel, Locale } from "@/lib/api/types";

const LEVELS: readonly (CourseLevel | "all")[] = [
  "all",
  "beginner",
  "advanced",
  "professional",
];

interface Props {
  courses: Course[];
  locale: Locale;
  level: CourseLevel | "all";
  page: number;
  totalPages: number;
}

export default async function CoursesListing({
  courses,
  locale,
  level,
  page,
  totalPages,
}: Props) {
  const tCourses = await getTranslations("Courses");

  function buildHref(targetLevel: CourseLevel | "all", targetPage: number) {
    const params = new URLSearchParams();
    if (targetLevel !== "all") params.set("level", targetLevel);
    if (targetPage > 1) params.set("page", String(targetPage));
    const query = params.toString();
    return query ? `/courses?${query}` : "/courses";
  }

  return (
    <div>
      <div className="mx-auto mb-10 flex w-fit flex-wrap justify-center gap-1 rounded-full bg-muted p-1">
        {LEVELS.map((item) => (
          <Link
            key={item}
            href={buildHref(item, 1)}
            scroll={false}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
              item === level
                ? "bg-teal text-white"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {item === "all" ? tCourses("filterAll") : tCourses(item)}
          </Link>
        ))}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
        {courses.map((course) => (
          <CourseListingCard key={course.id} course={course} locale={locale} />
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        buildHref={(targetPage) => buildHref(level, targetPage)}
        className="mt-12"
      />
    </div>
  );
}
