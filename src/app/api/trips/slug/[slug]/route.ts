import { trips } from "@/lib/data/trips";
import { createSlugHandler } from "@/lib/api/route-factory";

export const { GET } = createSlugHandler(trips);
