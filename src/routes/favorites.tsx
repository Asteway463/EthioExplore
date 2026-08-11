import { createFileRoute, Link } from "@tanstack/react-router";
import { DestinationCard } from "@/components/DestinationCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { DESTINATIONS } from "@/lib/data";
import { useTrip } from "@/lib/trip-store";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: "Saved Ethiopian Destinations | EthioExplore" },
      {
        name: "description",
        content: "Your saved Ethiopian destinations — revisit the places you want to travel next.",
      },
      { property: "og:title", content: "Saved Destinations | EthioExplore" },
      {
        property: "og:description",
        content: "Every Ethiopian destination you've hearted, in one place.",
      },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { favorites } = useTrip();
  const favs = DESTINATIONS.filter((d) => favorites.includes(d.id));

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <h1 className="mb-1 font-display text-2xl font-extrabold text-ink md:text-3xl">
          Favorites
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          {favs.length} saved place{favs.length !== 1 && "s"}
        </p>
        {favs.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {favs.map((d) => (
              <DestinationCard key={d.id} d={d} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center">
            <p className="font-display font-bold text-ink">No favorites yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Tap the heart icon on any destination to save it here.
            </p>
            <Link
              to="/destinations"
              className="mt-5 inline-block rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
            >
              Browse destinations
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
