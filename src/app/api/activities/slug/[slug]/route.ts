import { activities } from "@/lib/data/activities";
import { createSlugHandler } from "@/lib/api/route-factory";

export const { GET } = createSlugHandler(activities);
