import { z } from "zod";

const translatedString = z.object({
  en: z.string().min(1, "Required"),
  de: z.string().min(1, "Required"),
  ru: z.string().min(1, "Required"),
  it: z.string().min(1, "Required"),
});

export const courseSchema = z.object({
  level: z.enum(["beginner", "advanced", "professional"]),
  priceUsd: z.number().positive(),
  durationDays: z.number().positive(),
  // Kept as free text (not z.number()) so an empty field doesn't fail
  // validation as NaN — converted to an optional number at submit time.
  minAgeText: z.string(),
  maxDepthMetersText: z.string(),
  imagesText: z.string(),
  title: translatedString,
  summary: translatedString,
  description: translatedString,
});

export type CourseFormValues = z.infer<typeof courseSchema>;
