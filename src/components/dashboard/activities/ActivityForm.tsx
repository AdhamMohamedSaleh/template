"use client";

import { useState } from "react";
import { useForm, type Path } from "react-hook-form";
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
import { Activity } from "@/lib/api/types";
import {
  activitySchema,
  ActivityFormValues,
} from "@/lib/validation/activity";
import { createActivity, updateActivity } from "@/app/[locale]/(admin)/dashboard/activities/actions";

function emptyTranslated() {
  return { en: "", de: "", ru: "", it: "" };
}

export default function ActivityForm({ activity }: { activity?: Activity | null }) {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActivityFormValues>({
    resolver: zodResolver(activitySchema),
    defaultValues: activity
      ? {
          priceUsd: activity.priceUsd,
          durationHours: activity.durationHours,
          imagesText: activity.images.join(", "),
          title: activity.title,
          summary: activity.summary,
          description: activity.description,
        }
      : {
          priceUsd: 0,
          durationHours: 1,
          imagesText: "",
          title: emptyTranslated(),
          summary: emptyTranslated(),
          description: emptyTranslated(),
        },
  });

  async function onSubmit(values: ActivityFormValues) {
    setServerError(null);
    const payload = {
      priceUsd: values.priceUsd,
      durationHours: values.durationHours,
      images: (values.imagesText ?? "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      title: values.title,
      summary: values.summary,
      description: values.description,
    };

    try {
      if (activity) {
        await updateActivity(activity.id, payload);
      } else {
        await createActivity(payload);
      }
      router.push("/dashboard/activities");
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
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="durationHours">Duration (hours)</Label>
          <Input
            id="durationHours"
            type="number"
            step="0.5"
            {...register("durationHours", { valueAsNumber: true })}
          />
          {errors.durationHours && (
            <p className="text-sm text-destructive">
              {errors.durationHours.message}
            </p>
          )}
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
                {...register(`title.${loc}` as Path<ActivityFormValues>)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`summary-${loc}`}>Summary</Label>
              <Input
                id={`summary-${loc}`}
                {...register(`summary.${loc}` as Path<ActivityFormValues>)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`description-${loc}`}>Description</Label>
              <Textarea
                id={`description-${loc}`}
                rows={4}
                {...register(`description.${loc}` as Path<ActivityFormValues>)}
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
          onClick={() => router.push("/dashboard/activities")}
        >
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
