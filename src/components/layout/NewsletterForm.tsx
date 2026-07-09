"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Mail, Send } from "lucide-react";
import {
  subscribeToNewsletter,
  type NewsletterState,
} from "@/lib/actions/newsletter";

const initialState: NewsletterState = {};

export default function NewsletterForm() {
  const t = useTranslations("Footer");
  const [state, formAction, isPending] = useActionState(
    subscribeToNewsletter,
    initialState,
  );

  if (state.success) {
    return <p className="text-sm text-ocean-300">{t("subscribeSuccess")}</p>;
  }

  return (
    <form action={formAction} className="flex flex-col gap-2.5">
      <div className="relative">
        <Mail
          className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-white/40"
          aria-hidden
        />
        <input
          type="email"
          name="email"
          required
          placeholder={t("emailPlaceholder")}
          className="w-full rounded-xs border border-white/15 bg-white/5 py-2 pr-3 pl-9 text-white placeholder:text-white/40 outline-none transition-colors focus:border-white/30"
        />
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="flex items-center justify-center gap-2.5 cursor-pointer rounded-xs bg-ocean-500 py-2 font-medium text-white transition-colors hover:bg-ocean-500/80 disabled:opacity-50"
      >
        {t("subscribe")}
        <Send className="size-5" aria-hidden />
      </button>
      {state.error && (
        <p className="text-xs text-destructive">{t("subscribeError")}</p>
      )}
    </form>
  );
}
