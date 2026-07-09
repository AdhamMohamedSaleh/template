import { staticPages } from "@/lib/data/static-pages";
import { createCollectionHandlers } from "@/lib/api/route-factory";

export const { GET, POST } = createCollectionHandlers(staticPages, {
  titleForSlug: (body) => body.title?.en ?? "page",
});
