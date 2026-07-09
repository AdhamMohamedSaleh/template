"use client";

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { BookingStatus } from "@/lib/api/types";
import { updateBookingStatusAction } from "@/app/[locale]/(admin)/dashboard/bookings/actions";

const STATUSES: BookingStatus[] = ["pending", "confirmed", "cancelled"];

export default function BookingStatusControl({
  bookingId,
  currentStatus,
}: {
  bookingId: string;
  currentStatus: BookingStatus;
}) {
  const t = useTranslations("Bookings");
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-white/70">
        {t("updateStatus")}
      </span>
      <div className="flex gap-2">
        {STATUSES.map((status) => (
          <Button
            key={status}
            type="button"
            size="sm"
            variant={status === currentStatus ? "primary" : "outline"}
            disabled={isPending}
            onClick={() =>
              startTransition(() => {
                updateBookingStatusAction(bookingId, status);
              })
            }
          >
            {t(status)}
          </Button>
        ))}
      </div>
    </div>
  );
}
