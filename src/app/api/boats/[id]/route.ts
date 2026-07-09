import { boats } from "@/lib/data/boats";
import { createItemHandlers } from "@/lib/api/route-factory";

export const { GET, PATCH, DELETE } = createItemHandlers(boats);
