import { useTranslations } from "next-intl";
import { Clock, Gauge, User } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Course, Locale } from "@/lib/api/types";

interface Props {
  course: Course;
  locale: Locale;
}

export default function CourseListingCard({ course, locale }: Props) {
  const t = useTranslations("Home");
  const tCourses = useTranslations("Courses");

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-lg bg-card shadow-lg ring-1 ring-black/5">
      <div className="image-shine relative h-52 w-full shrink-0">
        <Image
          fill
          src={course.images[0]}
          alt={course.title[locale]}
          className="object-cover"
        />
        <Badge variant="secondary" className="absolute top-3 left-3 uppercase">
          {tCourses(course.level)}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div>
          <h3>{course.title[locale]}</h3>

          <p className="mt-2 line-clamp-3 text-muted-foreground">
            {course.summary[locale]}
          </p>

          <ul className="mt-3 flex flex-col gap-1.5 text-base text-muted-foreground">
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
        </div>

        <div className="flex items-center justify-between gap-3">
          <span className="text-2xl font-bold text-heading">
            <span className="align-top text-base">€</span>
            {course.priceUsd}
          </span>
          <Button asChild size="default" variant="ocean" className="rounded-xl">
            <Link href={`/courses/${course.slug}`}>{t("viewCourse")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
