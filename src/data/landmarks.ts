// Mock data — structured to mirror a future GeoJSON FeatureCollection from a backend.
// Coordinates are [lng, lat].

export type Category = "historical" | "museum" | "nature" | "religious" | "food";
export type Interest = "history" | "culture" | "food" | "nature" | "spiritual";
export type TravelStyle = "relaxed" | "explorer" | "academic";

export interface Landmark {
  id: string;
  name: string;
  city: string;
  category: Category;
  interests: Interest[];
  coordinates: [number, number];
  shortDescription: string;
  description: string;
  image: string;
  era: string;
}

export interface Story {
  id: string;
  title: string;
  subtitle: string;
  cover: string;
  steps: {
    landmarkId: string;
    chapter: string;
    narration: string;
  }[];
}

const img = (seed: string) =>
  `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`;

export const landmarks: Landmark[] = [
  {
    id: "giza",
    name: "Pyramids of Giza",
    city: "Giza",
    category: "historical",
    interests: ["history", "culture"],
    coordinates: [31.1342, 29.9792],
    shortDescription: "The last surviving Wonder of the Ancient World.",
    description:
      "Built over 4,500 years ago for Pharaohs Khufu, Khafre, and Menkaure, the Giza necropolis remains an impossible feat of geometry, astronomy, and human will.",
    image: img("photo-1503177119275-0aa32b3a9368"),
    era: "Old Kingdom · c. 2580 BCE",
  },
  {
    id: "sphinx",
    name: "Great Sphinx",
    city: "Giza",
    category: "historical",
    interests: ["history", "spiritual"],
    coordinates: [31.1376, 29.9753],
    shortDescription: "Guardian of the plateau, carved from a single ridge.",
    description:
      "The largest monolithic statue on Earth, the Sphinx faces the rising sun — a lion-bodied sentinel whose true age is still debated by Egyptologists.",
    image: img("photo-1539768942893-daf53e448371"),
    era: "Old Kingdom · c. 2500 BCE",
  },
  {
    id: "egyptian-museum",
    name: "Grand Egyptian Museum",
    city: "Cairo",
    category: "museum",
    interests: ["history", "culture"],
    coordinates: [31.1198, 29.9936],
    shortDescription: "The largest archaeological museum in the world.",
    description:
      "Home to the complete Tutankhamun collection and over 100,000 artifacts spanning every dynasty of pharaonic civilization.",
    image: img("photo-1568322445389-f64ac2515020"),
    era: "Modern · 2024",
  },
  {
    id: "khan-el-khalili",
    name: "Khan el-Khalili",
    city: "Cairo",
    category: "food",
    interests: ["culture", "food"],
    coordinates: [31.2625, 30.0476],
    shortDescription: "A 14th-century bazaar still trading in spice and gold.",
    description:
      "Wander labyrinthine alleys where copper smiths, perfume distillers, and tea houses preserve craft traditions unchanged since the Mamluk era.",
    image: img("photo-1572252009286-268acec5ca0a"),
    era: "Mamluk · 1382",
  },
  {
    id: "karnak",
    name: "Karnak Temple Complex",
    city: "Luxor",
    category: "religious",
    interests: ["history", "spiritual"],
    coordinates: [32.6573, 25.7188],
    shortDescription: "The largest religious building ever constructed.",
    description:
      "A vast open-air museum of pylons, obelisks, and the Hypostyle Hall's 134 colossal columns — built and rebuilt over 2,000 years.",
    image: img("photo-1568322445583-d52e6b06e3b6"),
    era: "New Kingdom · c. 2055 BCE",
  },
  {
    id: "valley-of-kings",
    name: "Valley of the Kings",
    city: "Luxor",
    category: "historical",
    interests: ["history", "spiritual"],
    coordinates: [32.6014, 25.7402],
    shortDescription: "Royal necropolis hidden in the Theban hills.",
    description:
      "Sixty-three known tombs lie carved into the limestone, including those of Tutankhamun, Ramesses VI, and the exquisitely preserved Nefertari.",
    image: img("photo-1601824850232-29b7b4f97cb1"),
    era: "New Kingdom · 1550 BCE",
  },
  {
    id: "abu-simbel",
    name: "Abu Simbel Temples",
    city: "Aswan",
    category: "religious",
    interests: ["history", "spiritual"],
    coordinates: [31.6258, 22.3372],
    shortDescription: "Ramesses II's monument to himself — and to the sun.",
    description:
      "Twice a year, sunlight pierces the inner sanctuary to illuminate the seated gods. Relocated stone-by-stone in the 1960s to escape Lake Nasser.",
    image: img("photo-1590114538379-6764538d6f01"),
    era: "New Kingdom · 1264 BCE",
  },
  {
    id: "philae",
    name: "Philae Temple",
    city: "Aswan",
    category: "religious",
    interests: ["spiritual", "culture"],
    coordinates: [32.8841, 24.0252],
    shortDescription: "The sacred island of Isis, reborn on Agilkia.",
    description:
      "Dismantled and reassembled to escape the rising Nile, this temple of Isis still hosts ceremonies on its colonnaded terraces.",
    image: img("photo-1591800773278-26ddc83ce694"),
    era: "Ptolemaic · 380 BCE",
  },
  {
    id: "white-desert",
    name: "White Desert National Park",
    city: "Farafra",
    category: "nature",
    interests: ["nature"],
    coordinates: [27.9947, 27.2589],
    shortDescription: "Lunar chalk monoliths sculpted by wind and time.",
    description:
      "Cretaceous limestone formations rise from golden sand like frozen apparitions — best witnessed under a full moon.",
    image: img("photo-1538128844524-3c8ec80a4bbf"),
    era: "Cretaceous · 80M years",
  },
  {
    id: "siwa",
    name: "Siwa Oasis",
    city: "Siwa",
    category: "nature",
    interests: ["nature", "culture", "spiritual"],
    coordinates: [25.5197, 29.2032],
    shortDescription: "Salt lakes, date palms, and the Oracle of Amun.",
    description:
      "The remote oasis where Alexander the Great was declared a god, still home to the Berber-speaking Siwi people and their mudbrick fortresses.",
    image: img("photo-1547636780-9b9b8e259ce9"),
    era: "Ancient · 7th century BCE",
  },
  {
    id: "alexandria-library",
    name: "Bibliotheca Alexandrina",
    city: "Alexandria",
    category: "museum",
    interests: ["culture", "history"],
    coordinates: [29.9092, 31.2089],
    shortDescription: "A modern temple of knowledge on an ancient shore.",
    description:
      "Inaugurated in 2002 to commemorate the lost library of antiquity, its tilted disc evokes a second sun rising over the Mediterranean.",
    image: img("photo-1555662639-4c5b22d80bd4"),
    era: "Modern · 2002",
  },
  {
    id: "saqqara",
    name: "Saqqara Step Pyramid",
    city: "Saqqara",
    category: "historical",
    interests: ["history"],
    coordinates: [31.2167, 29.8713],
    shortDescription: "The world's first monumental stone building.",
    description:
      "Designed by the polymath Imhotep for Pharaoh Djoser, this stepped pyramid invented the architectural vocabulary of the ancient world.",
    image: img("photo-1578439287052-3a93643daab5"),
    era: "Old Kingdom · 2670 BCE",
  },
];

export const stories: Story[] = [
  {
    id: "nile-passage",
    title: "The Nile Passage",
    subtitle: "From the Old Kingdom capital to the southern frontier.",
    cover: img("photo-1568322445389-f64ac2515020"),
    steps: [
      {
        landmarkId: "giza",
        chapter: "I. Where it Began",
        narration:
          "Before the journey south, stand at the foot of the Great Pyramid at dawn. The plateau is silent. The stones still hold the cold of the desert night.",
      },
      {
        landmarkId: "saqqara",
        chapter: "II. The First Stone",
        narration:
          "A short drive south, Saqqara reveals the prototype — Imhotep's stepped vision, the moment architecture was invented in stone.",
      },
      {
        landmarkId: "karnak",
        chapter: "III. The Great Temple",
        narration:
          "Six hundred kilometers upriver, Karnak's hypostyle forest swallows the visitor. Each column is taller than a five-story building.",
      },
      {
        landmarkId: "valley-of-kings",
        chapter: "IV. The Hidden Kings",
        narration:
          "Across the Nile, the western hills conceal the resting places of New Kingdom rulers — descend into the painted darkness of KV9.",
      },
      {
        landmarkId: "abu-simbel",
        chapter: "V. Frontier of the Sun",
        narration:
          "Finally, at the southern edge of the empire, four colossi watch the rising sun illuminate the inner sanctuary — exactly as Ramesses commanded.",
      },
    ],
  },
  {
    id: "desert-mystics",
    title: "Echoes in the Dust",
    subtitle: "Oases, oracles, and chalk monoliths.",
    cover: img("photo-1538128844524-3c8ec80a4bbf"),
    steps: [
      {
        landmarkId: "siwa",
        chapter: "I. The Oracle's Garden",
        narration:
          "Eight hours from the coast, Siwa appears — date palms, salt pools, and the ruined temple where Alexander asked the gods who he was.",
      },
      {
        landmarkId: "white-desert",
        chapter: "II. The White Silence",
        narration:
          "South through the Black Desert, the landscape bleaches. Wind-carved chalk forms rise like sleeping animals across the plain.",
      },
      {
        landmarkId: "philae",
        chapter: "III. The Island of Isis",
        narration:
          "Return to the river. On Agilkia Island, the temple of Isis — saved twice from the rising Nile — still receives offerings at dusk.",
      },
    ],
  },
];
