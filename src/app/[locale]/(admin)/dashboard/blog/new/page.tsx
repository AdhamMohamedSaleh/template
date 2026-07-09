import { getTranslations } from "next-intl/server";
import BlogPostForm from "@/components/dashboard/blog/BlogPostForm";

export default async function NewBlogPostPage() {
  const t = await getTranslations("Dashboard");

  return (
    <div>
      <h1 className="mb-6">
        {t("new")} {t("blog")}
      </h1>
      <BlogPostForm />
    </div>
  );
}
