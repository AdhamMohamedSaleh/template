"use client";

import { useState } from "react";
import { Controller, useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import LocaleTabsList from "@/components/dashboard/LocaleTabsList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Course, CourseLevel } from "@/lib/api/types";
import { courseSchema, CourseFormValues } from "@/lib/validation/course";
import { createCourse, updateCourse } from "@/app/[locale]/(admin)/dashboard/courses/actions";

const LEVELS: CourseLevel[] = ["beginner", "advanced", "professional"];

function emptyTranslated() {
  return { en: "", de: "", ru: "", it: "" };
}

export default function CourseForm({ course }: { course?: Course | null }) {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const tLevels = useTranslations("Courses");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CourseFormValues>({
    resolver: zodResolver(courseSchema),
    defaultValues: course
      ? {
          level: course.level,
          priceUsd: course.priceUsd,
          durationDays: course.durationDays,
          minAgeText: course.minAge?.toString() ?? "",
          maxDepthMetersText: course.maxDepthMeters?.toString() ?? "",
          imagesText: course.images.join(", "),
          title: course.title,
          summary: course.summary,
          description: course.description,
        }
      : {
          level: "beginner",
          priceUsd: 0,
          durationDays: 1,
          minAgeText: "",
          maxDepthMetersText: "",
          imagesText: "",
          title: emptyTranslated(),
          summary: emptyTranslated(),
          description: emptyTranslated(),
        },
  });

  async function onSubmit(values: CourseFormValues) {
    setServerError(null);
    const payload = {
      level: values.level,
      priceUsd: values.priceUsd,
      durationDays: values.durationDays,
      minAge: values.minAgeText.trim()
        ? Number(values.minAgeText)
        : undefined,
      maxDepthMeters: values.maxDepthMetersText.trim()
        ? Number(values.maxDepthMetersText)
        : undefined,
      images: values.imagesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      title: values.title,
      summary: values.summary,
      description: values.description,
    };

    try {
      if (course) {
        await updateCourse(course.id, payload);
      } else {
        await createCourse(payload);
      }
      router.push("/dashboard/courses");
    } catch {
      setServerError(t("noResults"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-2xl flex-col gap-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Level</Label>
          <Controller
            control={control}
            name="level"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((level) => (
                    <SelectItem key={level} value={level}>
                      {tLevels(level)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="priceUsd">Price (USD)</Label>
          <Input
            id="priceUsd"
            type="number"
            step="1"
            {...register("priceUsd", { valueAsNumber: true })}
          />
          {errors.priceUsd && (
            <p className="text-sm text-destructive">{errors.priceUsd.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="durationDays">Duration (days)</Label>
          <Input
            id="durationDays"
            type="number"
            step="1"
            {...register("durationDays", { valueAsNumber: true })}
          />
          {errors.durationDays && (
            <p className="text-sm text-destructive">
              {errors.durationDays.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="minAgeText">Min age</Label>
          <Input id="minAgeText" type="number" {...register("minAgeText")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="maxDepthMetersText">Max depth (m)</Label>
          <Input
            id="maxDepthMetersText"
            type="number"
            {...register("maxDepthMetersText")}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="imagesText">Images (comma-separated URLs)</Label>
        <Input id="imagesText" {...register("imagesText")} />
      </div>

      <Tabs defaultValue={routing.locales[0]}>
        <LocaleTabsList />
        {routing.locales.map((loc) => (
          <TabsContent key={loc} value={loc} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`title-${loc}`}>Title</Label>
              <Input
                id={`title-${loc}`}
                {...register(`title.${loc}` as Path<CourseFormValues>)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`summary-${loc}`}>Summary</Label>
              <Input
                id={`summary-${loc}`}
                {...register(`summary.${loc}` as Path<CourseFormValues>)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`description-${loc}`}>Description</Label>
              <Textarea
                id={`description-${loc}`}
                rows={4}
                {...register(`description.${loc}` as Path<CourseFormValues>)}
              />
            </div>
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
          onClick={() => router.push("/dashboard/courses")}
        >
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
