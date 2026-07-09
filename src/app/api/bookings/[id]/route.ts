import { bookings } from "@/lib/data/bookings";
import { createItemHandlers } from "@/lib/api/route-factory";

// Status updates only — no DELETE re-exported (bookings aren't deletable in this pass).
export const { GET, PATCH } = createItemHandlers(bookings);
