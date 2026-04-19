import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/pharos/Navbar";
import { Footer } from "@/components/pharos/Footer";
import { landmarks, categoryMeta } from "@/data/landmarks";
import { useItinerary, estimateHours } from "@/lib/itinerary";

export const Route = createFileRoute("/plan")({
  head: () => ({
    meta: [
      { title: "Plan My Trip — Pharos" },
      { name: "description", content: "Build a custom itinerary across Egypt's iconic heritage sites with drag-to-reorder stops and total trip time." },
      { property: "og:title", content: "Plan Your Egyptian Journey — Pharos" },
      { property: "og:description", content: "Curate your trip across Egypt's most extraordinary places." },
    ],
  }),
  component: PlanPage,
});

function PlanPage() {
  const { ids, add, remove, move, clear } = useItinerary();
  const navigate = useNavigate({ from: "/plan" });

  const stops = ids
    .map((id) => landmarks.find((l) => l.id === id))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  const totalHours = stops.reduce((sum, s) => sum + estimateHours(s.duration), 0);
  const totalDays = totalHours / 8;

  const downloadItinerary = () => {
    const lines = [
      "PHAROS — Your Egyptian Heritage Itinerary",
      "==========================================",
      "",
      ...stops.map((s, i) => `${i + 1}. ${s.emoji}  ${s.name}  —  ${s.duration}  (${s.era})`),
      "",
      `Total stops: ${stops.length}`,
      `Estimated time: ${totalHours.toFixed(1)} hrs (≈ ${totalDays.toFixed(1)} days)`,
      "",
      "Uncover the ancient. Experience the eternal.",
    ].join("\n");
    const blob = new Blob([lines], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "pharos-itinerary.txt";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Itinerary Builder</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Plan My Trip</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
            Pick the wonders you wish to visit. Reorder them to craft your perfect path through 7,000 years.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* AVAILABLE LANDMARKS */}
          <section className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur">
            <h2 className="mb-4 flex items-center gap-2 font-display text-xl">
              <span className="text-gold">⊕</span> Add Destinations
            </h2>
            <ul className="space-y-2">
              {landmarks.map((l, i) => {
                const added = ids.includes(l.id);
                return (
                  <motion.li
                    key={l.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className={`flex items-center gap-3 rounded-xl border p-3 transition-all ${
                      added
                        ? "border-gold/30 bg-gold/5"
                        : "border-border bg-secondary/30 hover:border-gold/40"
                    }`}
                  >
                    <span className="text-2xl">{l.emoji}</span>
                    <div className="flex-1 min-w-0">
                      <div className="truncate font-medium">{l.name}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{categoryMeta[l.category].label}</span>
                        <span>·</span>
                        <span>{l.duration}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => (added ? remove(l.id) : add(l.id))}
                      className={`flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold transition-all ${
                        added
                          ? "bg-gold/20 text-gold hover:bg-destructive/20 hover:text-destructive"
                          : "bg-gradient-gold text-night shadow-gold hover:scale-110"
                      }`}
                      aria-label={added ? `Remove ${l.name}` : `Add ${l.name}`}
                    >
                      {added ? "✓" : "+"}
                    </button>
                  </motion.li>
                );
              })}
            </ul>
          </section>

          {/* ITINERARY */}
          <section className="rounded-2xl border border-border bg-card/60 p-5 backdrop-blur lg:sticky lg:top-24 lg:self-start">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="flex items-center gap-2 font-display text-xl">
                <span className="text-gold">𓊽</span> Your Journey
              </h2>
              {stops.length > 0 && (
                <button
                  onClick={clear}
                  className="text-xs uppercase tracking-widest text-muted-foreground hover:text-destructive"
                >
                  Clear All
                </button>
              )}
            </div>

            {stops.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border/60 px-6 py-16 text-center">
                <div className="mb-3 text-5xl opacity-50">🗺️</div>
                <p className="text-sm text-muted-foreground">
                  No stops yet. Add destinations from the left to begin.
                </p>
                <button
                  onClick={() => navigate({ to: "/explore" })}
                  className="mt-4 text-xs uppercase tracking-widest text-gold underline-offset-4 hover:underline"
                >
                  Or browse the map →
                </button>
              </div>
            ) : (
              <>
                <ol className="space-y-2">
                  <AnimatePresence initial={false}>
                    {stops.map((s, i) => (
                      <motion.li
                        key={s.id}
                        layout
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: 30 }}
                        transition={{ duration: 0.3 }}
                        className="flex items-center gap-3 rounded-xl border border-border bg-background/60 p-3"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-gold font-display text-sm font-bold text-night">
                          {i + 1}
                        </div>
                        <span className="text-2xl">{s.emoji}</span>
                        <div className="flex-1 min-w-0">
                          <div className="truncate text-sm font-medium">{s.name}</div>
                          <div className="text-xs text-muted-foreground">⏱ {s.duration}</div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => move(i, i - 1)}
                            disabled={i === 0}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-gold disabled:opacity-30"
                            aria-label="Move up"
                          >
                            ↑
                          </button>
                          <button
                            onClick={() => move(i, i + 1)}
                            disabled={i === stops.length - 1}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-gold disabled:opacity-30"
                            aria-label="Move down"
                          >
                            ↓
                          </button>
                          <button
                            onClick={() => remove(s.id)}
                            className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/20 hover:text-destructive"
                            aria-label="Remove"
                          >
                            ✕
                          </button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ol>

                <div className="mt-5 space-y-3 rounded-xl border border-gold/20 bg-gold/5 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Total stops</span>
                    <span className="font-display text-lg text-gold">{stops.length}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated time</span>
                    <span className="font-display text-lg text-gold">
                      {totalHours.toFixed(1)} hrs
                      <span className="ml-1 text-xs text-muted-foreground">
                        (≈ {totalDays.toFixed(1)} days)
                      </span>
                    </span>
                  </div>
                </div>

                <button
                  onClick={downloadItinerary}
                  className="mt-4 w-full rounded-full bg-gradient-gold px-4 py-3 font-display text-sm font-semibold tracking-wider text-night shadow-gold transition-transform hover:scale-[1.02]"
                >
                  ⬇ Download Itinerary
                </button>
              </>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}
