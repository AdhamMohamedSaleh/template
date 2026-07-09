import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookingStatusControl from "@/components/dashboard/bookings/BookingStatusControl";
import { api } from "@/lib/api";

export default async function BookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tBookings = await getTranslations("Bookings");
  const booking = await api.bookings.get(id);

  if (!booking) notFound();

  return (
    <div className="flex max-w-xl flex-col gap-6">
      <Link
        href="/dashboard/bookings"
        className="text-sm text-white/70 hover:text-white"
      >
        &larr; {tBookings("backToList")}
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>{booking.customerName}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2 text-sm text-white/80">
          <p>{booking.customerEmail}</p>
          {booking.customerPhone && <p>{booking.customerPhone}</p>}
          <p>
            {tBookings("item")}: {booking.itemLabel}
          </p>
          <p>
            {tBookings("date")}: {booking.date}
          </p>
          <p>
            {tBookings("guests")}: {booking.guests}
          </p>
          {booking.notes && (
            <p>
              {tBookings("notes")}: {booking.notes}
            </p>
          )}
        </CardContent>
      </Card>

      <BookingStatusControl bookingId={booking.id} currentStatus={booking.status} />
    </div>
  );
}
