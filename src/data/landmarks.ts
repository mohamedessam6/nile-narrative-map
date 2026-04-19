export type Category = "historical" | "museum" | "nature" | "culture";

export interface Landmark {
  id: string;
  name: string;
  emoji: string;
  lat: number;
  lng: number;
  category: Category;
  era: string;
  duration: string;
  color: string;
  story: string;
  rating: number;
  teaser: string;
}

export const landmarks: Landmark[] = [
  {
    id: "giza",
    name: "Pyramids of Giza",
    emoji: "🏔️",
    lat: 29.9792,
    lng: 31.1342,
    category: "historical",
    era: "2560 BCE",
    duration: "3–5 hrs",
    color: "#c8a96e",
    rating: 5,
    teaser: "The last surviving wonder of the ancient world.",
    story:
      "The last surviving wonder of the ancient world, the Great Pyramid of Giza was built as the eternal tomb of Pharaoh Khufu and stood as the tallest structure on Earth for 3,800 years. Alongside it stand the pyramids of Khafre and Menkaure, together forming one of the most recognizable skylines in human history. The nearby Great Sphinx, carved from a single limestone ridge, silently guards this sacred necropolis and continues to mystify historians and archaeologists alike.",
  },
  {
    id: "karnak",
    name: "Karnak Temple",
    emoji: "🏛️",
    lat: 25.7189,
    lng: 32.6573,
    category: "historical",
    era: "2055 BCE",
    duration: "2–4 hrs",
    color: "#e06b6b",
    rating: 5,
    teaser: "The largest sacred complex ever built.",
    story:
      "Karnak is not a single temple but an enormous sacred city — the largest ancient religious complex ever constructed, covering over 200 acres of towering pylons, hypostyle halls, and obelisks. Built across 2,000 years by successive pharaohs, it was the beating heart of Amun worship in ancient Egypt. The Great Hypostyle Hall alone contains 134 colossal columns arranged in 16 rows, their surfaces still alive with painted hieroglyphs telling stories of gods and kings.",
  },
  {
    id: "abu-simbel",
    name: "Abu Simbel Temples",
    emoji: "🗿",
    lat: 22.3372,
    lng: 31.6256,
    category: "historical",
    era: "1264 BCE",
    duration: "2–3 hrs",
    color: "#c87ce0",
    rating: 5,
    teaser: "Four colossi guarding a solar miracle.",
    story:
      "Hewn directly into the sandstone cliffs of Nubia by Ramesses II, Abu Simbel is one of antiquity's most audacious architectural feats — four 20-meter colossi of the pharaoh guard the entrance like stone titans. Twice a year, on the 22nd of February and October, sunlight pierces 60 meters into the mountain to illuminate the inner sanctuary in a solar miracle engineered by ancient priests. In the 1960s, the entire temple was cut into 2,000 blocks and relocated 65 meters uphill to save it from the rising waters of Lake Nasser.",
  },
  {
    id: "valley",
    name: "Valley of the Kings",
    emoji: "⚱️",
    lat: 25.7397,
    lng: 32.6011,
    category: "historical",
    era: "1550 BCE",
    duration: "3–4 hrs",
    color: "#c8a96e",
    rating: 5,
    teaser: "Tomb of Tutankhamun and 62 royal burials.",
    story:
      "Carved into the limestone cliffs of the western bank of the Nile, the Valley of the Kings served as the royal necropolis for Egypt's most powerful pharaohs for nearly 500 years. Sixty-three tombs have been discovered here, each descending through painted corridors bursting with spells, prayers, and vivid scenes from the Book of the Dead. The most celebrated discovery came in 1922 when Howard Carter unearthed Tutankhamun's virtually intact tomb — the golden treasures of the boy-king stunned the world and ignited a global obsession with ancient Egypt.",
  },
  {
    id: "luxor",
    name: "Luxor Temple",
    emoji: "🕌",
    lat: 25.6994,
    lng: 32.6393,
    category: "historical",
    era: "1400 BCE",
    duration: "1–2 hrs",
    color: "#e8d5a3",
    rating: 4,
    teaser: "Stage of the great Opet Festival.",
    story:
      "Standing proudly on the eastern bank of the Nile in what was once the ancient city of Thebes, Luxor Temple was the stage for Egypt's greatest annual celebration — the Opet Festival, during which the gods journeyed from Karnak by river barge to reunite in sacred marriage. Originally connected to Karnak by an Avenue of Sphinxes stretching 3 kilometers, the temple is a layered monument built by Amenhotep III, Ramesses II, and even Alexander the Great. At night, the temple glows golden against the dark sky, its towering pylon still bearing the ghost of vivid ancient paint.",
  },
  {
    id: "philae",
    name: "Temple of Philae",
    emoji: "🌊",
    lat: 24.0248,
    lng: 32.8841,
    category: "historical",
    era: "380 BCE",
    duration: "1–2 hrs",
    color: "#6baee0",
    rating: 4,
    teaser: "Island sanctuary of Isis, rescued from the Nile.",
    story:
      "Dedicated to Isis, goddess of magic and motherhood, the island sanctuary of Philae was the last place in Egypt where the ancient religion was practiced — priests continued their rituals here until the 6th century CE, long after the rest of Egypt had embraced Christianity. When the Aswan Low Dam was built in the early 20th century, the temple was submerged for most of the year, its columns rising ghost-like from the waters. In a remarkable UNESCO rescue mission, the entire complex was dismantled stone by stone and reassembled on the higher island of Agilkia, where it stands today accessible only by boat.",
  },
  {
    id: "egyptian-museum",
    name: "Egyptian Museum, Cairo",
    emoji: "🏺",
    lat: 30.0478,
    lng: 31.2338,
    category: "museum",
    era: "1902 CE",
    duration: "3–5 hrs",
    color: "#6bcba3",
    rating: 5,
    teaser: "120,000 artifacts including Tut's golden mask.",
    story:
      "The dusty-pink neoclassical building on Tahrir Square holds more than 120,000 ancient artifacts — from fragile papyrus scrolls to colossal granite statues — spanning five millennia of Egyptian civilization. Room 3 on the upper floor stops every visitor cold: it is here that Tutankhamun's golden death mask rests, its lapis lazuli and carnelian inlays still blazing with color after 3,300 years. The museum's mummy room houses the actual preserved remains of Ramesses II, Seti I, and 18 other pharaohs — a face-to-face encounter with history that no photograph can prepare you for.",
  },
  {
    id: "white-desert",
    name: "White Desert",
    emoji: "🤍",
    lat: 27.0,
    lng: 27.93,
    category: "nature",
    era: "Natural Wonder",
    duration: "Full day",
    color: "#f0ebe0",
    rating: 5,
    teaser: "Surreal chalk formations under endless stars.",
    story:
      "Driving into Egypt's White Desert feels like landing on another planet: vast plains of bone-white chalk erupt into surreal formations shaped by centuries of wind erosion — some resemble giant mushrooms, others ice cream scoops, chickens, or abstract sculptures by a mad cosmic artist. Located in the Farafra Depression in the Western Desert, the landscape shifts from cream to rose-gold at sunset and glows spectral silver under a full moon. Camping overnight beneath a ceiling of undiluted stars, with the chalk formations casting strange moon-shadows, is one of the most otherworldly experiences available anywhere on Earth.",
  },
  {
    id: "siwa",
    name: "Siwa Oasis",
    emoji: "🌴",
    lat: 29.2033,
    lng: 25.5196,
    category: "nature",
    era: "Ancient",
    duration: "2–3 days",
    color: "#6bcba3",
    rating: 5,
    teaser: "Berber oasis where Alexander met the Oracle.",
    story:
      "Hidden in a hollow of the Great Sand Sea near the Libyan border, Siwa is Egypt's most remote and bewitching oasis — a place where mudbrick fortresses, freshwater springs, and date palm groves have sustained a distinct Berber culture for millennia. Alexander the Great made the arduous desert crossing specifically to consult the Oracle of Amun at the Temple of the Oracle, where priests reportedly declared him son of Zeus-Ammon. Today, visitors swim in Cleopatra's Bath — a natural spring said to have been a royal retreat — and watch the salt lake of Birket Siwa shimmer pink and violet at dusk.",
  },
  {
    id: "mount-sinai",
    name: "Mount Sinai",
    emoji: "⛰️",
    lat: 28.5392,
    lng: 33.9757,
    category: "nature",
    era: "Biblical",
    duration: "Half day",
    color: "#e06b6b",
    rating: 5,
    teaser: "Sunrise climb to where Moses received the Commandments.",
    story:
      "Rising 2,285 meters above sea level in the jagged granite heart of the Sinai Peninsula, Mount Sinai is one of the most sacred mountains on Earth — revered by Jews, Christians, and Muslims as the place where Moses received the Ten Commandments from God. Most pilgrims begin their ascent at 2 a.m., climbing 3,750 stone steps by torchlight to reach the summit before dawn, huddled in blankets against the bitter cold. The reward is a sunrise that spreads across an ocean of purple mountain peaks — an experience so viscerally beautiful that even the most secular traveler understands why ancient people believed this was a place where heaven meets earth.",
  },
];

export const categoryMeta: Record<Category, { label: string; color: string; emoji: string }> = {
  historical: { label: "Historical", color: "oklch(0.76 0.11 80)", emoji: "🏛️" },
  museum:     { label: "Museums",    color: "oklch(0.7 0.13 160)", emoji: "🏺" },
  nature:     { label: "Nature",     color: "oklch(0.7 0.15 140)", emoji: "🌿" },
  culture:    { label: "Culture",    color: "oklch(0.7 0.18 35)",  emoji: "✨" },
};
