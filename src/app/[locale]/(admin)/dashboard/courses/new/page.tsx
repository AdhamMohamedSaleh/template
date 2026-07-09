import { getTranslations } from "next-intl/server";
import CourseForm from "@/components/dashboard/courses/CourseForm";

export default async function NewCoursePage() {
  const t = await getTranslations("Dashboard");

  return (
    <div>
      <h1 className="mb-6">
        {t("new")} {t("courses")}
      </h1>
      <CourseForm />
    </div>
  );
}
