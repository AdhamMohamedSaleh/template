import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function CtaBannerSection() {
  const t = useTranslations("Home");

  return (
    <section className="relative overflow-hidden bg-ocean-950 py-20 md:py-28">
      <div
        aria-hidden
        className="absolute -top-24 -right-24 -z-0 grid grid-cols-6 gap-3 opacity-20"
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <span key={i} className="size-1.5 rounded-full bg-ocean-300" />
        ))}
      </div>

      <div className="relative container mx-auto px-4 text-center">
        <h2 className="mx-auto max-w-2xl text-white">{t("ctaHeading")}</h2>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          {t("ctaSubheading")}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            asChild
            size="xl"
            variant="outline-white"
            className="rounded-xl"
          >
            <Link href="/contact">{t("ctaContact")}</Link>
          </Button>
          <Button asChild size="xl" variant="ocean" className="rounded-xl">
            <Link href="/booking">{t("ctaBook")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
