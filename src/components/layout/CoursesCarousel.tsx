"use client";

import { useLocale, useTranslations } from "next-intl";
import { Tabs as TabsPrimitive } from "radix-ui";
import { Clock, Gauge, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import type { Course, CourseLevel, Locale } from "@/lib/api/types";
import Image from "next/image";

const levels: CourseLevel[] = ["beginner", "advanced", "professional"];

interface Props {
  courses: Course[];
}

export default function CoursesCarousel({ courses }: Props) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home");
  const tCourses = useTranslations("Courses");

  return (
    <Tabs defaultValue={levels[0]} className="w-full gap-0">
      <div className="mb-12 flex flex-col items-center gap-7 text-center">
        <div>
          <h2>{t("coursesHeading")}</h2>
        </div>

        <TabsPrimitive.List className="mx-auto flex w-fit flex-wrap justify-center gap-1 rounded-full bg-muted p-1">
          {levels.map((level) => (
            <TabsPrimitive.Trigger
              key={level}
              value={level}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                "cursor-pointer data-[state=active]:bg-teal data-[state=active]:text-white",
                "data-[state=inactive]:text-muted-foreground data-[state=inactive]:hover:text-foreground",
              )}
            >
              {tCourses(level)}
            </TabsPrimitive.Trigger>
          ))}
        </TabsPrimitive.List>
      </div>

      {levels.map((level) => {
        const items = courses.filter((course) => course.level === level);

        return (
          <TabsContent key={level} value={level} className="outline-none">
            <Carousel
              opts={{ align: "center", loop: items.length > 2 }}
              className="relative"
            >
              <CarouselContent>
                {items.map((course) => (
                  <CarouselItem
                    key={course.id}
                    className="basis-[88%] sm:basis-[80%] lg:basis-[64%]"
                  >
                    <CourseCard course={course} locale={locale} t={t} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <CarouselPrevious className="rounded-lg -left-3 border-white/15 bg-ocean-950 text-white hover:bg-ocean-900 hover:text-white sm:-left-4 lg:-left-6" />
              <CarouselNext className="rounded-lg -right-3 border-white/15 bg-ocean-950 text-white hover:bg-ocean-900 hover:text-white sm:-right-4 lg:-right-6" />
            </Carousel>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}

function CourseCard({
  course,
  locale,
  t,
}: {
  course: Course;
  locale: Locale;
  t: ReturnType<typeof useTranslations>;
}) {
  return (
    <div className="flex h-full flex-col-reverse overflow-hidden rounded-lg bg-card shadow-lg ring-1 ring-black/5 sm:flex-row">
      <div className="relative h-44 w-full shrink-0 sm:h-auto sm:w-4/11">
        <Image
          width={460}
          height={800}
          src={course.images[0]}
          alt={course.title[locale]}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4 py-6 px-10">
        <div>
          <h3>{course.title[locale]}</h3>

          <p className="mt-3.5 line-clamp-3 text-muted-foreground">
            {course.summary[locale]}
          </p>

          <ul className="mt-3.5 flex flex-col gap-2.5 text-base text-muted-foreground">
            <li className="flex items-center gap-2">
              <Clock className="size-5.5 shrink-0 text-teal" aria-hidden />
              {t("courseDuration", { days: course.durationDays })}
            </li>
            {course.minAge !== undefined && (
              <li className="flex items-center gap-2">
                <User className="size-5.5 shrink-0 text-teal" aria-hidden />
                {t("minAge", { age: course.minAge })}
              </li>
            )}
            {course.maxDepthMeters !== undefined && (
              <li className="flex items-center gap-2">
                <Gauge className="size-5.5 shrink-0 text-teal" aria-hidden />
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
          <Button asChild size="xl" variant="ocean" className="rounded-xl">
            <Link href={`/courses/${course.slug}`}>{t("viewCourse")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
