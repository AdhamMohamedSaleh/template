"use client";

import { Fragment, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import MenuClose from "@/components/icons/MenuClose";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import DailyDivingNavItem from "@/components/layout/DailyDivingNavItem";
import TripsNavItem from "@/components/layout/TripsNavItem";

const primaryLinks = [
  { href: "/activities", key: "activities" },
  { href: "/blog", key: "blog" },
] as const;

const utilityLinks = [
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export default function Navbar() {
  const t = useTranslations("Nav");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b text-white border-white/10 bg-ocean-950">
      <div className="container mx-auto flex pt-6 pb-5 items-center justify-between px-4">
        <Link href="/" className="font-semibold">
          Aquared
        </Link>

        <div className="flex items-center gap-12">
          <nav className="hidden md:flex items-center gap-3.5">
            <DailyDivingNavItem />
            <span aria-hidden className="h-3 w-px bg-white/15" />

            <Link
              href="/courses"
              className="font-medium transition-colors hover:bg-white/5 px-2 py-0.75 rounded-xs ease-in-out"
            >
              {t("courses")}
            </Link>
            <span aria-hidden className="h-3 w-px bg-white/15" />

            <TripsNavItem />
            <span aria-hidden className="h-3 w-px bg-white/15" />

            {primaryLinks.map((link, index) => (
              <Fragment key={link.key}>
                <Link
                  href={link.href}
                  className="font-medium transition-colors hover:bg-white/5 px-2 py-0.75 rounded-xs ease-in-out"
                >
                  {t(link.key)}
                </Link>
                {index < primaryLinks.length - 1 && (
                  <span aria-hidden className="h-3 w-px bg-white/15" />
                )}
              </Fragment>
            ))}
          </nav>

          <Button
            asChild
            variant="dark"
            size="lg"
            className="hidden md:inline-flex rounded-lg bg-primary-foreground/75 hover:bg-primary-foreground active:bg-primary-foreground/80"
          >
            <Link href="/booking">{t("pricing")}</Link>
          </Button>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden"
          aria-label={open ? t("closeMenu") : t("openMenu")}
        >
          <MenuClose open={open} size={20} />
        </button>
      </div>

      <div className="hidden md:block border-t border-white/10">
        <div
          className={cn(
            "container mx-auto flex justify-end px-4 transition-[padding] duration-300 ease-in-out",
            scrolled ? "py-1" : "py-2",
          )}
        >
          <div className="flex items-center gap-3.5 text-sm">
            {utilityLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className="font-medium transition-colors hover:bg-white/5 px-2 py-0.5 rounded-xs"
              >
                {t(link.key)}
              </Link>
            ))}
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="w-full border-white/10 bg-ocean-950 sm:max-w-xs"
        >
          <SheetTitle className="sr-only">{t("home")}</SheetTitle>
          <SheetDescription className="sr-only">
            {t("navigationMenu")}
          </SheetDescription>

          <div className="flex flex-col gap-1 px-4 pt-10">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-3 font-medium transition-colors"
            >
              {t("home")}
            </Link>

            <DailyDivingNavItem
              variant="mobile"
              onNavigate={() => setOpen(false)}
            />

            <Link
              href="/courses"
              onClick={() => setOpen(false)}
              className="border-b border-white/10 py-3 font-medium transition-colors"
            >
              {t("courses")}
            </Link>

            <TripsNavItem variant="mobile" onNavigate={() => setOpen(false)} />

            {primaryLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 font-medium transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}

            {utilityLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-3 font-medium transition-colors"
              >
                {t(link.key)}
              </Link>
            ))}

            <div className="pt-2">
              <LanguageSwitcher variant="mobile" />
            </div>

            <Button asChild variant="dark" className="mt-4">
              <Link href="/booking" onClick={() => setOpen(false)}>
                {t("pricing")}
              </Link>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
}
