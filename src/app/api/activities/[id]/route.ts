import { activities } from "@/lib/data/activities";
import { createItemHandlers } from "@/lib/api/route-factory";

export const { GET, PATCH, DELETE } = createItemHandlers(activities);
