import { Trip } from "@/lib/api/types";

export const trips: Trip[] = [
  {
    id: "trip-1",
    slug: "giftun-island-day-trip",
    category: "day-trip",
    durationDays: 1,
    images: ["/images/trip-placeholder-1.svg"],
    itinerary: [
      {
        day: 1,
        title: {
          en: "Giftun Island reefs",
          de: "Riffe von Giftun Island",
          ru: "Рифы острова Гифтун",
          it: "Barriere di Giftun Island",
        },
        description: {
          en: "Two boat dives at Giftun Island's coral reefs, lunch on board, free time for snorkeling.",
          de: "Zwei Bootstauchgänge an den Korallenriffen von Giftun Island, Mittagessen an Bord, freie Zeit zum Schnorcheln.",
          ru: "Два погружения с лодки у коралловых рифов острова Гифтун, обед на борту, свободное время для снорклинга.",
          it: "Due immersioni in barca sulle barriere coralline di Giftun Island, pranzo a bordo, tempo libero per lo snorkeling.",
        },
      },
    ],
    cabinPricing: [
      {
        id: "trip-1-standard",
        label: { en: "Standard seat", de: "Standardplatz", ru: "Стандартное место", it: "Posto standard" },
        priceUsd: 65,
      },
    ],
    title: {
      en: "Giftun Island Day Trip",
      de: "Giftun Island Tagesausflug",
      ru: "Однодневный тур на остров Гифтун",
      it: "Escursione di un giorno a Giftun Island",
    },
    summary: {
      en: "A full day of reef diving on the Giftun Islands marine park.",
      de: "Ein ganzer Tag Rifftauchen im Meerespark der Giftun-Inseln.",
      ru: "Целый день дайвинга на рифах морского парка островов Гифтун.",
      it: "Una giornata intera di immersioni sulle barriere del parco marino di Giftun.",
    },
    description: {
      en: "Perfect for certified divers wanting an easy, scenic day out. Includes two guided boat dives and lunch.",
      de: "Perfekt für zertifizierte Taucher, die einen entspannten, malerischen Tag suchen. Inklusive zwei geführten Bootstauchgängen und Mittagessen.",
      ru: "Идеально для сертифицированных дайверов, желающих провести день легко и живописно. Включает два погружения с гидом и обед.",
      it: "Perfetto per subacquei certificati che cercano una giornata semplice e scenografica. Include due immersioni guidate e il pranzo.",
    },
    createdAt: "2025-11-06T09:00:00.000Z",
    updatedAt: "2025-11-06T09:00:00.000Z",
  },
  {
    id: "trip-2",
    slug: "orange-bay-snorkeling",
    category: "snorkeling",
    durationDays: 1,
    images: ["/images/trip-placeholder-2.svg"],
    itinerary: [
      {
        day: 1,
        title: {
          en: "Orange Bay",
          de: "Orange Bay",
          ru: "Оранж-Бэй",
          it: "Orange Bay",
        },
        description: {
          en: "White sand island stop with shallow reef snorkeling, lunch buffet, and free beach time.",
          de: "Insel mit weißem Sandstrand, flachem Riffschnorcheln, Mittagsbuffet und freier Strandzeit.",
          ru: "Остров с белым песком, снорклинг на мелком рифе, обед-буфет и свободное время на пляже.",
          it: "Isola di sabbia bianca con snorkeling sulla barriera poco profonda, pranzo a buffet e tempo libero in spiaggia.",
        },
      },
    ],
    cabinPricing: [
      {
        id: "trip-2-standard",
        label: { en: "Standard seat", de: "Standardplatz", ru: "Стандартное место", it: "Posto standard" },
        priceUsd: 40,
      },
    ],
    title: {
      en: "Orange Bay Snorkeling Trip",
      de: "Orange Bay Schnorchel-Ausflug",
      ru: "Тур на снорклинг в Оранж-Бэй",
      it: "Escursione snorkeling a Orange Bay",
    },
    summary: {
      en: "A relaxed family-friendly snorkeling day at Orange Bay's shallow reefs.",
      de: "Ein entspannter, familienfreundlicher Schnorcheltag an den flachen Riffen von Orange Bay.",
      ru: "Спокойный семейный день снорклинга на мелких рифах Оранж-Бэй.",
      it: "Una giornata di snorkeling rilassante e adatta alle famiglie sulle barriere poco profonde di Orange Bay.",
    },
    description: {
      en: "No diving certification needed — just snorkeling gear and a love of clear turquoise water.",
      de: "Kein Tauchschein nötig — nur Schnorchelausrüstung und Freude an klarem, türkisfarbenem Wasser.",
      ru: "Сертификат дайвера не требуется — только снаряжение для снорклинга и любовь к прозрачной бирюзовой воде.",
      it: "Non serve un brevetto subacqueo — solo attrezzatura da snorkeling e amore per le acque turchesi cristalline.",
    },
    createdAt: "2025-11-07T09:00:00.000Z",
    updatedAt: "2025-11-07T09:00:00.000Z",
  },
  {
    id: "trip-3",
    slug: "3-night-red-sea-liveaboard",
    category: "liveaboard",
    durationDays: 3,
    images: ["/images/trip-placeholder-3.svg"],
    itinerary: [
      {
        day: 1,
        title: { en: "Departure & check dive", de: "Abfahrt & Checktauchgang", ru: "Отправление и проверочное погружение", it: "Partenza e immersione di controllo" },
        description: {
          en: "Board in the afternoon, safety briefing, and an easy check dive near the marina.",
          de: "Einschiffung am Nachmittag, Sicherheitseinweisung und ein einfacher Checktauchgang nahe der Marina.",
          ru: "Посадка на борт во второй половине дня, инструктаж по безопасности, лёгкое проверочное погружение у марины.",
          it: "Imbarco nel pomeriggio, briefing di sicurezza e una facile immersione di controllo vicino alla marina.",
        },
      },
      {
        day: 2,
        title: { en: "Southern reefs", de: "Südliche Riffe", ru: "Южные рифы", it: "Barriere del sud" },
        description: {
          en: "Three guided dives on pristine southern reef systems, including a drift dive.",
          de: "Drei geführte Tauchgänge an unberührten südlichen Riffsystemen, inklusive Drifttauchgang.",
          ru: "Три погружения с гидом на нетронутых южных рифах, включая дрейфовое погружение.",
          it: "Tre immersioni guidate su sistemi di barriere corallline incontaminate del sud, inclusa un'immersione alla deriva.",
        },
      },
      {
        day: 3,
        title: { en: "Wreck dive & return", de: "Wracktauchgang & Rückkehr", ru: "Дайв на затонувшем корабле и возвращение", it: "Immersione sul relitto e ritorno" },
        description: {
          en: "Morning wreck dive followed by a leisurely sail back to port.",
          de: "Wracktauchgang am Morgen, anschließend gemütliche Rückfahrt in den Hafen.",
          ru: "Утреннее погружение на затонувший корабль, затем неспешное возвращение в порт.",
          it: "Immersione sul relitto al mattino seguita da un tranquillo rientro in porto.",
        },
      },
    ],
    cabinPricing: [
      { id: "trip-3-shared", label: { en: "Shared cabin", de: "Geteilte Kabine", ru: "Общая каюта", it: "Cabina condivisa" }, priceUsd: 480 },
      { id: "trip-3-double", label: { en: "Double cabin", de: "Doppelkabine", ru: "Двухместная каюта", it: "Cabina doppia" }, priceUsd: 650 },
    ],
    title: {
      en: "3-Night Red Sea Liveaboard",
      de: "3-Nächte Red Sea Liveaboard",
      ru: "3-ночной круиз по Красному морю",
      it: "Crociera subacquea di 3 notti nel Mar Rosso",
    },
    summary: {
      en: "A short liveaboard covering southern reefs and a wreck dive.",
      de: "Eine kurze Liveaboard-Tour zu südlichen Riffen und einem Wrack.",
      ru: "Короткий круиз по южным рифам с погружением на затонувший корабль.",
      it: "Una breve crociera subacquea tra le barriere del sud e un relitto.",
    },
    description: {
      en: "Ideal for divers with limited time who still want the liveaboard experience — pristine reefs, fewer crowds, and a wreck dive.",
      de: "Ideal für Taucher mit wenig Zeit, die dennoch das Liveaboard-Erlebnis möchten — unberührte Riffe, weniger Menschen, ein Wrack.",
      ru: "Идеально для дайверов с ограниченным временем, которые всё же хотят испытать круиз — нетронутые рифы, меньше людей, кораблекрушение.",
      it: "Ideale per subacquei con poco tempo che vogliono comunque vivere l'esperienza di una crociera — barriere incontaminate, meno folla, un relitto.",
    },
    createdAt: "2025-11-08T09:00:00.000Z",
    updatedAt: "2025-11-08T09:00:00.000Z",
  },
  {
    id: "trip-4",
    slug: "7-night-deep-south-liveaboard",
    category: "liveaboard",
    durationDays: 7,
    images: ["/images/trip-placeholder-1.svg"],
    itinerary: [
      {
        day: 1,
        title: { en: "Departure", de: "Abfahrt", ru: "Отправление", it: "Partenza" },
        description: {
          en: "Board, safety briefing, check dive.",
          de: "Einschiffung, Sicherheitseinweisung, Checktauchgang.",
          ru: "Посадка на борт, инструктаж по безопасности, проверочное погружение.",
          it: "Imbarco, briefing di sicurezza, immersione di controllo.",
        },
      },
      {
        day: 2,
        title: { en: "St. John's reefs", de: "St. John's Riffe", ru: "Рифы Сент-Джонс", it: "Barriere di St. John's" },
        description: {
          en: "Remote reef systems near the Sudanese border, known for pelagic encounters.",
          de: "Abgelegene Riffsysteme nahe der sudanesischen Grenze, bekannt für Begegnungen mit Hochseefischen.",
          ru: "Отдалённые рифовые системы у границы с Суданом, известные встречами с пелагическими видами.",
          it: "Sistemi di barriere remote vicino al confine sudanese, note per gli incontri con pesci pelagici.",
        },
      },
      {
        day: 3,
        title: { en: "Fury Shoals", de: "Fury Shoals", ru: "Фьюри-Шоалс", it: "Fury Shoals" },
        description: {
          en: "Colorful coral gardens and resident dolphin pods.",
          de: "Bunte Korallengärten und ansässige Delfinschulen.",
          ru: "Красочные коралловые сады и постоянные стаи дельфинов.",
          it: "Giardini di corallo colorati e gruppi residenti di delfini.",
        },
      },
      {
        day: 4,
        title: { en: "Elphinstone Reef", de: "Elphinstone Reef", ru: "Риф Эльфинстон", it: "Barriera di Elphinstone" },
        description: {
          en: "A famous wall dive with a chance of oceanic whitetip sharks.",
          de: "Ein berühmter Walltauchgang mit Chance auf Weißspitzen-Hochseehaie.",
          ru: "Знаменитое погружение вдоль стены с шансом увидеть океанических белоперых акул.",
          it: "Una famosa immersione lungo la parete con possibilità di avvistare squali longimano.",
        },
      },
      {
        day: 5,
        title: { en: "Daedalus Reef", de: "Daedalus Reef", ru: "Риф Дедалус", it: "Barriera di Daedalus" },
        description: {
          en: "An offshore reef system famous for hammerhead sightings.",
          de: "Ein Offshore-Riffsystem, bekannt für Hammerhai-Sichtungen.",
          ru: "Удалённая рифовая система, известная встречами с молотоголовыми акулами.",
          it: "Un sistema di barriera al largo, famoso per gli avvistamenti di squali martello.",
        },
      },
      {
        day: 6,
        title: { en: "Return dives", de: "Rückreisetauchgänge", ru: "Погружения на обратном пути", it: "Immersioni di rientro" },
        description: {
          en: "Final reef dives while sailing back north.",
          de: "Letzte Rifftauchgänge während der Rückfahrt nach Norden.",
          ru: "Заключительные погружения на рифах во время движения на север.",
          it: "Ultime immersioni sulla barriera durante il rientro verso nord.",
        },
      },
      {
        day: 7,
        title: { en: "Disembark", de: "Ausschiffung", ru: "Высадка", it: "Sbarco" },
        description: {
          en: "Morning arrival back at the marina.",
          de: "Ankunft am Morgen zurück in der Marina.",
          ru: "Утреннее прибытие обратно в марину.",
          it: "Arrivo mattutino di ritorno in marina.",
        },
      },
    ],
    cabinPricing: [
      { id: "trip-4-shared", label: { en: "Shared cabin", de: "Geteilte Kabine", ru: "Общая каюта", it: "Cabina condivisa" }, priceUsd: 1050 },
      { id: "trip-4-double", label: { en: "Double cabin", de: "Doppelkabine", ru: "Двухместная каюта", it: "Cabina doppia" }, priceUsd: 1400 },
      { id: "trip-4-suite", label: { en: "Master suite", de: "Master-Suite", ru: "Люкс-каюта", it: "Suite" }, priceUsd: 1900 },
    ],
    title: {
      en: "7-Night Deep South Liveaboard",
      de: "7-Nächte Deep-South Liveaboard",
      ru: "7-ночной круиз Deep South",
      it: "Crociera subacquea Deep South di 7 notti",
    },
    summary: {
      en: "The classic Deep South itinerary — St. John's, Fury Shoals, Elphinstone, and Daedalus.",
      de: "Die klassische Deep-South-Route — St. John's, Fury Shoals, Elphinstone und Daedalus.",
      ru: "Классический маршрут Deep South — Сент-Джонс, Фьюри-Шоалс, Эльфинстон и Дедалус.",
      it: "Il classico itinerario Deep South — St. John's, Fury Shoals, Elphinstone e Daedalus.",
    },
    description: {
      en: "For experienced divers chasing big pelagics and remote reef systems far south of Hurghada.",
      de: "Für erfahrene Taucher auf der Suche nach großen Hochseefischen und abgelegenen Riffsystemen weit südlich von Hurghada.",
      ru: "Для опытных дайверов, охотящихся за крупными пелагическими видами и отдалёнными рифами далеко на юге от Хургады.",
      it: "Per subacquei esperti alla ricerca di grandi pelagici e sistemi di barriera remoti ben a sud di Hurghada.",
    },
    createdAt: "2025-11-09T09:00:00.000Z",
    updatedAt: "2025-11-09T09:00:00.000Z",
  },
  {
    id: "trip-5",
    slug: "dolphin-house-day-trip",
    category: "day-trip",
    durationDays: 1,
    images: ["/images/trip-placeholder-2.svg"],
    itinerary: [
      {
        day: 1,
        title: {
          en: "Dolphin House (Sha'ab Samadai)",
          de: "Dolphin House (Sha'ab Samadai)",
          ru: "Дельфиний риф (Шааб-Самадаи)",
          it: "Dolphin House (Sha'ab Samadai)",
        },
        description: {
          en: "Two dives at the horseshoe-shaped reef known for its resident pod of spinner dolphins, plus lunch on board.",
          de: "Zwei Tauchgänge am hufeisenförmigen Riff, bekannt für seine ansässige Gruppe von Spinnerdelfinen, inklusive Mittagessen an Bord.",
          ru: "Два погружения у рифа подковообразной формы, известного постоянной стаей длиннорылых продельфинов, плюс обед на борту.",
          it: "Due immersioni sulla barriera a ferro di cavallo nota per il suo gruppo residente di delfini spinner, con pranzo a bordo.",
        },
      },
    ],
    cabinPricing: [
      {
        id: "trip-5-standard",
        label: {
          en: "Standard seat",
          de: "Standardplatz",
          ru: "Стандартное место",
          it: "Posto standard",
        },
        priceUsd: 55,
      },
    ],
    title: {
      en: "Dolphin House Day Trip",
      de: "Dolphin House Tagesausflug",
      ru: "Однодневный тур к Дельфиньему рифу",
      it: "Escursione di un giorno a Dolphin House",
    },
    summary: {
      en: "Snorkel or dive alongside wild spinner dolphins at their favorite resting reef.",
      de: "Schnorchle oder tauche mit wilden Spinnerdelfinen an ihrem bevorzugten Ruheriff.",
      ru: "Понырять или поплавать с маской рядом с дикими продельфинами у их любимого рифа для отдыха.",
      it: "Fai snorkeling o immersioni accanto ai delfini spinner selvatici nella loro barriera di riposo preferita.",
    },
    description: {
      en: "One of the Red Sea's most beloved trips — a calm, shallow reef where a resident pod of spinner dolphins regularly rests, with excellent odds of an in-water encounter.",
      de: "Einer der beliebtesten Ausflüge im Roten Meer — ein ruhiges, flaches Riff, an dem eine ansässige Gruppe von Spinnerdelfinen regelmäßig ruht, mit hervorragenden Chancen auf eine Begegnung im Wasser.",
      ru: "Одна из самых любимых экскурсий Красного моря — спокойный мелководный риф, где регулярно отдыхает стая длиннорылых продельфинов, с отличными шансами на встречу в воде.",
      it: "Una delle escursioni più amate del Mar Rosso — una barriera calma e poco profonda dove un gruppo residente di delfini spinner riposa regolarmente, con ottime probabilità di un incontro in acqua.",
    },
    createdAt: "2025-11-15T09:00:00.000Z",
    updatedAt: "2025-11-15T09:00:00.000Z",
  },
  {
    id: "trip-6",
    slug: "abu-nuhas-wreck-day-trip",
    category: "day-trip",
    durationDays: 1,
    images: ["/images/trip-placeholder-3.svg"],
    itinerary: [
      {
        day: 1,
        title: {
          en: "Abu Nuhas wreck reef",
          de: "Wrackriff Abu Nuhas",
          ru: "Риф с затонувшими кораблями Абу-Нухас",
          it: "Barriera dei relitti di Abu Nuhas",
        },
        description: {
          en: "Two dives among the wrecks of Abu Nuhas — the 'Ghost Fleet' of the Red Sea — with an experienced wreck guide.",
          de: "Zwei Tauchgänge zwischen den Wracks von Abu Nuhas — der 'Geisterflotte' des Roten Meeres — mit einem erfahrenen Wrackguide.",
          ru: "Два погружения среди затонувших кораблей Абу-Нухас — «Флота-призрака» Красного моря — с опытным гидом по затонувшим кораблям.",
          it: "Due immersioni tra i relitti di Abu Nuhas — la 'flotta fantasma' del Mar Rosso — con una guida esperta di relitti.",
        },
      },
    ],
    cabinPricing: [
      {
        id: "trip-6-standard",
        label: {
          en: "Standard seat",
          de: "Standardplatz",
          ru: "Стандартное место",
          it: "Posto standard",
        },
        priceUsd: 80,
      },
    ],
    title: {
      en: "Abu Nuhas Wreck Day Trip",
      de: "Abu Nuhas Wrack-Tagesausflug",
      ru: "Однодневный тур на затонувшие корабли Абу-Нухас",
      it: "Escursione di un giorno ai relitti di Abu Nuhas",
    },
    summary: {
      en: "Explore the Red Sea's famous 'Ghost Fleet' of shipwrecks in a single action-packed day.",
      de: "Erkunde die berühmte 'Geisterflotte' aus Schiffswracks im Roten Meer an einem einzigen erlebnisreichen Tag.",
      ru: "Исследуйте знаменитый «Флот-призрак» затонувших кораблей Красного моря всего за один насыщенный день.",
      it: "Esplora la famosa 'flotta fantasma' di relitti del Mar Rosso in una sola giornata ricca di avventura.",
    },
    description: {
      en: "For certified divers only — a full day among four historic shipwrecks scattered across the Abu Nuhas reef, a highlight for any wreck enthusiast.",
      de: "Nur für zertifizierte Taucher — ein ganzer Tag zwischen vier historischen Schiffswracks am Abu-Nuhas-Riff, ein Highlight für jeden Wrack-Enthusiasten.",
      ru: "Только для сертифицированных дайверов — целый день среди четырёх исторических затонувших кораблей на рифе Абу-Нухас, must-see для любого поклонника рэк-дайвинга.",
      it: "Solo per sub certificati — un'intera giornata tra quattro relitti storici sparsi sulla barriera di Abu Nuhas, un momento clou per ogni appassionato di relitti.",
    },
    createdAt: "2025-11-16T09:00:00.000Z",
    updatedAt: "2025-11-16T09:00:00.000Z",
  },
  {
    id: "trip-7",
    slug: "mahmya-island-snorkeling",
    category: "snorkeling",
    durationDays: 1,
    images: ["/images/trip-placeholder-1.svg"],
    itinerary: [
      {
        day: 1,
        title: {
          en: "Mahmya Island",
          de: "Mahmya Island",
          ru: "Остров Махмия",
          it: "Isola di Mahmya",
        },
        description: {
          en: "A stop at Mahmya's white-sand beach with shallow reef snorkeling, a beach buffet lunch, and free time to relax.",
          de: "Ein Halt am weißen Sandstrand von Mahmya mit flachem Riffschnorcheln, einem Strandbuffet und freier Zeit zum Entspannen.",
          ru: "Остановка на белоснежном пляже Махмии со снорклингом на мелком рифе, пляжным обедом-буфетом и свободным временем для отдыха.",
          it: "Sosta sulla spiaggia di sabbia bianca di Mahmya con snorkeling sulla barriera poco profonda, pranzo a buffet in spiaggia e tempo libero per rilassarsi.",
        },
      },
    ],
    cabinPricing: [
      {
        id: "trip-7-standard",
        label: {
          en: "Standard seat",
          de: "Standardplatz",
          ru: "Стандартное место",
          it: "Posto standard",
        },
        priceUsd: 35,
      },
    ],
    title: {
      en: "Mahmya Island Snorkeling Trip",
      de: "Mahmya Island Schnorchel-Ausflug",
      ru: "Тур на снорклинг на остров Махмия",
      it: "Escursione snorkeling all'isola di Mahmya",
    },
    summary: {
      en: "A postcard-perfect island beach day with easy snorkeling for all ages.",
      de: "Ein postkartenreifer Inselstrandtag mit einfachem Schnorcheln für jedes Alter.",
      ru: "Идеальный пляжный день на острове с лёгким снорклингом для всех возрастов.",
      it: "Una giornata da cartolina su un'isola con snorkeling facile adatto a tutte le età.",
    },
    description: {
      en: "The most relaxed trip on our schedule — calm, shallow water, a gorgeous beach, and reef snorkeling gentle enough for complete beginners.",
      de: "Der entspannteste Ausflug in unserem Programm — ruhiges, flaches Wasser, ein wunderschöner Strand und Riffschnorcheln, sanft genug für absolute Anfänger.",
      ru: "Самая спокойная экскурсия в нашем расписании — тихая мелкая вода, прекрасный пляж и снорклинг на рифе, достаточно мягкий для полных новичков.",
      it: "L'escursione più rilassante del nostro programma — acqua calma e poco profonda, una spiaggia meravigliosa e snorkeling sulla barriera adatto anche ai principianti assoluti.",
    },
    createdAt: "2025-11-17T09:00:00.000Z",
    updatedAt: "2025-11-17T09:00:00.000Z",
  },
];
