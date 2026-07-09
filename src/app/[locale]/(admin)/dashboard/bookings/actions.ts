"use server";

import { revalidatePath, updateTag } from "next/cache";
import { api } from "@/lib/api";
import { BookingStatus } from "@/lib/api/types";

export async function updateBookingStatusAction(
  id: string,
  status: BookingStatus,
) {
  const updated = await api.bookings.updateStatus(id, status);
  updateTag("bookings");
  revalidatePath("/dashboard/bookings");
  revalidatePath(`/dashboard/bookings/${id}`);
  return updated;
}
