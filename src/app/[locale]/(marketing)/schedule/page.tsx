import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageBanner from "@/components/layout/PageBanner";
import { schedule } from "@/lib/data/schedule";
import { Locale } from "@/lib/api/types";

export default async function SchedulePage() {
  const t = await getTranslations("SchedulePage");
  const tDays = await getTranslations("Days");
  const tNav = await getTranslations("Nav");
  const locale = (await getLocale()) as Locale;

  return (
    <div>
      <PageBanner
        image="/images/page-banner-schedule.svg"
        title={t("pageHeading")}
        description={t("pageSubheading")}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("dailyDiving") },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
            <Table>
              <TableHeader className="bg-ocean-950">
                <TableRow className="border-none hover:bg-transparent">
                  <TableHead className="h-auto px-6 py-4 text-white/70">
                    {t("dayHeader")}
                  </TableHead>
                  <TableHead className="h-auto px-6 py-4 text-white/70">
                    {t("timeHeader")}
                  </TableHead>
                  <TableHead className="h-auto px-6 py-4 text-white/70">
                    {t("tripHeader")}
                  </TableHead>
                  <TableHead className="h-auto px-6 py-4 text-white/70">
                    {t("spotsHeader")}
                  </TableHead>
                  <TableHead className="h-auto px-6 py-4 text-white/70">
                    {t("priceHeader")}
                  </TableHead>
                  <TableHead className="h-auto px-6 py-4 text-right text-white/70">
                    <span className="sr-only">{t("bookNow")}</span>
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {schedule.map((entry) => (
                  <TableRow key={entry.id} className="odd:bg-card even:bg-muted/40">
                    <TableCell className="px-6 py-4 font-semibold text-heading">
                      {tDays(entry.day)}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-nowrap text-muted-foreground">
                      {entry.time} – {entry.endTime}
                    </TableCell>
                    <TableCell className="px-6 py-4 whitespace-normal">
                      <p className="font-medium text-heading">
                        {entry.title[locale]}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {entry.location[locale]}
                      </p>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-muted-foreground">
                      {t("spotsLeft", { count: entry.spots })}
                    </TableCell>
                    <TableCell className="px-6 py-4 font-semibold text-heading">
                      <span className="align-top text-xs">€</span>
                      {entry.priceUsd}
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <Button
                        asChild
                        size="lg"
                        variant="ocean"
                        className="rounded-xl"
                      >
                        <Link href={`/booking?schedule=${entry.id}`}>
                          {t("bookNow")}
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}
