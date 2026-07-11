import { Translated } from "@/lib/api/types";

export type ScheduleDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface ScheduleEntry {
  id: string;
  day: ScheduleDay;
  time: string;
  endTime: string;
  title: Translated<string>;
  location: Translated<string>;
  spots: number;
  priceUsd: number;
}

export const schedule: ScheduleEntry[] = [
  {
    id: "schedule-1",
    day: "monday",
    time: "08:00",
    endTime: "16:00",
    title: {
      en: "Giftun Island Day Trip",
      de: "Giftun Island Tagesausflug",
      ru: "Однодневный тур на остров Гифтун",
      it: "Escursione di un giorno a Giftun Island",
    },
    location: {
      en: "Giftun Islands Marine Park",
      de: "Meerespark Giftun-Inseln",
      ru: "Морской парк островов Гифтун",
      it: "Parco marino di Giftun",
    },
    spots: 8,
    priceUsd: 65,
  },
  {
    id: "schedule-2",
    day: "tuesday",
    time: "09:00",
    endTime: "15:00",
    title: {
      en: "Dolphin House Day Trip",
      de: "Dolphin House Tagesausflug",
      ru: "Однодневный тур к Дельфиньему рифу",
      it: "Escursione di un giorno a Dolphin House",
    },
    location: {
      en: "Sha'ab Samadai",
      de: "Sha'ab Samadai",
      ru: "Шааб-Самадаи",
      it: "Sha'ab Samadai",
    },
    spots: 6,
    priceUsd: 55,
  },
  {
    id: "schedule-3",
    day: "wednesday",
    time: "08:00",
    endTime: "16:00",
    title: {
      en: "Abu Nuhas Wreck Day Trip",
      de: "Abu Nuhas Wrack-Tagesausflug",
      ru: "Однодневный тур на затонувшие корабли Абу-Нухас",
      it: "Escursione di un giorno ai relitti di Abu Nuhas",
    },
    location: {
      en: "Abu Nuhas Reef",
      de: "Abu-Nuhas-Riff",
      ru: "Риф Абу-Нухас",
      it: "Barriera di Abu Nuhas",
    },
    spots: 10,
    priceUsd: 80,
  },
  {
    id: "schedule-4",
    day: "thursday",
    time: "09:00",
    endTime: "14:00",
    title: {
      en: "Orange Bay Snorkeling Trip",
      de: "Orange Bay Schnorchel-Ausflug",
      ru: "Тур на снорклинг в Оранж-Бэй",
      it: "Escursione snorkeling a Orange Bay",
    },
    location: {
      en: "Orange Bay",
      de: "Orange Bay",
      ru: "Оранж-Бэй",
      it: "Orange Bay",
    },
    spots: 12,
    priceUsd: 40,
  },
  {
    id: "schedule-5",
    day: "friday",
    time: "19:00",
    endTime: "21:00",
    title: {
      en: "Night Dive Experience",
      de: "Nachttauchgang-Erlebnis",
      ru: "Ночное погружение",
      it: "Esperienza di immersione notturna",
    },
    location: {
      en: "House Reef",
      de: "Hausriff",
      ru: "Домашний риф",
      it: "Barriera locale",
    },
    spots: 6,
    priceUsd: 70,
  },
  {
    id: "schedule-6",
    day: "saturday",
    time: "08:00",
    endTime: "15:00",
    title: {
      en: "Mahmya Island Snorkeling Trip",
      de: "Mahmya Island Schnorchel-Ausflug",
      ru: "Тур на снорклинг на остров Махмия",
      it: "Escursione snorkeling all'isola di Mahmya",
    },
    location: {
      en: "Mahmya Island",
      de: "Mahmya Island",
      ru: "Остров Махмия",
      it: "Isola di Mahmya",
    },
    spots: 15,
    priceUsd: 35,
  },
  {
    id: "schedule-7",
    day: "sunday",
    time: "10:00",
    endTime: "13:00",
    title: {
      en: "Discover Scuba Diving",
      de: "Discover Scuba Diving",
      ru: "Discover Scuba Diving",
      it: "Discover Scuba Diving",
    },
    location: {
      en: "Training Pool & House Reef",
      de: "Trainingsbecken & Hausriff",
      ru: "Учебный бассейн и домашний риф",
      it: "Piscina didattica e barriera locale",
    },
    spots: 4,
    priceUsd: 90,
  },
];
