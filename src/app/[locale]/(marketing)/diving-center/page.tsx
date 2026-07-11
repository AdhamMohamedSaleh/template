import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/layout/PageBanner";
import { divingCenterFeatures } from "@/lib/data/diving-center-features";
import { Locale } from "@/lib/api/types";

export default async function DivingCenterPage() {
  const t = await getTranslations("DivingCenterPage");
  const tNav = await getTranslations("Nav");
  const locale = (await getLocale()) as Locale;

  return (
    <div>
      <PageBanner
        image="/images/page-banner-diving-center.svg"
        title={t("pageHeading")}
        description={t("pageSubheading")}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("dailyDiving") },
        ]}
      />

      <div className="overflow-hidden py-16 md:py-24">
        <div className="container mx-auto flex flex-col gap-20 px-4 md:gap-28">
          {divingCenterFeatures.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center gap-8 md:flex-row md:gap-16 md:even:flex-row-reverse md:odd:-ml-40 md:even:-mr-40"
            >
              <div className="relative aspect-5/3 w-full overflow-hidden rounded-lg md:w-1/2">
                <Image
                  fill
                  src={feature.image}
                  alt={feature.title[locale]}
                  className="object-cover"
                />
              </div>

              <div className="w-full md:max-w-3xl md:w-1/2">
                <h3>{feature.title[locale]}</h3>
                <p className="mt-4 text-muted-foreground">
                  {feature.description[locale]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
