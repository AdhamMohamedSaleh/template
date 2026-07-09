"use client";

import { useState } from "react";
import { useForm, type Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { routing } from "@/i18n/routing";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import LocaleTabsList from "@/components/dashboard/LocaleTabsList";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ContactInfo } from "@/lib/api/types";
import {
  contactInfoSchema,
  ContactInfoFormValues,
} from "@/lib/validation/contact-info";
import { updateContactInfo } from "@/app/[locale]/(admin)/dashboard/settings/actions";

export default function ContactInfoForm({
  contactInfo,
}: {
  contactInfo: ContactInfo;
}) {
  const t = useTranslations("Dashboard");
  const [serverError, setServerError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactInfoFormValues>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: {
      phone: contactInfo.phone,
      email: contactInfo.email,
      address: contactInfo.address,
      hours: contactInfo.hours,
      facebookUrl: contactInfo.facebookUrl,
      instagramUrl: contactInfo.instagramUrl,
      twitterUrl: contactInfo.twitterUrl,
      tiktokUrl: contactInfo.tiktokUrl,
    },
  });

  async function onSubmit(values: ContactInfoFormValues) {
    setServerError(null);
    setSaved(false);
    try {
      await updateContactInfo(values);
      setSaved(true);
    } catch {
      setServerError(t("noResults"));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex max-w-2xl flex-col gap-6"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" {...register("phone")} />
          {errors.phone && (
            <p className="text-sm text-destructive">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" {...register("email")} />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="facebookUrl">Facebook URL</Label>
          <Input id="facebookUrl" {...register("facebookUrl")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="instagramUrl">Instagram URL</Label>
          <Input id="instagramUrl" {...register("instagramUrl")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="twitterUrl">Twitter / X URL</Label>
          <Input id="twitterUrl" {...register("twitterUrl")} />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="tiktokUrl">TikTok URL</Label>
          <Input id="tiktokUrl" {...register("tiktokUrl")} />
        </div>
      </div>

      <Tabs defaultValue={routing.locales[0]}>
        <LocaleTabsList />
        {routing.locales.map((loc) => (
          <TabsContent key={loc} value={loc} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`address-${loc}`}>Address</Label>
              <Input
                id={`address-${loc}`}
                {...register(`address.${loc}` as Path<ContactInfoFormValues>)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`hours-${loc}`}>Opening Hours</Label>
              <Input
                id={`hours-${loc}`}
                {...register(`hours.${loc}` as Path<ContactInfoFormValues>)}
              />
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {serverError && <p className="text-sm text-destructive">{serverError}</p>}
      {saved && <p className="text-sm text-teal">Saved.</p>}

      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {t("save")}
        </Button>
      </div>
    </form>
  );
}
