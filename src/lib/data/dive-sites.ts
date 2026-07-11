import { CourseLevel, Translated } from "@/lib/api/types";

export interface DiveSite {
  id: string;
  slug: string;
  name: Translated<string>;
  description: Translated<string>;
  image: string;
  lat: number;
  lng: number;
  maxDepthMeters: number;
  visibilityMeters: number;
  difficulty: CourseLevel;
}

export const diveSites: DiveSite[] = [
  {
    id: "site-1",
    slug: "giftun-kebir",
    name: {
      en: "Giftun Kebir",
      de: "Giftun Kebir",
      ru: "Гифтун-Кебир",
      it: "Giftun Kebir",
    },
    description: {
      en: "The larger of the two Giftun Islands, ringed by a shallow, colorful reef that makes it one of the most popular day-trip destinations near Hurghada — great for both new divers and snorkelers.",
      de: "Die größere der beiden Giftun-Inseln, umgeben von einem flachen, farbenfrohen Riff — eines der beliebtesten Tagesausflugsziele bei Hurghada, ideal für neue Taucher und Schnorchler.",
      ru: "Больший из двух островов Гифтун, окружённый мелким, красочным рифом — одно из самых популярных мест для однодневных туров рядом с Хургадой, отлично подходит и для начинающих дайверов, и для снорклинга.",
      it: "La più grande delle due isole Giftun, circondata da una barriera colorata e poco profonda — una delle mete più popolari per escursioni di un giorno vicino a Hurghada, ottima sia per sub principianti che per lo snorkeling.",
    },
    image: "/images/dive-site-1.svg",
    lat: 27.25,
    lng: 33.95,
    maxDepthMeters: 18,
    visibilityMeters: 20,
    difficulty: "beginner",
  },
  {
    id: "site-2",
    slug: "abu-nuhas",
    name: {
      en: "Abu Nuhas",
      de: "Abu Nuhas",
      ru: "Абу-Нухас",
      it: "Abu Nuhas",
    },
    description: {
      en: "Home to the Red Sea's famous 'Ghost Fleet' — four historic shipwrecks scattered across one reef. A must-dive for wreck enthusiasts, for certified divers only.",
      de: "Heimat der berühmten 'Geisterflotte' des Roten Meeres — vier historische Schiffswracks verteilt auf einem Riff. Ein Muss für Wrack-Enthusiasten, nur für zertifizierte Taucher.",
      ru: "Здесь находится знаменитый «Флот-призрак» Красного моря — четыре исторических затонувших корабля на одном рифе. Обязательное место для любителей рэк-дайвинга, только для сертифицированных дайверов.",
      it: "Sede della famosa 'flotta fantasma' del Mar Rosso — quattro relitti storici sparsi su un'unica barriera. Un'immersione imperdibile per gli appassionati di relitti, solo per sub certificati.",
    },
    image: "/images/dive-site-2.svg",
    lat: 27.5589,
    lng: 33.9411,
    maxDepthMeters: 30,
    visibilityMeters: 15,
    difficulty: "advanced",
  },
  {
    id: "site-3",
    slug: "careless-reef",
    name: {
      en: "Careless Reef",
      de: "Careless Reef",
      ru: "Риф Карелесс",
      it: "Careless Reef",
    },
    description: {
      en: "A trio of coral pinnacles rising from deep water, known for strong drift currents, big schools of fish, and the occasional passing shark.",
      de: "Ein Trio von Korallenpfeilern, die aus tiefem Wasser aufsteigen, bekannt für starke Driftströmungen, große Fischschwärme und gelegentlich vorbeiziehende Haie.",
      ru: "Три коралловых пика, поднимающихся из глубоких вод, известные сильными дрейфующими течениями, большими косяками рыб и периодически проплывающими акулами.",
      it: "Un trio di pinnacoli corallini che si elevano da acque profonde, noto per le forti correnti di deriva, grandi banchi di pesci e squali di passaggio occasionali.",
    },
    image: "/images/dive-site-3.svg",
    lat: 27.0333,
    lng: 33.8667,
    maxDepthMeters: 30,
    visibilityMeters: 25,
    difficulty: "advanced",
  },
  {
    id: "site-4",
    slug: "umm-gamar",
    name: {
      en: "Umm Gamar",
      de: "Umm Gamar",
      ru: "Умм-Гамар",
      it: "Umm Gamar",
    },
    description: {
      en: "'Mother of the Moon' — a horseshoe-shaped reef with a resident population of moray eels, lionfish, and glassfish-filled caves and crevices.",
      de: "'Mutter des Mondes' — ein hufeisenförmiges Riff mit ansässigen Muränen, Rotfeuerfischen und mit Glasfischen gefüllten Höhlen und Spalten.",
      ru: "«Мать луны» — риф подковообразной формы с постоянной популяцией мурен, крылаток и пещерами, заполненными стеклянными рыбками.",
      it: "'Madre della Luna' — una barriera a ferro di cavallo con una popolazione residente di murene, pesci scorpione e grotte piene di pesci vetro.",
    },
    image: "/images/dive-site-4.svg",
    lat: 27.3167,
    lng: 33.8833,
    maxDepthMeters: 24,
    visibilityMeters: 20,
    difficulty: "advanced",
  },
  {
    id: "site-5",
    slug: "shaab-el-erg",
    name: {
      en: "Shaab El Erg",
      de: "Shaab El Erg",
      ru: "Шааб-Эль-Эрг",
      it: "Shaab El Erg",
    },
    description: {
      en: "A shallow, sprawling reef best known for regular encounters with a resident pod of spinner dolphins in the surrounding open water.",
      de: "Ein flaches, weitläufiges Riff, bekannt für regelmäßige Begegnungen mit einer ansässigen Gruppe von Spinnerdelfinen im umliegenden offenen Wasser.",
      ru: "Мелкий, обширный риф, известный регулярными встречами с постоянной стаей длиннорылых продельфинов в окружающих открытых водах.",
      it: "Una barriera estesa e poco profonda, nota per gli incontri regolari con un gruppo residente di delfini spinner nelle acque aperte circostanti.",
    },
    image: "/images/dive-site-5.svg",
    lat: 27.3667,
    lng: 33.8167,
    maxDepthMeters: 15,
    visibilityMeters: 20,
    difficulty: "beginner",
  },
];
