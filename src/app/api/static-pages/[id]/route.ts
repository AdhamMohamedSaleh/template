import { staticPages } from "@/lib/data/static-pages";
import { createItemHandlers } from "@/lib/api/route-factory";

export const { GET, PATCH, DELETE } = createItemHandlers(staticPages);
