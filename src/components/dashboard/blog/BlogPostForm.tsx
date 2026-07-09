"use client";

import { useState } from "react";
import { Controller, useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import LocaleTabsList from "@/components/dashboard/LocaleTabsList";
import MarkdownField from "@/components/dashboard/MarkdownField";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BlogPost, BlogPostStatus } from "@/lib/api/types";
import { blogPostSchema, BlogPostFormValues } from "@/lib/validation/blog-post";
import {
  createBlogPost,
  updateBlogPost,
} from "@/app/[locale]/(admin)/dashboard/blog/actions";

const STATUSES: BlogPostStatus[] = ["draft", "published"];

function emptyTranslated() {
  return { en: "", de: "", ru: "", it: "" };
}

export default function BlogPostForm({ post }: { post?: BlogPost | null }) {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const tBlog = useTranslations("Blog");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema),
    defaultValues: post
      ? {
          status: post.status,
          authorName: post.authorName,
          coverImage: post.coverImage,
          title: post.title,
          excerpt: post.excerpt,
          bodyMarkdown: post.bodyMarkdown,
        }
      : {
          status: "draft",
          authorName: "",
          coverImage: "",
          title: emptyTranslated(),
          excerpt: emptyTranslated(),
          bodyMarkdown: emptyTranslated(),
        },
  });

  async function onSubmit(values: BlogPostFormValues) {
    setServerError(null);
    try {
      if (post) {
        await updateBlogPost(post.id, values, post.status);
      } else {
        await createBlogPost(values);
      }
      router.push("/dashboard/blog");
    } catch {
      setServerError(t("noResults"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-2xl flex-col gap-6"
    >
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>{tBlog("status")}</Label>
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((status) => (
                    <SelectItem key={status} value={status}>
                      {tBlog(status)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="authorName">{tBlog("author")}</Label>
          <Input id="authorName" {...register("authorName")} />
          {errors.authorName && (
            <p className="text-sm text-destructive">
              {errors.authorName.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="coverImage">{tBlog("coverImage")}</Label>
          <Input id="coverImage" {...register("coverImage")} />
        </div>
      </div>

      <Tabs defaultValue={routing.locales[0]}>
        <LocaleTabsList />
        {routing.locales.map((loc) => (
          <TabsContent key={loc} value={loc} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`title-${loc}`}>Title</Label>
              <Input
                id={`title-${loc}`}
                {...register(`title.${loc}` as Path<BlogPostFormValues>)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`excerpt-${loc}`}>{tBlog("excerpt")}</Label>
              <Input
                id={`excerpt-${loc}`}
                {...register(`excerpt.${loc}` as Path<BlogPostFormValues>)}
              />
            </div>
            <Controller
              control={control}
              name={`bodyMarkdown.${loc}` as Path<BlogPostFormValues>}
              render={({ field }) => (
                <MarkdownField
                  id={`bodyMarkdown-${loc}`}
                  label={tBlog("body")}
                  value={String(field.value ?? "")}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </TabsContent>
        ))}
      </Tabs>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {t("save")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/blog")}
        >
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
