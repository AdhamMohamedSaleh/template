import { z } from "zod";

const translatedString = z.object({
  en: z.string().min(1, "Required"),
  de: z.string().min(1, "Required"),
  ru: z.string().min(1, "Required"),
  it: z.string().min(1, "Required"),
});

export const activitySchema = z.object({
  priceUsd: z.number().positive(),
  durationHours: z.number().positive(),
  imagesText: z.string(),
  title: translatedString,
  summary: translatedString,
  description: translatedString,
});

export type ActivityFormValues = z.infer<typeof activitySchema>;
