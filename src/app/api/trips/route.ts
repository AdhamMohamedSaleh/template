import { trips } from "@/lib/data/trips";
import { createCollectionHandlers } from "@/lib/api/route-factory";

export const { GET, POST } = createCollectionHandlers(trips, {
  titleForSlug: (body) => body.title?.en ?? "trip",
});
