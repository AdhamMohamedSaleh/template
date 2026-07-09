"use server";

import { revalidatePath, updateTag } from "next/cache";
import { api } from "@/lib/api";
import { BlogPost, CreateInput, UpdateInput } from "@/lib/api/types";

function withPublishedAtStamp<
  T extends {
    status?: BlogPost["status"];
    publishedAt?: string | null;
  } & Record<string, unknown>,
>(input: T, previousStatus?: BlogPost["status"]): T & { publishedAt: string | null } {
  if (input.status === "published" && previousStatus !== "published") {
    return { ...input, publishedAt: new Date().toISOString() };
  }
  if (input.status === "draft") {
    return { ...input, publishedAt: null };
  }
  return { ...input, publishedAt: input.publishedAt ?? null };
}

type BlogPostCreateInput = Omit<CreateInput<BlogPost>, "publishedAt"> & {
  publishedAt?: string | null;
};

export async function createBlogPost(input: BlogPostCreateInput) {
  const created = await api.blogPosts.create(withPublishedAtStamp(input));
  updateTag("blog-posts");
  revalidatePath("/dashboard/blog");
  return created;
}

export async function updateBlogPost(
  id: string,
  input: UpdateInput<BlogPost>,
  previousStatus?: BlogPost["status"],
) {
  const updated = await api.blogPosts.update(
    id,
    withPublishedAtStamp(input, previousStatus),
  );
  updateTag("blog-posts");
  revalidatePath("/dashboard/blog");
  return updated;
}

export async function removeBlogPost(id: string) {
  await api.blogPosts.remove(id);
  updateTag("blog-posts");
  revalidatePath("/dashboard/blog");
}
