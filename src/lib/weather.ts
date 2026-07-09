// Hurghada, Egypt coordinates.
const LAT = 27.2579;
const LON = 33.8116;

export interface SeaConditions {
  airTempC: number | null;
  waterTempC: number | null;
}

export async function getSeaConditions(): Promise<SeaConditions> {
  try {
    const [weatherRes, marineRes] = await Promise.all([
      fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m&timezone=auto`,
        { next: { revalidate: 3600 } },
      ),
      fetch(
        `https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}&current=sea_surface_temperature&timezone=auto`,
        { next: { revalidate: 3600 } },
      ),
    ]);

    if (!weatherRes.ok || !marineRes.ok) {
      return { airTempC: null, waterTempC: null };
    }

    const weather = await weatherRes.json();
    const marine = await marineRes.json();

    return {
      airTempC: weather?.current?.temperature_2m ?? null,
      waterTempC: marine?.current?.sea_surface_temperature ?? null,
    };
  } catch {
    return { airTempC: null, waterTempC: null };
  }
}

/** Rough wetsuit thickness guidance based on sea surface temperature. */
export function wetsuitRecommendation(
  waterTempC: number | null,
  t: (key: "rashguard" | "shorty" | "fullsuit" | "drysuit") => string,
): string {
  if (waterTempC === null) return "—";
  if (waterTempC >= 28) return t("rashguard");
  if (waterTempC >= 24) return t("shorty");
  if (waterTempC >= 20) return t("fullsuit");
  return t("drysuit");
}
