import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function HomeHero() {
  const t = useTranslations("Home");

  return (
    <section className="relative -mt-20 h-screen overflow-hidden md:-mt-28">
      {/* Background Image */}
      <Image
        fill
        priority
        sizes="100vw"
        src="/images/banner-desktop.svg"
        alt={t("heroImageAlt")}
        className="object-cover"
      />

      {/* Overlay from bottom to top */}
      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative mt-44 z-10 flex h-full items-center text-background">
        <div className="mx-auto w-full container">
          <div className="flex justify-between items-end">
            <div className="w-1/2">
              <p className="mb-2 ml-1 text-sm font-medium text-brand uppercase tracking-[0.3em]">
                {t("heroEyebrow")}
              </p>

              <h1 className="text-background">{t("heroTitle")}</h1>

              <p className="ml-1">{t("heroSubtitle")}</p>
            </div>

            <Button size="xl" variant="dark" className="rounded-xl">
              <Link href="/courses">{t("ctaCourses")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
