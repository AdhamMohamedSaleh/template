import { boats } from "@/lib/data/boats";
import { createCollectionHandlers } from "@/lib/api/route-factory";

export const { GET, POST } = createCollectionHandlers(boats, {
  titleForSlug: (body) => (body as { name?: string }).name ?? "boat",
});
