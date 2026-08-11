import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { DESTINATIONS, ETB_RATE, type Destination } from "./data";

type TripStore = {
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  itinerary: string[];
  addStop: (id: string) => void;
  removeStop: (id: string) => void;
  reorder: (from: number, to: number) => void;
  items: Destination[];
  travellers: number;
  setTravellers: (n: number) => void;
  days: number;
  setDays: (n: number) => void;
  rate: number;
};

const TripContext = createContext<TripStore | null>(null);

export function TripProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(["lalibela", "danakil"]);
  const [itinerary, setItinerary] = useState<string[]>(["lalibela", "simien"]);
  const [travellers, setTravellers] = useState(2);
  const [days, setDays] = useState(7);

  const value = useMemo<TripStore>(() => {
    const items = itinerary
      .map((id) => DESTINATIONS.find((d) => d.id === id))
      .filter(Boolean) as Destination[];
    return {
      favorites,
      isFavorite: (id) => favorites.includes(id),
      toggleFavorite: (id) =>
        setFavorites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id])),
      itinerary,
      addStop: (id) => setItinerary((s) => (s.includes(id) ? s : [...s, id])),
      removeStop: (id) => setItinerary((s) => s.filter((x) => x !== id)),
      reorder: (from, to) =>
        setItinerary((s) => {
          const next = [...s];
          const moved = next.splice(from, 1)[0];
          if (moved === undefined) return s;
          next.splice(to, 0, moved);
          return next;
        }),
      items,
      travellers,
      setTravellers,
      days,
      setDays,
      rate: ETB_RATE,
    };
  }, [favorites, itinerary, travellers, days]);

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const ctx = useContext(TripContext);
  if (!ctx) throw new Error("useTrip must be used inside TripProvider");
  return ctx;
}

export function formatUsd(usd: number) {
  return `$${usd.toLocaleString()}`;
}

export function formatEtb(usd: number, rate = ETB_RATE) {
  return `≈ ${Math.round(usd * rate).toLocaleString()} ETB`;
}
