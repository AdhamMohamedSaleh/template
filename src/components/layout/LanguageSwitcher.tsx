"use client";

import { Fragment, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { motion, AnimatePresence } from "framer-motion";
import ArrowUpDown from "@/components/icons/ArrowUpDown";
import { useHoverOpen } from "@/lib/use-hover-open";
import HoverDropdown from "@/components/layout/HoverDropdown";
import { GB, DE, RU, IT } from "country-flag-icons/react/3x2";

const localeData: Record<
  (typeof routing.locales)[number],
  { label: string; Flag: React.ComponentType<{ className?: string }> }
> = {
  en: { label: "EN", Flag: GB },
  de: { label: "DE", Flag: DE },
  ru: { label: "RU", Flag: RU },
  it: { label: "IT", Flag: IT },
};

interface Props {
  variant?: "desktop" | "mobile";
}

export default function LanguageSwitcher({ variant = "desktop" }: Props) {
  const locale = useLocale();
  const t = useTranslations("LanguageSwitcher");
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const hover = useHoverOpen();
  const { open, setOpen } = hover;

  const current = localeData[locale as keyof typeof localeData];
  const CurrentFlag = current.Flag;

  function switchLocale(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname || "/", { locale: nextLocale });
    });
    setOpen(false);
  }

  if (variant === "mobile") {
    return (
      <div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="w-full flex items-center justify-between font-medium py-3 border-b border-white/10 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2">
            <CurrentFlag className="w-5 h-5 rounded-xs object-cover" />
            {current.label}
          </span>
          <ArrowUpDown down={open} showBase={false} size={16} />
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.65, 0, 0.35, 1] }}
              className="overflow-hidden"
            >
              <div className="pl-3 py-1 flex flex-col gap-1">
                {routing.locales.map((loc, index) => {
                  const { Flag, label } = localeData[loc];
                  return (
                    <Fragment key={loc}>
                      <button
                        onClick={() => switchLocale(loc)}
                        disabled={isPending}
                        className={`flex cursor-pointer items-center gap-2 py-2 text-left transition-colors ${
                          loc === locale
                            ? "text-brand-light font-medium"
                            : "text-white/60 hover:text-white"
                        }`}
                      >
                        <Flag className="w-5 h-5 rounded-xs object-cover" />
                        {label}
                      </button>
                      {index < routing.locales.length - 1 && (
                        <div aria-hidden className="h-px bg-white/10" />
                      )}
                    </Fragment>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <HoverDropdown
      hover={hover}
      align="start"
      triggerClassName="flex items-center gap-1.5 px-2 py-0.5 rounded-xs hover:bg-white/10 cursor-pointer transition-colors"
      contentClassName="w-40"
      renderTrigger={(open) => (
        <>
          <CurrentFlag className="w-5.5 h-5.5 rounded-xs object-cover" />
          <span className="font-medium">{current.label}</span>
          <ArrowUpDown down={!open} showBase={false} size={16} />
        </>
      )}
    >
      <div aria-label={t("label")}>
        {routing.locales.map((loc, index) => {
          const { Flag, label } = localeData[loc];
          return (
            <Fragment key={loc}>
              <button
                type="button"
                onClick={() => switchLocale(loc)}
                disabled={isPending}
                className={`flex w-full cursor-pointer items-center gap-2 rounded-xs px-2 py-0.75 transition-colors hover:bg-white/10 ${
                  loc === locale
                    ? "text-brand-light font-semibold"
                    : "text-white"
                }`}
              >
                <Flag className="w-5 h-5 rounded-xs object-cover" />
                {label}
              </button>
              {index < routing.locales.length - 1 && (
                <div aria-hidden className="my-1 h-px bg-white/10" />
              )}
            </Fragment>
          );
        })}
      </div>
    </HoverDropdown>
  );
}
