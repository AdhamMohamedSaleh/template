// The one seam: every page/Server Action imports `{ api }` from here,
// never `./client` directly. Swapping to the real Laravel backend later
// means changing the fetch target inside client.ts — nothing here changes.
export { api } from "./client";
export * from "./types";
