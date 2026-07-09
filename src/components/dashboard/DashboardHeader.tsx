import { getLocale, getTranslations } from "next-intl/server";
import MobileSidebar from "./MobileSidebar";
import UserMenu from "./UserMenu";
import LanguageSwitcher from "@/components/layout/LanguageSwitcher";
import { Session } from "@/lib/auth/types";

export default async function DashboardHeader({
  session,
}: {
  session: Session;
}) {
  const locale = await getLocale();
  const t = await getTranslations("Dashboard");

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/10 bg-ocean-950/80 px-4">
      <MobileSidebar />
      <div className="hidden text-sm text-white/60 md:block">
        {t("overview")}
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <UserMenu session={session} locale={locale} />
      </div>
    </header>
  );
}
