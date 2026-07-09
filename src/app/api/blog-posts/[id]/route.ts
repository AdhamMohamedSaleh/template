import { blogPosts } from "@/lib/data/blog-posts";
import { createItemHandlers } from "@/lib/api/route-factory";

export const { GET, PATCH, DELETE } = createItemHandlers(blogPosts);
