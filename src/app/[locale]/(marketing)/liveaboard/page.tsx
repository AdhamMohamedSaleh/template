import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Ruler, BedDouble, Users, Calendar, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import PageBanner from "@/components/layout/PageBanner";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";

export default async function LiveaboardsPage() {
  const t = await getTranslations("LiveaboardsPage");
  const tNav = await getTranslations("Nav");
  const locale = (await getLocale()) as Locale;
  const { data: boats } = await api.boats.list({ pageSize: 100 });

  const specs = (boat: (typeof boats)[number]) => [
    { Icon: Ruler, label: t("specsLength"), value: `${boat.lengthMeters}m` },
    { Icon: BedDouble, label: t("specsCabins"), value: boat.cabins },
    { Icon: Users, label: t("specsCapacity"), value: boat.capacity },
    { Icon: Calendar, label: t("specsBuilt"), value: boat.builtYear },
  ];

  return (
    <div>
      <PageBanner
        image="/images/page-banner-liveaboards.svg"
        title={t("pageHeading")}
        description={t("pageSubheading")}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("trips"), href: "/trips#liveaboard" },
          { label: t("pageHeading") },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto flex flex-col gap-20 px-4 md:gap-28">
          {boats.map((boat) => (
            <div
              key={boat.id}
              className="flex flex-col gap-8 md:flex-row md:gap-16 md:even:flex-row-reverse"
            >
              <div className="relative aspect-4/3 w-full overflow-hidden rounded-sm md:w-1/2">
                <Image
                  fill
                  src={boat.images[0]}
                  alt={boat.name}
                  className="object-cover"
                />
              </div>

              <div className="w-full md:w-1/2">
                <h2>{boat.name}</h2>
                <p className="mt-3 text-muted-foreground">
                  {boat.summary[locale]}
                </p>

                <div className="mt-6 gap-4 flex flex-wrap justify-between mr-16">
                  {specs(boat).map(({ Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-2.5">
                      <Icon className="size-7.5 text-teal" aria-hidden />
                      <div className="flex flex-col">
                        <span className="font-semibold text-heading">
                          {value}
                        </span>

                        <span className="text-muted-foreground">{label}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-muted-foreground">
                  {boat.description[locale]}
                </p>

                <div className="mt-6">
                  <p className="font-semibold tracking-wide text-heading uppercase">
                    {t("amenitiesHeading")}
                  </p>
                  <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {boat.amenities.map((amenity) => (
                      <li
                        key={amenity[locale]}
                        className="flex items-center gap-2 text-muted-foreground"
                      >
                        <Check
                          className="size-4 shrink-0 text-teal"
                          aria-hidden
                        />
                        {amenity[locale]}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button
                  asChild
                  size="xl"
                  variant="ocean"
                  className="mt-8 rounded-xl"
                >
                  <Link href="/trips#liveaboard">{t("ctaButton")}</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
