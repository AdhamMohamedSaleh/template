import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import PageBanner from "@/components/layout/PageBanner";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";

export default async function AboutPage() {
  const page = await api.staticPages.getBySlug("about");

  if (!page) notFound();

  const locale = (await getLocale()) as Locale;
  const tNav = await getTranslations("Nav");

  return (
    <div>
      <PageBanner
        image="/images/page-banner-about.svg"
        title={page.title[locale]}
        breadcrumb={[
          { label: tNav("home"), href: "/" },
          { label: tNav("about") },
        ]}
      />

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="[&_h2]:mt-10 [&_h2]:mb-3 [&_h2:first-child]:mt-0 [&_p]:text-muted-foreground">
            <ReactMarkdown>{page.bodyMarkdown[locale]}</ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
