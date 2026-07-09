import { bookings } from "@/lib/data/bookings";
import { createCollectionHandlers } from "@/lib/api/route-factory";

// Bookings are read-only from this route's perspective — no POST here.
// Bookings are created by the (not-yet-built) public booking flow, out of
// scope for this pass. Only the GET half is re-exported.
export const { GET } = createCollectionHandlers(bookings);
