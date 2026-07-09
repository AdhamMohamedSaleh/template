import { getLocale, getTranslations } from "next-intl/server";
import PageBanner from "@/components/layout/PageBanner";
import DiveSitesExplorer from "@/components/dive-sites/DiveSitesExplorer";
import { diveSites } from "@/lib/data/dive-sites";
import { Locale } from "@/lib/api/types";

export default async function DiveSitesPage() {
  const t = await getTranslations("DiveSitesPage");
  const tNav = await getTranslations("Nav");
  const locale = (await getLocale()) as Locale;

  return (
    <div>
      <PageBanner
        image="/images/page-banner-dive-sites.svg"
        title={t("pageHeading")}
        description={t("pageSubheading")}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("dailyDiving") },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <DiveSitesExplorer sites={diveSites} locale={locale} />
        </div>
      </div>
    </div>
  );
}
