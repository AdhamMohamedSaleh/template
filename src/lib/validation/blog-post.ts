import { z } from "zod";

const translatedString = z.object({
  en: z.string().min(1, "Required"),
  de: z.string().min(1, "Required"),
  ru: z.string().min(1, "Required"),
  it: z.string().min(1, "Required"),
});

export const blogPostSchema = z.object({
  status: z.enum(["draft", "published"]),
  authorName: z.string().min(1, "Required"),
  coverImage: z.string(),
  title: translatedString,
  excerpt: translatedString,
  bodyMarkdown: translatedString,
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
