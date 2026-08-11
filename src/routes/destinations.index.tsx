import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { DestinationCard } from "@/components/DestinationCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { CATEGORIES, DESTINATIONS, REGIONS } from "@/lib/data";
import { cn } from "@/lib/utils";

type SearchParams = { category?: string | undefined; region?: string | undefined };

export const Route = createFileRoute("/destinations/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => ({
    category: typeof search["category"] === "string" ? search["category"] : undefined,
    region: typeof search["region"] === "string" ? search["region"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Ethiopian Destinations — Lalibela, Simien, Danakil | EthioExplore" },
      {
        name: "description",
        content:
          "Browse curated Ethiopian destinations by region, category and price — from UNESCO heritage sites to afro-alpine trekking.",
      },
      { property: "og:title", content: "Ethiopian Destinations | EthioExplore" },
      {
        property: "og:description",
        content: "Filter Ethiopia's best destinations by region, category and budget.",
      },
    ],
  }),
  component: DestinationsPage,
});

function DestinationsPage() {
  const { category: initialCategory } = Route.useSearch();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All Regions");
  const [category, setCategory] = useState(initialCategory ?? "All");
  const [maxPrice, setMaxPrice] = useState(350);
  const [sort, setSort] = useState("rating");

  const results = useMemo(() => {
    const list = DESTINATIONS.filter(
      (d) =>
        (region === "All Regions" || d.region === region) &&
        (category === "All" || d.category === category) &&
        d.price <= maxPrice &&
        (d.name.toLowerCase().includes(query.toLowerCase()) ||
          d.desc.toLowerCase().includes(query.toLowerCase())),
    );
    return [...list].sort((a, b) =>
      sort === "price" ? a.price - b.price : b.rating - a.rating,
    );
  }, [query, region, category, maxPrice, sort]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <h1 className="mb-1 font-display text-2xl font-extrabold text-ink md:text-3xl">
          Destinations
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {results.length} place{results.length !== 1 && "s"} to explore across Ethiopia
        </p>

        <div className="mb-8 grid gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft md:grid-cols-4">
          <label className="relative md:col-span-2">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search destinations"
              className="w-full rounded-xl border border-input bg-background py-2.5 pr-3 pl-9 text-sm outline-none focus:border-primary"
            />
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
          >
            {REGIONS.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-input bg-background px-3 py-2.5 text-sm"
          >
            <option value="rating">Top rated</option>
            <option value="price">Lowest price</option>
          </select>
          <div className="md:col-span-2 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border border-border px-3 py-1.5 text-xs font-semibold transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "hover:bg-mist",
                )}
              >
                {c}
              </button>
            ))}
          </div>
          <label className="md:col-span-2 text-xs font-semibold text-muted-foreground">
            Max price: ${maxPrice}
            <input
              type="range"
              min={100}
              max={350}
              step={10}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-primary"
            />
          </label>
        </div>

        {results.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((d) => (
              <DestinationCard key={d.id} d={d} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-display font-bold text-ink">No matches</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try widening your filters or raising the price limit.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
