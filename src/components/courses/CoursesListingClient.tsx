"use client";

import { useTranslations } from "next-intl";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseListingCard from "@/components/courses/CourseListingCard";
import type { Course, CourseLevel, Locale } from "@/lib/api/types";

const levels: (CourseLevel | "all")[] = [
  "all",
  "beginner",
  "advanced",
  "professional",
];

interface Props {
  courses: Course[];
  locale: Locale;
}

export default function CoursesListingClient({ courses, locale }: Props) {
  const tCourses = useTranslations("Courses");

  return (
    <Tabs defaultValue="all" className="w-full gap-0">
      <TabsList className="mx-auto mb-10 w-fit flex-wrap justify-center">
        {levels.map((level) => (
          <TabsTrigger key={level} value={level}>
            {level === "all" ? tCourses("filterAll") : tCourses(level)}
          </TabsTrigger>
        ))}
      </TabsList>

      {levels.map((level) => {
        const items =
          level === "all"
            ? courses
            : courses.filter((course) => course.level === level);

        return (
          <TabsContent key={level} value={level} className="outline-none">
            <div className="grid gap-6 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((course) => (
                <CourseListingCard
                  key={course.id}
                  course={course}
                  locale={locale}
                />
              ))}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
