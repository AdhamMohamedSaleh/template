import { Translated } from "@/lib/api/types";

export interface DivingCenterFeature {
  id: string;
  image: string;
  title: Translated<string>;
  description: Translated<string>;
}

export const divingCenterFeatures: DivingCenterFeature[] = [
  {
    id: "feature-1",
    image: "/images/diving-center-feature-1.svg",
    title: {
      en: "Fully Equipped Rental Center",
      de: "Voll ausgestattetes Verleihzentrum",
      ru: "Полностью укомплектованный прокатный центр",
      it: "Centro noleggio completamente attrezzato",
    },
    description: {
      en: "Regulators, BCDs, wetsuits, and tanks in every size, serviced and safety-checked before every dive. Everything you need is on-site — no need to travel with your own gear.",
      de: "Regler, Jackets, Neoprenanzüge und Flaschen in jeder Größe, vor jedem Tauchgang gewartet und sicherheitsgeprüft. Alles, was du brauchst, ist vor Ort — du musst deine eigene Ausrüstung nicht mitbringen.",
      ru: "Регуляторы, компенсаторы плавучести, гидрокостюмы и баллоны любого размера, обслуженные и проверенные перед каждым погружением. Всё необходимое есть на месте — не нужно везти своё снаряжение.",
      it: "Erogatori, GAV, mute e bombole di ogni misura, revisionati e controllati prima di ogni immersione. Tutto ciò di cui hai bisogno è già sul posto — non serve portare la tua attrezzatura.",
    },
  },
  {
    id: "feature-2",
    image: "/images/diving-center-feature-2.svg",
    title: {
      en: "PADI 5-Star Training Facility",
      de: "PADI 5-Sterne Ausbildungszentrum",
      ru: "5-звёздочный учебный центр PADI",
      it: "Centro didattico PADI 5 stelle",
    },
    description: {
      en: "A dedicated classroom for theory sessions and a heated training pool for confined-water skills, staffed by full-time certified instructors across every level.",
      de: "Ein eigener Schulungsraum für die Theorie und ein beheiztes Trainingsbecken für die Übungen im geschützten Gewässer, betreut von hauptamtlichen zertifizierten Instruktoren aller Levels.",
      ru: "Отдельный класс для теоретических занятий и подогреваемый учебный бассейн для отработки навыков, где работают штатные сертифицированные инструкторы всех уровней.",
      it: "Un'aula dedicata per le lezioni di teoria e una piscina riscaldata per le abilità in acque confinate, con istruttori certificati a tempo pieno per ogni livello.",
    },
  },
  {
    id: "feature-3",
    image: "/images/diving-center-feature-3.svg",
    title: {
      en: "On-Site Nitrox Station",
      de: "Nitrox-Station vor Ort",
      ru: "Станция найтрокса на месте",
      it: "Stazione Nitrox in loco",
    },
    description: {
      en: "Our own membrane nitrox system fills tanks with enriched air on demand, so certified nitrox divers get longer bottom times and shorter surface intervals all week.",
      de: "Unser eigenes Membran-Nitrox-System füllt Flaschen auf Wunsch mit angereicherter Luft, damit zertifizierte Nitrox-Taucher die ganze Woche längere Tauchzeiten und kürzere Oberflächenpausen genießen.",
      ru: "Собственная мембранная система найтрокса заправляет баллоны обогащённым воздухом по запросу, что даёт сертифицированным найтрокс-дайверам больше времени под водой и короче поверхностные интервалы всю неделю.",
      it: "Il nostro sistema Nitrox a membrana riempie le bombole con aria arricchita su richiesta, offrendo ai sub certificati Nitrox tempi di immersione più lunghi e intervalli di superficie più brevi per tutta la settimana.",
    },
  },
  {
    id: "feature-4",
    image: "/images/diving-center-feature-4.svg",
    title: {
      en: "Direct Boat & Jetty Access",
      de: "Direkter Boots- und Stegzugang",
      ru: "Прямой доступ к лодке и пирсу",
      it: "Accesso diretto a barca e pontile",
    },
    description: {
      en: "Our private jetty sits steps from the dive center — gear up, walk straight onto the boat, and you're on the reef in minutes with no long road transfers.",
      de: "Unser privater Steg liegt nur wenige Schritte vom Tauchzentrum entfernt — ausrüsten, direkt aufs Boot gehen, und in wenigen Minuten bist du am Riff, ganz ohne lange Transferfahrten.",
      ru: "Наш собственный пирс находится в нескольких шагах от дайв-центра — наденьте снаряжение, пройдите прямо на лодку, и через несколько минут вы уже на рифе без долгих переездов.",
      it: "Il nostro pontile privato si trova a pochi passi dal centro immersioni — indossa l'attrezzatura, sali direttamente in barca e in pochi minuti sei sulla barriera, senza lunghi trasferimenti su strada.",
    },
  },
];
