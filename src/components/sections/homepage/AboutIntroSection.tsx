import { useTranslations } from "next-intl";

const partners = ["PADI", "SSI", "TDI", "EFR"] as const;

export default function AboutIntroSection() {
  const t = useTranslations("Home");

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-20">
          {/* Image side */}
          <div className="relative w-full max-w-md shrink-0 lg:w-[45%] lg:max-w-none">
            <div className="relative aspect-4/5 overflow-hidden rounded-xs shadow-xl">
              <img
                src="/images/about-main.svg"
                alt={t("introMainImageAlt")}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Overlapping secondary image */}
            <div className="absolute -right-4 -bottom-8 w-32 overflow-hidden rounded-xs border-4 border-background shadow-lg sm:-right-8 sm:w-44">
              <img
                src="/images/about-secondary.svg"
                alt={t("introSecondaryImageAlt")}
                className="aspect-square w-full object-cover"
              />
            </div>

            {/* Floating stat badge */}
            <div className="absolute -top-6 -left-4 rounded-xs bg-card px-5 py-4 shadow-lg ring-1 ring-black/5 sm:-left-8">
              <p className="font-heading text-2xl font-bold text-ocean-700">
                {t("statValue")}
              </p>
              <p className="text-xs text-muted-foreground">
                {t("statLabel")}
              </p>
            </div>

            {/* Decorative dot grid accent */}
            <div
              aria-hidden
              className="absolute -top-10 -right-10 -z-10 grid grid-cols-4 gap-2 opacity-40"
            >
              {Array.from({ length: 16 }).map((_, i) => (
                <span key={i} className="size-1.5 rounded-full bg-ocean-500" />
              ))}
            </div>
          </div>

          {/* Content side */}
          <div className="w-full lg:flex-1">
            <p className="mb-3 text-sm font-semibold tracking-[0.2em] text-accent uppercase">
              {t("introEyebrow")}
            </p>
            <h2 className="mb-4">{t("introHeading")}</h2>
            <p className="max-w-xl text-muted-foreground">
              {t("introDescription")}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              {partners.map((partner) => (
                <span
                  key={partner}
                  className="text-lg font-bold tracking-wide text-muted-foreground/70"
                >
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
