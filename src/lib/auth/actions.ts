"use server";

import { cookies } from "next/headers";
import { redirect } from "@/i18n/navigation";
import { MOCK_ADMIN_EMAIL, MOCK_ADMIN_PASSWORD, SESSION_COOKIE } from "./constants";

export interface LoginState {
  error?: string;
}

export async function loginAction(
  locale: string,
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (email !== MOCK_ADMIN_EMAIL || password !== MOCK_ADMIN_PASSWORD) {
    return { error: "Invalid email or password." };
  }

  const session = { email, name: "Aquared Admin" };
  const encoded = Buffer.from(JSON.stringify(session)).toString("base64");
  const store = await cookies();
  store.set(SESSION_COOKIE, encoded, {
    httpOnly: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 8,
    path: "/",
  });

  redirect({ href: "/dashboard", locale });
  return {};
}

export async function logoutAction(locale: string) {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
  redirect({ href: "/login", locale });
}
