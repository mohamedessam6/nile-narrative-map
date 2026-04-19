import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/pharos/Navbar";
import { Footer } from "@/components/pharos/Footer";
import { Rating } from "@/components/pharos/Rating";
import { landmarks, categoryMeta } from "@/data/landmarks";

interface StoriesSearch {
  id?: string;
}

export const Route = createFileRoute("/stories")({
  head: () => ({
    meta: [
      { title: "Stories — Pharos" },
      { name: "description", content: "Editorial stories of Egypt's 10 most iconic heritage sites — from the Pyramids of Giza to the Oracle of Siwa." },
      { property: "og:title", content: "Egyptian Heritage Stories — Pharos" },
      { property: "og:description", content: "Read the rich histories of Egypt's most iconic places." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): StoriesSearch => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  component: StoriesPage,
});

function StoriesPage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/stories" });
  const [selectedId, setSelectedId] = useState<string>(search.id ?? landmarks[0].id);

  useEffect(() => {
    if (search.id) setSelectedId(search.id);
  }, [search.id]);

  const selected = landmarks.find((l) => l.id === selectedId) ?? landmarks[0];

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">The Chronicles</p>
          <h1 className="mt-2 font-display text-4xl sm:text-5xl">Stories of the Eternal Land</h1>
          <div className="hieroglyph-border mx-auto mt-6 max-w-md" />
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* LIST */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-xl border border-border bg-card/60 p-2 backdrop-blur">
              <div className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                10 Wonders
              </div>
              <ul className="space-y-1">
                {landmarks.map((l, i) => {
                  const active = l.id === selectedId;
                  return (
                    <motion.li
                      key={l.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <button
                        onClick={() => {
                          setSelectedId(l.id);
                          navigate({ search: { id: l.id }, replace: true });
                        }}
                        className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all ${
                          active
                            ? "bg-gold/10 text-gold ring-1 ring-gold/30"
                            : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                        }`}
                      >
                        <span className="text-lg">{l.emoji}</span>
                        <span className="flex-1 truncate font-medium">{l.name}</span>
                        {active && <span className="text-gold">→</span>}
                      </button>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </aside>

          {/* STORY CARD */}
          <AnimatePresence mode="wait">
            <motion.article
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-2xl border border-border bg-card/80 shadow-deep backdrop-blur"
            >
              <div
                className="relative flex h-56 items-center justify-center sm:h-72"
                style={{
                  background: `radial-gradient(ellipse at center, ${selected.color}40 0%, transparent 70%), linear-gradient(180deg, ${selected.color}20, transparent)`,
                }}
              >
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="text-9xl drop-shadow-2xl"
                >
                  {selected.emoji}
                </motion.div>
              </div>

              <div className="space-y-5 p-6 sm:p-10">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-widest"
                    style={{ background: `${selected.color}25`, color: selected.color }}
                  >
                    {categoryMeta[selected.category].label}
                  </span>
                  <span className="rounded-full border border-border px-3 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                    {selected.era}
                  </span>
                </div>

                <h2 className="font-display text-3xl leading-tight sm:text-5xl">{selected.name}</h2>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-border/50 py-3 text-sm text-muted-foreground">
                  <Rating rating={selected.rating} />
                  <span>⏱ Visit duration: {selected.duration}</span>
                  <span>📅 {selected.era}</span>
                </div>

                <p className="text-base leading-relaxed text-foreground/90 text-pretty sm:text-lg">
                  {selected.story}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    onClick={() => navigate({ to: "/explore", search: { id: selected.id } })}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-night shadow-gold transition-transform hover:scale-105"
                  >
                    📍 View on Map
                  </button>
                  <button
                    onClick={() => navigate({ to: "/plan" })}
                    className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-gold/40 hover:text-gold"
                  >
                    Plan a Trip
                  </button>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
