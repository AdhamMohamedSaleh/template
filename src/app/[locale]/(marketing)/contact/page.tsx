import { getLocale, getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import PageBanner from "@/components/layout/PageBanner";
import ContactInquiryForm from "@/components/contact/ContactInquiryForm";
import Facebook from "@/components/icons/Facebook";
import Instagram from "@/components/icons/Instagram";
import Twitter from "@/components/icons/Twitter";
import TikTok from "@/components/icons/TikTok";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";

export default async function ContactPage() {
  const t = await getTranslations("ContactPage");
  const tNav = await getTranslations("Nav");
  const locale = (await getLocale()) as Locale;
  const contactInfo = await api.contactInfo.get();

  const socialLinks = [
    { href: contactInfo.facebookUrl, label: "Facebook" },
    { href: contactInfo.instagramUrl, label: "Instagram" },
    { href: contactInfo.twitterUrl, label: "Twitter" },
    { href: contactInfo.tiktokUrl, label: "TikTok" },
  ];

  return (
    <div>
      <PageBanner
        image="/images/page-banner-contact.svg"
        title={t("pageHeading")}
        description={t("pageSubheading")}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("contact") },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="text-lg lg:text-3xl">{t("infoHeading")}</h2>

              <div className="mt-6 flex flex-col gap-4 text-muted-foreground">
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 hover:text-foreground"
                >
                  <Phone className="size-8 shrink-0 text-teal" aria-hidden />
                  {contactInfo.phone}
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 hover:text-foreground"
                >
                  <Mail className="size-8 shrink-0 text-teal" aria-hidden />
                  {contactInfo.email}
                </a>
                <div className="flex items-center gap-3">
                  <MapPin className="size-8 shrink-0 text-teal" aria-hidden />
                  {contactInfo.address[locale]}
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="size-8 shrink-0 text-teal" aria-hidden />
                  {contactInfo.hours[locale]}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg lg:text-3xl">{t("formHeading")}</h2>
              <div className="mt-6">
                <ContactInquiryForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
