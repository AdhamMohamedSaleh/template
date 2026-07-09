import { cookies } from "next/headers";
import { SESSION_COOKIE } from "./constants";
import { Session } from "./types";

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;

  try {
    return JSON.parse(Buffer.from(raw, "base64").toString("utf8")) as Session;
  } catch {
    return null;
  }
}
