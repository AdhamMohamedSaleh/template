"use server";

import { revalidatePath, updateTag } from "next/cache";
import { api } from "@/lib/api";
import { Trip, CreateInput, UpdateInput } from "@/lib/api/types";

export async function createTrip(input: CreateInput<Trip>) {
  const created = await api.trips.create(input);
  updateTag("trips");
  revalidatePath("/dashboard/trips");
  return created;
}

export async function updateTrip(id: string, input: UpdateInput<Trip>) {
  const updated = await api.trips.update(id, input);
  updateTag("trips");
  revalidatePath("/dashboard/trips");
  return updated;
}

export async function removeTrip(id: string) {
  await api.trips.remove(id);
  updateTag("trips");
  revalidatePath("/dashboard/trips");
}
