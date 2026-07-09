import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import BlogPostForm from "@/components/dashboard/blog/BlogPostForm";
import { api } from "@/lib/api";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = await getTranslations("Dashboard");
  const post = await api.blogPosts.get(id);

  if (!post) notFound();

  return (
    <div>
      <h1 className="mb-6">
        {t("edit")} {t("blog")}
      </h1>
      <BlogPostForm post={post} />
    </div>
  );
}
