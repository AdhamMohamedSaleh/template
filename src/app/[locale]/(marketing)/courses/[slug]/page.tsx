import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { Clock, Gauge, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CourseListingCard from "@/components/courses/CourseListingCard";
import PageBanner from "@/components/layout/PageBanner";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = await api.courses.getBySlug(slug);

  if (!course) notFound();

  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("Home");
  const tCourses = await getTranslations("Courses");
  const tNav = await getTranslations("Nav");

  const { data: allCourses } = await api.courses.list({ pageSize: 100 });
  const relatedCourses = allCourses
    .filter((item) => item.level === course.level && item.id !== course.id)
    .slice(0, 3);

  return (
    <div>
      <PageBanner
        image={course.images[0]}
        title={course.title[locale]}
        description={course.summary[locale]}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("courses"), href: "/courses" },
          { label: course.title[locale] },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Badge variant="secondary" className="uppercase">
            {tCourses(course.level)}
          </Badge>

          <div className="mt-8">
            <h2>
              {tCourses("aboutThisCourse", { name: course.title[locale] })}
            </h2>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0 text-teal" aria-hidden />
                {t("courseDuration", { days: course.durationDays })}
              </li>
              {course.minAge !== undefined && (
                <li className="flex items-center gap-2">
                  <User className="size-4 shrink-0 text-teal" aria-hidden />
                  {t("minAge", { age: course.minAge })}
                </li>
              )}
              {course.maxDepthMeters !== undefined && (
                <li className="flex items-center gap-2">
                  <Gauge className="size-4 shrink-0 text-teal" aria-hidden />
                  {t("maxDepth", { depth: course.maxDepthMeters })}
                </li>
              )}
            </ul>
            <div className="flex flex-col items-start gap-4 mt-6">
              <p className="text-muted-foreground flex-1">
                {course.description[locale]}
              </p>

              <div className="flex flex-wrap items-center justify-end gap-4">
                <Button
                  asChild
                  size="xl"
                  variant="ocean"
                  className="rounded-xl text-lg"
                >
                  <Link href={`/booking?course=${course.slug}`}>
                    {tCourses("bookThisCourse")}
                  </Link>
                </Button>

                <span className="text-2xl font-bold text-heading">
                  <span className="align-top text-base">€</span>
                  {course.priceUsd}
                </span>
              </div>
            </div>{" "}
          </div>
        </div>

        {relatedCourses.length > 0 && (
          <div className="container mx-auto mt-20 border-t border-border px-4 pt-16 md:mt-28">
            <h2 className="mb-8 text-center">{tCourses("relatedHeading")}</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedCourses.map((related) => (
                <CourseListingCard
                  key={related.id}
                  course={related}
                  locale={locale}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
