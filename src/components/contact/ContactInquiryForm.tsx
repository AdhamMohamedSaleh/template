"use client";

import { useActionState } from "react";
import { useTranslations } from "next-intl";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  submitContactInquiry,
  type ContactInquiryState,
} from "@/lib/actions/contact-inquiry";

const initialState: ContactInquiryState = {};

export default function ContactInquiryForm() {
  const t = useTranslations("ContactPage");
  const [state, formAction, isPending] = useActionState(
    submitContactInquiry,
    initialState,
  );

  if (state.success) {
    return (
      <p className="rounded-lg bg-card p-6 text-teal shadow-lg ring-1 ring-black/5">
        {t("successMessage")}
      </p>
    );
  }

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 rounded-lg bg-card p-6 shadow-lg ring-1 ring-black/5"
    >
      <div className="flex flex-col gap-1.5">
        <Label htmlFor="name">{t("nameLabel")}</Label>
        <Input id="name" name="name" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="email">{t("emailLabel")}</Label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="subject">{t("subjectLabel")}</Label>
        <Input id="subject" name="subject" />
      </div>

      <div className="flex flex-col gap-1.5">
        <Label htmlFor="message">{t("messageLabel")}</Label>
        <Textarea id="message" name="message" rows={5} required />
      </div>

      {state.error && (
        <p className="text-sm text-destructive">{t("errorMessage")}</p>
      )}

      <Button type="submit" variant="ocean" size="lg" disabled={isPending}>
        {isPending ? t("sending") : t("send")}
      </Button>
    </form>
  );
}
