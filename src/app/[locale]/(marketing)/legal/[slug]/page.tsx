import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";
import ReactMarkdown from "react-markdown";
import { api } from "@/lib/api";
import { Locale } from "@/lib/api/types";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await api.staticPages.getBySlug(slug);

  if (!page) notFound();

  const locale = (await getLocale()) as Locale;

  return (
    <div className="container mx-auto max-w-3xl px-4 py-16">
      <h1 className="mb-6">{page.title[locale]}</h1>
      <div className="[&_h2]:mt-6 [&_h2]:mb-2 [&_p]:mb-3">
        <ReactMarkdown>{page.bodyMarkdown[locale]}</ReactMarkdown>
      </div>
    </div>
  );
}
