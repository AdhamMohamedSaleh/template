"use server";

import { revalidatePath, updateTag } from "next/cache";
import { api } from "@/lib/api";
import { Activity, CreateInput, UpdateInput } from "@/lib/api/types";

export async function createActivity(input: CreateInput<Activity>) {
  const created = await api.activities.create(input);
  updateTag("activities");
  revalidatePath("/dashboard/activities");
  return created;
}

export async function updateActivity(
  id: string,
  input: UpdateInput<Activity>,
) {
  const updated = await api.activities.update(id, input);
  updateTag("activities");
  revalidatePath("/dashboard/activities");
  return updated;
}

export async function removeActivity(id: string) {
  await api.activities.remove(id);
  updateTag("activities");
  revalidatePath("/dashboard/activities");
}
