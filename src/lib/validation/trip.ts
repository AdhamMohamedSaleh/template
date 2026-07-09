import { z } from "zod";

const translatedString = z.object({
  en: z.string().min(1, "Required"),
  de: z.string().min(1, "Required"),
  ru: z.string().min(1, "Required"),
  it: z.string().min(1, "Required"),
});

const itineraryDaySchema = z.object({
  day: z.number().positive(),
  title: translatedString,
  description: translatedString,
});

const cabinPricingSchema = z.object({
  id: z.string(),
  label: translatedString,
  priceUsd: z.number().positive(),
});

export const tripSchema = z.object({
  category: z.enum(["day-trip", "liveaboard", "snorkeling"]),
  durationDays: z.number().positive(),
  imagesText: z.string(),
  itinerary: z.array(itineraryDaySchema).min(1, "At least one day required"),
  cabinPricing: z
    .array(cabinPricingSchema)
    .min(1, "At least one pricing tier required"),
  title: translatedString,
  summary: translatedString,
  description: translatedString,
});

export type TripFormValues = z.infer<typeof tripSchema>;
