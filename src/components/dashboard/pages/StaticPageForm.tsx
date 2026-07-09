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
import { StaticPage } from "@/lib/api/types";
import {
  staticPageSchema,
  StaticPageFormValues,
} from "@/lib/validation/static-page";
import {
  createStaticPage,
  updateStaticPage,
} from "@/app/[locale]/(admin)/dashboard/pages/actions";

function emptyTranslated() {
  return { en: "", de: "", ru: "", it: "" };
}

export default function StaticPageForm({
  page,
}: {
  page?: StaticPage | null;
}) {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<StaticPageFormValues>({
    resolver: zodResolver(staticPageSchema),
    defaultValues: page
      ? {
          slug: page.slug,
          title: page.title,
          bodyMarkdown: page.bodyMarkdown,
        }
      : {
          slug: "",
          title: emptyTranslated(),
          bodyMarkdown: emptyTranslated(),
        },
  });

  async function onSubmit(values: StaticPageFormValues) {
    setServerError(null);
    try {
      if (page) {
        await updateStaticPage(page.id, values);
      } else {
        await createStaticPage(values);
      }
      router.push("/dashboard/pages");
    } catch {
      setServerError(t("noResults"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-2xl flex-col gap-6"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register("slug")} />
        {errors.slug && (
          <p className="text-sm text-destructive">{errors.slug.message}</p>
        )}
      </div>

      <Tabs defaultValue={routing.locales[0]}>
        <LocaleTabsList />
        {routing.locales.map((loc) => (
          <TabsContent key={loc} value={loc} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`title-${loc}`}>Title</Label>
              <Input
                id={`title-${loc}`}
                {...register(`title.${loc}` as Path<StaticPageFormValues>)}
              />
            </div>
            <Controller
              control={control}
              name={`bodyMarkdown.${loc}` as Path<StaticPageFormValues>}
              render={({ field }) => (
                <MarkdownField
                  id={`bodyMarkdown-${loc}`}
                  label="Body (Markdown)"
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
          onClick={() => router.push("/dashboard/pages")}
        >
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
