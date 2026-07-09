import { Translated } from "@/lib/api/types";

export interface Testimonial {
  id: string;
  name: string;
  country: string;
  rating: number;
  context: Translated<string>;
  quote: Translated<string>;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Sarah M.",
    country: "United Kingdom",
    rating: 5,
    context: {
      en: "Open Water Diver",
      de: "Open Water Diver",
      ru: "Курс Open Water Diver",
      it: "Corso Open Water Diver",
    },
    quote: {
      en: "From the very first pool session to my final open-water dive, the instructors made me feel safe and confident. I never thought I'd be comfortable underwater this fast!",
      de: "Von der ersten Poolübung bis zu meinem letzten Freiwassertauchgang haben mich die Instruktoren sicher und selbstbewusst fühlen lassen. Ich hätte nie gedacht, dass ich mich so schnell unter Wasser wohlfühlen würde!",
      ru: "От первого занятия в бассейне до последнего погружения в открытой воде инструкторы заставили меня чувствовать себя уверенно и безопасно. Не думала, что так быстро освоюсь под водой!",
      it: "Dalla prima sessione in piscina all'ultima immersione in acque libere, gli istruttori mi hanno fatto sentire sicura di me. Non pensavo che mi sarei sentita a mio agio sott'acqua così in fretta!",
    },
  },
  {
    id: "testimonial-2",
    name: "Lukas B.",
    country: "Germany",
    rating: 5,
    context: {
      en: "7-Night Deep South Liveaboard",
      de: "7-Nächte Deep-South Liveaboard",
      ru: "7-ночной круиз Deep South",
      it: "Crociera subacquea Deep South di 7 notti",
    },
    quote: {
      en: "Elphinstone and Daedalus lived up to every story I'd heard — hammerheads, a whitetip shark, and some of the healthiest coral I've seen anywhere. The crew ran a tight, safety-first boat.",
      de: "Elphinstone und Daedalus haben jede Geschichte, die ich gehört hatte, übertroffen — Hammerhaie, ein Weißspitzenhai und einige der gesündesten Korallen, die ich je gesehen habe. Die Crew führte ein straffes, sicherheitsorientiertes Schiff.",
      ru: "Эльфинстон и Дедалус превзошли все истории, которые я слышал — молотоголовые акулы, белоперая акула и один из самых здоровых кораллов, что я видел. Команда управляла судном строго и безопасно.",
      it: "Elphinstone e Daedalus hanno superato ogni racconto che avevo sentito — squali martello, uno squalo dalla punta bianca e alcuni dei coralli più sani che abbia mai visto. L'equipaggio ha condotto una barca rigorosa e attenta alla sicurezza.",
    },
  },
  {
    id: "testimonial-3",
    name: "Elena K.",
    country: "Russia",
    rating: 5,
    context: {
      en: "Rescue Diver",
      de: "Rescue Diver",
      ru: "Rescue Diver",
      it: "Rescue Diver",
    },
    quote: {
      en: "Tough but incredibly valuable. I feel like a completely different diver now — more aware, calmer under pressure, and ready to actually help a buddy in trouble.",
      de: "Anspruchsvoll, aber unglaublich wertvoll. Ich fühle mich jetzt wie ein komplett anderer Taucher — aufmerksamer, ruhiger unter Druck und bereit, einem Buddy in Not tatsächlich zu helfen.",
      ru: "Сложно, но невероятно ценно. Теперь я чувствую себя совершенно другим дайвером — более внимательной, спокойной под давлением и готовой по-настоящему помочь напарнику в беде.",
      it: "Impegnativo ma incredibilmente prezioso. Ora mi sento un subacqueo completamente diverso — più attento, più calmo sotto pressione e pronto ad aiutare davvero un compagno in difficoltà.",
    },
  },
  {
    id: "testimonial-4",
    name: "Marco R.",
    country: "Italy",
    rating: 5,
    context: {
      en: "Discover Scuba Diving",
      de: "Discover Scuba Diving",
      ru: "Discover Scuba Diving",
      it: "Discover Scuba Diving",
    },
    quote: {
      en: "I only booked this to try something new on holiday and ended up signing up for the full certification the next day. The instructor was patient and made a nervous first-timer feel completely at ease.",
      de: "Ich habe das nur gebucht, um im Urlaub etwas Neues auszuprobieren, und habe mich am nächsten Tag für die volle Zertifizierung angemeldet. Der Instruktor war geduldig und hat einen nervösen Erstling völlig entspannt gemacht.",
      ru: "Я забронировал это просто чтобы попробовать что-то новое в отпуске, а на следующий день записался на полную сертификацию. Инструктор был терпелив и помог нервничающему новичку полностью расслабиться.",
      it: "L'ho prenotato solo per provare qualcosa di nuovo in vacanza e il giorno dopo mi sono iscritto alla certificazione completa. L'istruttore è stato paziente e ha messo a proprio agio un principiante nervoso.",
    },
  },
  {
    id: "testimonial-5",
    name: "Emily T.",
    country: "United States",
    rating: 5,
    context: {
      en: "Advanced Open Water",
      de: "Advanced Open Water",
      ru: "Advanced Open Water",
      it: "Advanced Open Water",
    },
    quote: {
      en: "The night dive alone was worth the whole course. Small groups, great buoyancy tips, and dive sites I wouldn't have found on my own.",
      de: "Allein der Nachttauchgang war den ganzen Kurs wert. Kleine Gruppen, tolle Auftriebstipps und Tauchplätze, die ich alleine nie gefunden hätte.",
      ru: "Одно только ночное погружение стоило всего курса. Маленькие группы, отличные советы по плавучести и места для дайвинга, которые я бы сам не нашёл.",
      it: "La sola immersione notturna valeva l'intero corso. Piccoli gruppi, ottimi consigli sulla galleggiabilità e siti di immersione che non avrei mai trovato da solo.",
    },
  },
  {
    id: "testimonial-6",
    name: "Daniel W.",
    country: "Netherlands",
    rating: 5,
    context: {
      en: "Giftun Island Day Trip",
      de: "Giftun Island Tagesausflug",
      ru: "Однодневный тур на остров Гифтун",
      it: "Escursione di un giorno a Giftun Island",
    },
    quote: {
      en: "Perfect day out — warm water, healthy reefs just a short boat ride away, and a relaxed crew who clearly love what they do.",
      de: "Perfekter Tagesausflug — warmes Wasser, gesunde Riffe nur eine kurze Bootsfahrt entfernt und eine entspannte Crew, die ihre Arbeit sichtlich liebt.",
      ru: "Идеальный день — тёплая вода, здоровые рифы всего в коротком путешествии на лодке и расслабленная команда, которая явно любит своё дело.",
      it: "Giornata perfetta — acqua calda, barriere coralline sane a poca distanza in barca e un equipaggio rilassato che ama chiaramente il proprio lavoro.",
    },
  },
];
