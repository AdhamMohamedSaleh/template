import { getLocale, getTranslations } from "next-intl/server";
import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import SeaConditions from "@/components/layout/SeaConditions";
import NewsletterForm from "@/components/layout/NewsletterForm";
import Facebook from "@/components/icons/Facebook";
import Instagram from "@/components/icons/Instagram";
import Twitter from "@/components/icons/Twitter";
import TikTok from "@/components/icons/TikTok";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";

export default async function Footer() {
  const t = await getTranslations();
  const locale = (await getLocale()) as Locale;
  const contactInfo = await api.contactInfo.get();

  const socialLinks = [
    { href: contactInfo.facebookUrl, label: "Facebook" },
    { href: contactInfo.instagramUrl, label: "Instagram" },
    { href: contactInfo.twitterUrl, label: "Twitter" },
    { href: contactInfo.tiktokUrl, label: "TikTok" },
  ];

  return (
    <footer className="border-t border-white/10 bg-ocean-950 text-white/70">
      <div className="container mx-auto px-4 py-14">
        <div className="flex justify-between gap-10 lg:grid-cols-5">
          {/* <div>
            <p className="font-semibold tracking-widest text-white">Aquared</p>
            <p className="mt-1">{contactInfo.address[locale]}</p>
            <div className="mt-6">
              <SeaConditions />
            </div>
          </div> */}

          <div>
            <p className="text-xl mb-4 font-semibold tracking-widest text-white">
              {t("Footer.followUs")}
            </p>

            <div className="mt-3 flex flex-col gap-2.5 *:w-fit">
              {socialLinks.map(({ href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:underline"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xl mb-4 font-semibold tracking-widest text-white">
              {t("Footer.quickLinks")}
            </p>
            <nav className="flex flex-col gap-2.5 *:w-fit">
              <Link href="/about" className="hover:underline hover:text-white">
                {t("Nav.about")}
              </Link>
              <Link
                href="/contact"
                className="hover:underline hover:text-white"
              >
                {t("Nav.contact")}
              </Link>
              <Link href="/blog" className="hover:underline hover:text-white">
                {t("Nav.blog")}
              </Link>
              <Link
                href="/legal/terms-and-conditions"
                className="hover:underline hover:text-white"
              >
                {t("Footer.terms")}
              </Link>
              <Link
                href="/legal/privacy-policy"
                className="hover:underline hover:text-white"
              >
                {t("Footer.privacy")}
              </Link>
            </nav>
          </div>

          <div>
            <p className="text-xl mb-4 font-semibold tracking-widest text-white">
              {t("Footer.getInTouch")}
            </p>
            <div className="flex flex-col gap-3 *:w-fit">
              <a
                href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2.5 hover:underline hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-ocean-300" aria-hidden />
                {contactInfo.phone}
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="flex items-center gap-2.5 hover:underline hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-ocean-300" aria-hidden />
                {contactInfo.email}
              </a>
              <div className="flex items-center gap-2.5">
                <MapPin
                  className="size-4 shrink-0 text-ocean-300"
                  aria-hidden
                />
                {contactInfo.address[locale]}
              </div>
            </div>
          </div>

          <div>
            <p className="text-xl mb-4 font-semibold tracking-widest text-white">
              {t("Footer.keepInTouch")}
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 px-4 py-4 text-center text-white/50">
        © {new Date().getFullYear()} Aquared — {t("Footer.rights")}
      </div>
    </footer>
  );
}
