import { useLocale, useTranslations } from "next-intl";
import { Quote, Star } from "lucide-react";
import { testimonials } from "@/lib/data/testimonials";
import type { Locale } from "@/lib/api/types";

export default function TestimonialsSection() {
  const locale = useLocale() as Locale;
  const t = useTranslations("Home");

  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <p className="mb-3 font-semibold tracking-[0.2em] text-accent uppercase">
            {t("testimonialsEyebrow")}
          </p>
          <h2>{t("testimonialsHeading")}</h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col gap-4 rounded-xs bg-card p-6 shadow-lg ring-1 ring-black/5"
            >
              <Quote className="size-7 text-teal/40" aria-hidden />

              <div className="flex gap-0.5">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-gold text-gold"
                    aria-hidden
                  />
                ))}
              </div>

              <p className="flex-1 text-muted-foreground">
                {testimonial.quote[locale]}
              </p>

              <div className="flex items-end justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold text-heading">
                    {testimonial.name}
                  </p>
                  <p className="text-base text-muted-foreground">
                    {testimonial.country}
                  </p>
                </div>
                <span className="rounded-xs bg-muted px-2 py-1 text-sm font-medium text-muted-foreground">
                  {testimonial.context[locale]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
