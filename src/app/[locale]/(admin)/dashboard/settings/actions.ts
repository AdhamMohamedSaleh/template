"use server";

import { updateTag } from "next/cache";
import { api } from "@/lib/api";
import { ContactInfo } from "@/lib/api/types";

export async function updateContactInfo(input: Partial<ContactInfo>) {
  const updated = await api.contactInfo.update(input);
  updateTag("contact-info");
  return updated;
}
