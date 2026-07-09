import { api } from "@/lib/api";
import CoursesCarousel from "@/components/layout/CoursesCarousel";

export default async function CoursesCarouselSection() {
  const { data: courses } = await api.courses.list({ pageSize: 100 });

  return (
    <section className="bg-muted/40 py-20 md:py-28">
      <div className="-mx-20 px-4">
        <CoursesCarousel courses={courses} />
      </div>
    </section>
  );
}
