import { blogPosts } from "@/lib/data/blog-posts";
import { createCollectionHandlers } from "@/lib/api/route-factory";

export const { GET, POST } = createCollectionHandlers(blogPosts, {
  titleForSlug: (body) => body.title?.en ?? "post",
});
