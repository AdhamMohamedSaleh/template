import { getTranslations } from "next-intl/server";
import { Thermometer, Waves, Shirt } from "lucide-react";
import { getSeaConditions, wetsuitRecommendation } from "@/lib/weather";

export default async function SeaConditions() {
  const t = await getTranslations("Footer");
  const { airTempC, waterTempC } = await getSeaConditions();

  const wetsuit = wetsuitRecommendation(waterTempC, (key) => t(key));

  const items = [
    {
      icon: Thermometer,
      label: t("airTemp"),
      value: airTempC !== null ? `${Math.round(airTempC)}°C` : "—",
    },
    {
      icon: Waves,
      label: t("waterTemp"),
      value: waterTempC !== null ? `${Math.round(waterTempC)}°C` : "—",
    },
    {
      icon: Shirt,
      label: t("wetsuit"),
      value: wetsuit,
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.label} className="flex flex-col items-start gap-0.5">
          <item.icon className="size-9 text-ocean-300" aria-hidden />
          <p className="text-white/50 text-sm">{item.label}</p>
          <p className="font-medium text-white text-base">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
