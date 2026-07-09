import { getTranslations } from "next-intl/server";
import LoginForm from "@/components/auth/LoginForm";

export default async function LoginPage() {
  const t = await getTranslations("Auth");

  return (
    <div className="w-full max-w-sm rounded-xs border border-white/10 bg-ocean-900 p-8">
      <h1 className="mb-6 text-center">{t("loginTitle")}</h1>
      <LoginForm />
    </div>
  );
}
