"use server";

import { revalidatePath, updateTag } from "next/cache";
import { api } from "@/lib/api";
import { Course, CreateInput, UpdateInput } from "@/lib/api/types";

export async function createCourse(input: CreateInput<Course>) {
  const created = await api.courses.create(input);
  updateTag("courses");
  revalidatePath("/dashboard/courses");
  return created;
}

export async function updateCourse(id: string, input: UpdateInput<Course>) {
  const updated = await api.courses.update(id, input);
  updateTag("courses");
  revalidatePath("/dashboard/courses");
  return updated;
}

export async function removeCourse(id: string) {
  await api.courses.remove(id);
  updateTag("courses");
  revalidatePath("/dashboard/courses");
}
