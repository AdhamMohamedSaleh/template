import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import EntityTable from "@/components/dashboard/EntityTable";
import EntityRowActions from "@/components/dashboard/EntityRowActions";
import { api } from "@/lib/api";
import { BlogPost, Locale } from "@/lib/api/types";
import { removeBlogPost } from "./actions";

export default async function BlogListPage() {
  const t = await getTranslations("Dashboard");
  const tBlog = await getTranslations("Blog");
  const locale = (await getLocale()) as Locale;
  const { data: posts } = await api.blogPosts.list({ pageSize: 100 });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1>{t("blog")}</h1>
        <Button asChild>
          <Link href="/dashboard/blog/new">{t("new")}</Link>
        </Button>
      </div>

      <EntityTable<BlogPost>
        rows={posts}
        rowKey={(row) => row.id}
        emptyMessage={t("noResults")}
        columns={[
          { header: t("title"), cell: (row) => row.title[locale] },
          { header: tBlog("author"), cell: (row) => row.authorName },
          {
            header: tBlog("status"),
            cell: (row) => (
              <Badge variant={row.status === "published" ? "default" : "secondary"}>
                {tBlog(row.status)}
              </Badge>
            ),
          },
        ]}
        renderActions={(row) => (
          <EntityRowActions
            editHref={`/dashboard/blog/${row.id}/edit`}
            onDelete={removeBlogPost.bind(null, row.id)}
          />
        )}
      />
    </div>
  );
}
