import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Badge } from "@/components/ui/badge";
import EntityTable from "@/components/dashboard/EntityTable";
import { api } from "@/lib/api";
import { Booking, BookingStatus } from "@/lib/api/types";

const STATUS_VARIANT: Record<BookingStatus, "default" | "secondary" | "destructive"> = {
  pending: "secondary",
  confirmed: "default",
  cancelled: "destructive",
};

export default async function BookingsListPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;
  const t = await getTranslations("Dashboard");
  const tBookings = await getTranslations("Bookings");
  const { data: bookings } = await api.bookings.list({
    pageSize: 100,
    status: status as BookingStatus | undefined,
  });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1>{t("bookings")}</h1>
        <div className="flex gap-2 text-sm">
          <Link href="/dashboard/bookings" className="text-white/70 hover:text-white">
            All
          </Link>
          <Link href="/dashboard/bookings?status=pending" className="text-white/70 hover:text-white">
            {tBookings("pending")}
          </Link>
          <Link href="/dashboard/bookings?status=confirmed" className="text-white/70 hover:text-white">
            {tBookings("confirmed")}
          </Link>
          <Link href="/dashboard/bookings?status=cancelled" className="text-white/70 hover:text-white">
            {tBookings("cancelled")}
          </Link>
        </div>
      </div>

      <EntityTable<Booking>
        rows={bookings}
        rowKey={(row) => row.id}
        emptyMessage={t("noResults")}
        columns={[
          {
            header: tBookings("customer"),
            cell: (row) => (
              <Link
                href={`/dashboard/bookings/${row.id}`}
                className="hover:underline"
              >
                {row.customerName}
              </Link>
            ),
          },
          { header: tBookings("item"), cell: (row) => row.itemLabel },
          { header: tBookings("date"), cell: (row) => row.date },
          { header: tBookings("guests"), cell: (row) => row.guests },
          {
            header: tBookings("status"),
            cell: (row) => (
              <Badge variant={STATUS_VARIANT[row.status]}>
                {tBookings(row.status)}
              </Badge>
            ),
          },
        ]}
      />
    </div>
  );
}
