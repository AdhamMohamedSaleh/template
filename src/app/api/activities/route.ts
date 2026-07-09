import { activities } from "@/lib/data/activities";
import { createCollectionHandlers } from "@/lib/api/route-factory";

export const { GET, POST } = createCollectionHandlers(activities, {
  titleForSlug: (body) => body.title?.en ?? "activity",
});
