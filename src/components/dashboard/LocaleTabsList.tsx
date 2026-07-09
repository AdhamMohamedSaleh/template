import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { routing } from "@/i18n/routing";

const LABELS: Record<string, string> = { en: "EN", de: "DE", ru: "RU", it: "IT" };

export default function LocaleTabsList() {
  return (
    <TabsList>
      {routing.locales.map((loc) => (
        <TabsTrigger key={loc} value={loc}>
          {LABELS[loc]}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
