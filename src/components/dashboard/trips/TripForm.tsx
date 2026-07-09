"use client";

import { useState } from "react";
import { Controller, useFieldArray, useForm, type Path } from "react-hook-form";
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
import { Trip, TripCategory } from "@/lib/api/types";
import { tripSchema, TripFormValues } from "@/lib/validation/trip";
import { createTrip, updateTrip } from "@/app/[locale]/(admin)/dashboard/trips/actions";

const CATEGORIES: TripCategory[] = ["day-trip", "liveaboard", "snorkeling"];
const LOCALE_LABELS: Record<string, string> = {
  en: "EN",
  de: "DE",
  ru: "RU",
  it: "IT",
};

function emptyTranslated() {
  return { en: "", de: "", ru: "", it: "" };
}

export default function TripForm({ trip }: { trip?: Trip | null }) {
  const router = useRouter();
  const t = useTranslations("Dashboard");
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: trip
      ? {
          category: trip.category,
          durationDays: trip.durationDays,
          imagesText: trip.images.join(", "),
          itinerary: trip.itinerary,
          cabinPricing: trip.cabinPricing,
          title: trip.title,
          summary: trip.summary,
          description: trip.description,
        }
      : {
          category: "day-trip",
          durationDays: 1,
          imagesText: "",
          itinerary: [
            { day: 1, title: emptyTranslated(), description: emptyTranslated() },
          ],
          cabinPricing: [
            { id: crypto.randomUUID(), label: emptyTranslated(), priceUsd: 0 },
          ],
          title: emptyTranslated(),
          summary: emptyTranslated(),
          description: emptyTranslated(),
        },
  });

  const itineraryArray = useFieldArray({ control, name: "itinerary" });
  const cabinArray = useFieldArray({ control, name: "cabinPricing" });

  async function onSubmit(values: TripFormValues) {
    setServerError(null);
    const payload = {
      category: values.category,
      durationDays: values.durationDays,
      images: values.imagesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      itinerary: values.itinerary,
      cabinPricing: values.cabinPricing,
      title: values.title,
      summary: values.summary,
      description: values.description,
    };

    try {
      if (trip) {
        await updateTrip(trip.id, payload);
      } else {
        await createTrip(payload);
      }
      router.push("/dashboard/trips");
    } catch {
      setServerError(t("noResults"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-3xl flex-col gap-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label>Category</Label>
          <Controller
            control={control}
            name="category"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="durationDays">Duration (days)</Label>
          <Input
            id="durationDays"
            type="number"
            step="1"
            {...register("durationDays", { valueAsNumber: true })}
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
                {...register(`title.${loc}` as Path<TripFormValues>)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`summary-${loc}`}>Summary</Label>
              <Input
                id={`summary-${loc}`}
                {...register(`summary.${loc}` as Path<TripFormValues>)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`description-${loc}`}>Description</Label>
              <Textarea
                id={`description-${loc}`}
                rows={4}
                {...register(`description.${loc}` as Path<TripFormValues>)}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <div className="flex flex-col gap-3 rounded-xs border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <Label>Itinerary</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              itineraryArray.append({
                day: itineraryArray.fields.length + 1,
                title: emptyTranslated(),
                description: emptyTranslated(),
              })
            }
          >
            Add day
          </Button>
        </div>

        {itineraryArray.fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-2 rounded-xs border border-white/10 p-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor={`itinerary-${index}-day`}>Day</Label>
                <Input
                  id={`itinerary-${index}-day`}
                  type="number"
                  className="w-20"
                  {...register(
                    `itinerary.${index}.day` as Path<TripFormValues>,
                    { valueAsNumber: true },
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => itineraryArray.remove(index)}
              >
                Remove
              </Button>
            </div>
            {routing.locales.map((loc) => (
              <div
                key={loc}
                className="grid grid-cols-[3rem_1fr] items-start gap-2"
              >
                <span className="pt-2 text-xs text-muted-foreground">
                  {LOCALE_LABELS[loc]}
                </span>
                <div className="flex flex-col gap-1.5">
                  <Input
                    placeholder="Title"
                    {...register(
                      `itinerary.${index}.title.${loc}` as Path<TripFormValues>,
                    )}
                  />
                  <Textarea
                    placeholder="Description"
                    rows={2}
                    {...register(
                      `itinerary.${index}.description.${loc}` as Path<TripFormValues>,
                    )}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 rounded-xs border border-white/10 p-4">
        <div className="flex items-center justify-between">
          <Label>Cabin Pricing</Label>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              cabinArray.append({
                id: crypto.randomUUID(),
                label: emptyTranslated(),
                priceUsd: 0,
              })
            }
          >
            Add tier
          </Button>
        </div>

        {cabinArray.fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-col gap-2 rounded-xs border border-white/10 p-3"
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Label htmlFor={`cabinPricing-${index}-priceUsd`}>
                  Price (USD)
                </Label>
                <Input
                  id={`cabinPricing-${index}-priceUsd`}
                  type="number"
                  className="w-24"
                  {...register(
                    `cabinPricing.${index}.priceUsd` as Path<TripFormValues>,
                    { valueAsNumber: true },
                  )}
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => cabinArray.remove(index)}
              >
                Remove
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {routing.locales.map((loc) => (
                <Input
                  key={loc}
                  placeholder={`Label (${LOCALE_LABELS[loc]})`}
                  {...register(
                    `cabinPricing.${index}.label.${loc}` as Path<TripFormValues>,
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {t("save")}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/dashboard/trips")}
        >
          {t("cancel")}
        </Button>
      </div>
    </form>
  );
}
