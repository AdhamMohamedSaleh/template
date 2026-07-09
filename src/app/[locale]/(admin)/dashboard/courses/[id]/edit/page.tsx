import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import CourseForm from "@/components/dashboard/courses/CourseForm";
import { api } from "@/lib/api";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("Dashboard");
  const course = await api.courses.get(id);

  if (!course) notFound();

  return (
    <div>
      <h1 className="mb-6">
        {t("edit")} {t("courses")}
      </h1>
      <CourseForm course={course} />
    </div>
  );
}
