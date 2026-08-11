import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Heart, MapPin, Plus, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { RatingStars } from "@/components/DestinationCard";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { DESTINATIONS, findDestination } from "@/lib/data";
import { formatEtb, formatUsd, useTrip } from "@/lib/trip-store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/destinations/$id")({
  loader: ({ params }) => {
    const destination = findDestination(params.id);
    if (!destination) throw notFound();
    return destination;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.name ?? "Destination"} — Travel Guide | EthioExplore` },
      { name: "description", content: loaderData?.desc ?? "Ethiopian destination guide." },
      { property: "og:title", content: `${loaderData?.name ?? "Destination"} | EthioExplore` },
      { property: "og:description", content: loaderData?.desc ?? "Ethiopian destination guide." },
    ],
  }),
  component: DetailPage,
});

function DetailPage() {
  const d = Route.useLoaderData();
  const { isFavorite, toggleFavorite, addStop } = useTrip();
  const fav = isFavorite(d.id);
  const related = DESTINATIONS.filter((x) => x.region === d.region && x.id !== d.id).slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="surface-brand relative flex h-72 items-end overflow-hidden md:h-96">
        <div className="absolute inset-0 bg-ink/25" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-8 md:px-8">
          <Link
            to="/destinations"
            className="mb-4 inline-flex items-center gap-1 text-xs font-semibold text-ink-foreground/90"
          >
            <ArrowLeft className="size-4" /> All destinations
          </Link>
          <span className="block text-xs font-bold tracking-widest text-ink-foreground/80 uppercase">
            {d.tag}
          </span>
          <h1 className="font-display text-3xl font-extrabold text-ink-foreground md:text-5xl">
            {d.name}
          </h1>
          <p className="mt-2 flex items-center gap-1 text-sm text-ink-foreground/85">
            <MapPin className="size-4" /> {d.region} · {d.category}
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 md:px-8 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <RatingStars rating={d.rating} />
              <span className="text-sm font-semibold">{d.rating}</span>
              <span className="text-sm text-muted-foreground">· Difficulty: {d.level}</span>
            </div>
            <p className="text-muted-foreground">{d.desc}</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Best season", "Oct – Mar"],
              ["Suggested stay", "2 – 3 days"],
              ["Coordinates", `${d.lat.toFixed(2)}, ${d.lng.toFixed(2)}`],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl border border-border p-4">
                <p className="text-xs text-muted-foreground">{k}</p>
                <p className="font-display font-bold text-ink">{v}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl border border-border p-5">
            <h2 className="mb-3 flex items-center gap-2 font-display font-bold text-ink">
              <TriangleAlert className="size-4 text-gold" /> Travel tips
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Carry cash in birr — card acceptance outside Addis Ababa is limited.</li>
              <li>Local guides are mandatory in several parks and greatly improve the visit.</li>
              <li>Altitude and heat vary hugely by region; pack layers for the highlands.</li>
            </ul>
          </div>

          {related.length > 0 && (
            <div>
              <h2 className="mb-4 font-display text-lg font-bold text-ink">
                More in {d.region}
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {related.map((r) => (
                  <Link
                    key={r.id}
                    to="/destinations/$id"
                    params={{ id: r.id }}
                    className="card-lift rounded-2xl border border-border p-4"
                  >
                    <p className="font-display font-bold text-ink">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.category}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-border p-5 shadow-soft">
            <p className="font-display text-2xl font-extrabold text-primary">
              {formatUsd(d.price)}
              <span className="text-sm font-normal text-muted-foreground"> / person</span>
            </p>
            <p className="text-xs text-muted-foreground">{formatEtb(d.price)}</p>
            <button
              onClick={() => {
                addStop(d.id);
                toast.success(`${d.name} added to your itinerary`);
              }}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <Plus className="size-4" /> Add to trip planner
            </button>
            <button
              onClick={() => toggleFavorite(d.id)}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border border-border py-3 text-sm font-semibold transition hover:bg-mist"
            >
              <Heart
                className={cn("size-4", fav ? "fill-destructive text-destructive" : "")}
              />
              {fav ? "Saved to favorites" : "Save to favorites"}
            </button>
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
