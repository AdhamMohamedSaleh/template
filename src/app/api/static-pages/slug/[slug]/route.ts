import { staticPages } from "@/lib/data/static-pages";
import { createSlugHandler } from "@/lib/api/route-factory";

export const { GET } = createSlugHandler(staticPages);
