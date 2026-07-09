import { z } from "zod";

const translatedString = z.object({
  en: z.string().min(1, "Required"),
  de: z.string().min(1, "Required"),
  ru: z.string().min(1, "Required"),
  it: z.string().min(1, "Required"),
});

export const contactInfoSchema = z.object({
  phone: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  address: translatedString,
  hours: translatedString,
  facebookUrl: z.string().url("Invalid URL").or(z.literal("")),
  instagramUrl: z.string().url("Invalid URL").or(z.literal("")),
  twitterUrl: z.string().url("Invalid URL").or(z.literal("")),
  tiktokUrl: z.string().url("Invalid URL").or(z.literal("")),
});

export type ContactInfoFormValues = z.infer<typeof contactInfoSchema>;
