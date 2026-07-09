import { boats } from "@/lib/data/boats";
import { createSlugHandler } from "@/lib/api/route-factory";

export const { GET } = createSlugHandler(boats);
