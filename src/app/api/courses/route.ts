import { courses } from "@/lib/data/courses";
import { createCollectionHandlers } from "@/lib/api/route-factory";

export const { GET, POST } = createCollectionHandlers(courses, {
  titleForSlug: (body) => body.title?.en ?? "course",
});
