import { getTranslations } from "next-intl/server";
import { api } from "@/lib/api";
import ContactInfoForm from "@/components/dashboard/settings/ContactInfoForm";

export default async function DashboardSettingsPage() {
  const t = await getTranslations("Dashboard");
  const contactInfo = await api.contactInfo.get();

  return (
    <div>
      <h1 className="mb-6">{t("settings")}</h1>
      <ContactInfoForm contactInfo={contactInfo} />
    </div>
  );
}
