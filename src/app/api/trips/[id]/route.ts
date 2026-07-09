import { trips } from "@/lib/data/trips";
import { createItemHandlers } from "@/lib/api/route-factory";

export const { GET, PATCH, DELETE } = createItemHandlers(trips);
