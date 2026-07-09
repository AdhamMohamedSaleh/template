import { z } from "zod";

const translatedString = z.object({
  en: z.string().min(1, "Required"),
  de: z.string().min(1, "Required"),
  ru: z.string().min(1, "Required"),
  it: z.string().min(1, "Required"),
});

export const staticPageSchema = z.object({
  slug: z.string().min(1, "Required"),
  title: translatedString,
  bodyMarkdown: translatedString,
});

export type StaticPageFormValues = z.infer<typeof staticPageSchema>;
