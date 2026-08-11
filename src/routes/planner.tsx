import { createFileRoute, Link } from "@tanstack/react-router";
import { Bed, Calculator, Car, GripVertical, Map, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { formatEtb, formatUsd, useTrip } from "@/lib/trip-store";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "Ethiopia Trip Planner & Budget Calculator | EthioExplore" },
      {
        name: "description",
        content:
          "Build a day-by-day Ethiopian itinerary, reorder stops and estimate experiences, lodging and transport costs in USD and ETB.",
      },
      { property: "og:title", content: "Ethiopia Trip Planner | EthioExplore" },
      {
        property: "og:description",
        content: "Drag-and-drop itinerary building with live budget estimates in USD and ETB.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  const { items, removeStop, reorder, travellers, setTravellers, days, setDays } = useTrip();
  const [dragIdx, setDragIdx] = useState<number | null>(null);

  const experiences = items.reduce((sum, d) => sum + d.price, 0) * travellers;
  const accommodation = days * 60 * travellers;
  const transport = days * 45;
  const grand = experiences + accommodation + transport;

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <h1 className="mb-1 font-display text-2xl font-extrabold text-ink md:text-3xl">
          Trip Planner
        </h1>
        <p className="mb-8 text-sm text-muted-foreground">
          Drag stops to reorder your route, then tune the budget.
        </p>

        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          <div className="space-y-3">
            {items.length ? (
              items.map((it, i) => (
                <div
                  key={it.id}
                  draggable
                  onDragStart={() => setDragIdx(i)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (dragIdx !== null && dragIdx !== i) reorder(dragIdx, i);
                    setDragIdx(null);
                  }}
                  className="flex cursor-move items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-soft"
                >
                  <GripVertical className="size-5 text-muted-foreground/50" />
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 font-display text-sm font-bold text-primary">
                    {i + 1}
                  </span>
                  <div className="surface-brand size-14 shrink-0 rounded-xl" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-ink">{it.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {it.region} · {it.level}
                    </p>
                  </div>
                  <p className="hidden text-sm font-bold text-primary sm:block">
                    {formatUsd(it.price)}
                  </p>
                  <button
                    onClick={() => removeStop(it.id)}
                    aria-label={`Remove ${it.name}`}
                    className="text-muted-foreground/60 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-border p-12 text-center">
                <p className="font-display font-bold text-ink">Your itinerary is empty</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Browse destinations and add stops to build your route.
                </p>
              </div>
            )}
            <Link
              to="/destinations"
              className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border p-4 text-sm font-semibold text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              <Plus className="size-4" /> Add another destination
            </Link>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border p-5 shadow-soft">
              <h2 className="mb-4 flex items-center gap-2 font-display font-bold text-ink">
                <Calculator className="size-4 text-primary" /> Budget Calculator
              </h2>
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                Travellers
              </label>
              <input
                type="number"
                min={1}
                value={travellers}
                onChange={(e) => setTravellers(Math.max(1, Number(e.target.value)))}
                className="mb-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
              <label className="mb-1 block text-xs font-semibold text-muted-foreground">
                Trip length (days)
              </label>
              <input
                type="number"
                min={1}
                value={days}
                onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                className="mb-4 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
              />
              <div className="space-y-2 border-t border-border pt-4 text-sm">
                {[
                  ["Experiences", experiences],
                  ["Accommodation (est.)", accommodation],
                  ["Transportation (est.)", transport],
                ].map(([label, value]) => (
                  <div key={label as string} className="flex justify-between text-muted-foreground">
                    <span>{label}</span>
                    <span className="font-medium text-ink">{formatUsd(value as number)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-border pt-2 font-bold text-ink">
                  <span>Estimated total</span>
                  <span className="text-right text-primary">
                    {formatUsd(grand)}
                    <span className="block text-[11px] font-normal text-muted-foreground">
                      {formatEtb(grand)}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border p-5 shadow-soft">
              <h2 className="mb-3 flex items-center gap-2 font-display font-bold text-ink">
                <Map className="size-4 text-sky" /> Route
              </h2>
              {items.length ? (
                <ol className="space-y-2 text-sm text-muted-foreground">
                  {items.map((it, i) => (
                    <li key={it.id}>
                      {i + 1}. {it.name} — {it.lat.toFixed(2)}, {it.lng.toFixed(2)}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-xs text-muted-foreground">Add stops to see them plotted.</p>
              )}
            </div>

            <div className="rounded-2xl border border-border p-5 shadow-soft">
              <h2 className="mb-3 flex items-center gap-2 font-display font-bold text-ink">
                <Car className="size-4 text-sky" /> Transportation
              </h2>
              <div className="flex flex-wrap gap-2">
                {["4WD Rental", "Domestic Flights", "Private Driver"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-sky/10 px-2.5 py-1.5 text-xs font-medium text-sky"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border p-5 shadow-soft">
              <h2 className="mb-3 flex items-center gap-2 font-display font-bold text-ink">
                <Bed className="size-4 text-gold" /> Accommodation
              </h2>
              <div className="flex flex-wrap gap-2">
                {["Eco Lodges", "Heritage Hotels", "Guesthouses"].map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-gold/15 px-2.5 py-1.5 text-xs font-medium text-gold-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => toast.success("Itinerary saved")}
              className="w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              Save Itinerary
            </button>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
}
