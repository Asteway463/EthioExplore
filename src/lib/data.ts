export type Destination = {
  id: string;
  name: string;
  region: string;
  category: string;
  rating: number;
  price: number;
  level: string;
  lat: number;
  lng: number;
  desc: string;
  tag: string;
};

export const REGIONS = [
  "All Regions",
  "Amhara",
  "Tigray",
  "Afar",
  "Oromia",
  "SNNPR",
  "Harari",
];

export const CATEGORIES = [
  "All",
  "Historical",
  "Nature & Wildlife",
  "Adventure",
  "Cultural",
  "Religious",
];

export const DESTINATIONS: Destination[] = [
  {
    id: "lalibela",
    name: "Lalibela",
    region: "Amhara",
    category: "Religious",
    rating: 4.9,
    price: 180,
    level: "Easy",
    lat: 12.0316,
    lng: 39.0473,
    desc: "Eleven medieval rock-hewn churches carved downward into volcanic rock, still an active pilgrimage site.",
    tag: "UNESCO",
  },
  {
    id: "simien",
    name: "Simien Mountains",
    region: "Amhara",
    category: "Nature & Wildlife",
    rating: 4.8,
    price: 240,
    level: "Challenging",
    lat: 13.1833,
    lng: 38.05,
    desc: "Jagged escarpments, roaming gelada monkeys, and trekking routes above 4,000m.",
    tag: "Trekking",
  },
  {
    id: "danakil",
    name: "Danakil Depression",
    region: "Afar",
    category: "Adventure",
    rating: 4.7,
    price: 320,
    level: "Extreme",
    lat: 14.2417,
    lng: 40.3,
    desc: "Sulphur springs, salt flats, and an active lava lake — one of the hottest, lowest places on Earth.",
    tag: "Extreme",
  },
  {
    id: "axum",
    name: "Axum",
    region: "Tigray",
    category: "Historical",
    rating: 4.6,
    price: 150,
    level: "Easy",
    lat: 14.1213,
    lng: 38.7269,
    desc: "Ancient obelisks and ruins of the Kingdom of Aksum, said to house the Ark of the Covenant.",
    tag: "UNESCO",
  },
  {
    id: "gondar",
    name: "Gondar",
    region: "Amhara",
    category: "Historical",
    rating: 4.6,
    price: 140,
    level: "Easy",
    lat: 12.603,
    lng: 37.4521,
    desc: "Royal castles and enclosures earning it the nickname \u201cAfrica's Camelot\u201d.",
    tag: "UNESCO",
  },
  {
    id: "bale",
    name: "Bale Mountains",
    region: "Oromia",
    category: "Nature & Wildlife",
    rating: 4.7,
    price: 210,
    level: "Moderate",
    lat: 6.8833,
    lng: 39.75,
    desc: "Afro-alpine highlands and the best chance on Earth to see the rare Ethiopian wolf.",
    tag: "Wildlife",
  },
  {
    id: "omovalley",
    name: "Omo Valley",
    region: "SNNPR",
    category: "Cultural",
    rating: 4.5,
    price: 260,
    level: "Moderate",
    lat: 5.9333,
    lng: 36.5667,
    desc: "Home to more than a dozen distinct indigenous communities and centuries-old traditions.",
    tag: "Cultural",
  },
  {
    id: "harar",
    name: "Harar Jugol",
    region: "Harari",
    category: "Cultural",
    rating: 4.5,
    price: 130,
    level: "Easy",
    lat: 9.3131,
    lng: 42.1183,
    desc: "A walled Islamic city of 82 mosques, colourful alleyways, and the famous hyena feeding.",
    tag: "UNESCO",
  },
  {
    id: "laketana",
    name: "Lake Tana & Blue Nile Falls",
    region: "Amhara",
    category: "Nature & Wildlife",
    rating: 4.4,
    price: 120,
    level: "Easy",
    lat: 11.6,
    lng: 37.3833,
    desc: "Island monasteries on Ethiopia's largest lake and the thundering source of the Blue Nile.",
    tag: "Nature",
  },
  {
    id: "awash",
    name: "Awash National Park",
    region: "Afar",
    category: "Nature & Wildlife",
    rating: 4.3,
    price: 160,
    level: "Moderate",
    lat: 8.9833,
    lng: 40.1667,
    desc: "Savannah wildlife, hot springs, and dramatic gorges along the Awash River.",
    tag: "Wildlife",
  },
];

export const TESTIMONIALS = [
  {
    name: "Sara M.",
    origin: "Netherlands",
    text: "Watching sunrise over Lalibela's carved churches was unlike anything I had planned for — the trip planner made the logistics effortless.",
    rating: 5,
  },
  {
    name: "Daniel K.",
    origin: "USA",
    text: "The Danakil trek was intense but the itinerary tools and local tips prepared us for every step.",
    rating: 5,
  },
  {
    name: "Amara T.",
    origin: "Kenya",
    text: "Booking felt as smooth as any platform I've used in Europe, but the destinations were entirely unique.",
    rating: 4,
  },
];

export const STATS = [
  { n: "120,000+", l: "Travellers guided" },
  { n: "340+", l: "Curated experiences" },
  { n: "9", l: "Regions covered" },
  { n: "4.8", l: "Average rating" },
];

export const ETB_RATE = 161;

export function findDestination(id: string) {
  return DESTINATIONS.find((d) => d.id === id);
}
