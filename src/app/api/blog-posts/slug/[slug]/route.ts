import { blogPosts } from "@/lib/data/blog-posts";
import { createSlugHandler } from "@/lib/api/route-factory";

export const { GET } = createSlugHandler(blogPosts);
