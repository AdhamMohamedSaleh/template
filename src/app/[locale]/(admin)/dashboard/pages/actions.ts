"use server";

import { revalidatePath, updateTag } from "next/cache";
import { api } from "@/lib/api";
import { StaticPage, CreateInput, UpdateInput } from "@/lib/api/types";

export async function createStaticPage(input: CreateInput<StaticPage>) {
  const created = await api.staticPages.create(input);
  updateTag("static-pages");
  revalidatePath("/dashboard/pages");
  return created;
}

export async function updateStaticPage(
  id: string,
  input: UpdateInput<StaticPage>,
) {
  const updated = await api.staticPages.update(id, input);
  updateTag("static-pages");
  revalidatePath("/dashboard/pages");
  return updated;
}

export async function removeStaticPage(id: string) {
  await api.staticPages.remove(id);
  updateTag("static-pages");
  revalidatePath("/dashboard/pages");
}
