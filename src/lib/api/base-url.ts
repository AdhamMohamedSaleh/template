// Next.js requires absolute URLs for server-side fetch() — relative URLs
// don't resolve in Server Components / Route Handlers / Server Actions.
export function getBaseUrl() {
  return process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
}
