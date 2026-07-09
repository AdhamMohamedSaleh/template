import { courses } from "@/lib/data/courses";
import { createSlugHandler } from "@/lib/api/route-factory";

export const { GET } = createSlugHandler(courses);
