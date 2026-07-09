"use client";

import { useActionState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { loginAction, LoginState } from "@/lib/auth/actions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

const initialState: LoginState = {};

export default function LoginForm() {
  const locale = useLocale();
  const t = useTranslations("Auth");
  const [state, formAction, isPending] = useActionState(
    loginAction.bind(null, locale),
    initialState,
  );

  return (
    <form action={formAction} className="flex w-full flex-col gap-4">
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">{t("email")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="password">{t("password")}</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
        />
      </div>

      {state.error && (
        <p className="text-sm text-destructive">{t("invalidCredentials")}</p>
      )}

      <Button type="submit" disabled={isPending} className="mt-2">
        {t("signIn")}
      </Button>
    </form>
  );
}
