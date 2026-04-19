import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/pharos/Navbar";
import { Footer } from "@/components/pharos/Footer";
import { Rating } from "@/components/pharos/Rating";
import { landmarks, categoryMeta, type Category } from "@/data/landmarks";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Pharos — Discover 7,000 Years of Egyptian Wonder" },
      { name: "description", content: "Interactive heritage atlas of Egypt: pyramids, temples, deserts, and oases. Explore, plan, and journey through 7,000 years of wonder." },
      { property: "og:title", content: "Pharos — Discover 7,000 Years of Egyptian Wonder" },
      { property: "og:description", content: "Interactive heritage atlas of Egypt with maps, stories, and trip planning." },
    ],
  }),
  component: HomePage,
});

const categoryFilters: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "historical", label: "Historical" },
  { value: "museum", label: "Museums" },
  { value: "nature", label: "Nature" },
  { value: "culture", label: "Culture" },
];

function HomePage() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [query, setQuery] = useState("");

  const featured = useMemo(() => {
    return landmarks
      .filter((l) => filter === "all" || l.category === filter)
      .filter((l) => l.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 6);
  }, [filter, query]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div
            className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539768942893-daf53e448371?auto=format&fit=crop&w=2400&q=80')] bg-cover bg-center"
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-hero" aria-hidden />
          <div className="absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 bg-glow-gold blur-3xl" aria-hidden />
        </div>

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-32 lg:pb-32 lg:pt-40">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.25em] text-gold">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold" />
              An Interactive Heritage Atlas
            </div>

            <h1 className="font-display text-5xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-6xl lg:text-7xl">
              Discover{" "}
              <span className="text-shimmer">7,000 Years</span>
              <br />
              of Wonder
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground text-pretty">
              From the silent gaze of the Sphinx to the stars above the White Desert,
              walk the eternal land of Kemet — guided by maps, stories, and ancient lore.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mx-auto mt-10 flex max-w-xl items-center gap-2 rounded-full border border-border bg-card/80 p-2 shadow-deep backdrop-blur-xl"
            >
              <span className="pl-3 text-gold" aria-hidden>🔍</span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Pyramids, Karnak, Siwa..."
                className="flex-1 bg-transparent px-2 py-2 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
              />
              <Link
                to="/explore"
                className="rounded-full bg-gradient-gold px-5 py-2 text-sm font-semibold text-night transition-transform hover:scale-105"
              >
                Explore
              </Link>
            </motion.div>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {categoryFilters.map((c, i) => (
                <motion.button
                  key={c.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  onClick={() => setFilter(c.value)}
                  className={`rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                    filter === c.value
                      ? "border-gold bg-gold/15 text-gold"
                      : "border-border bg-card/40 text-muted-foreground hover:border-gold/40 hover:text-foreground"
                  }`}
                >
                  {c.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="border-y border-border/50 bg-background/40 backdrop-blur">
          <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-border/40 sm:grid-cols-4">
            {[
              { v: "10", l: "Iconic Sites" },
              { v: "7000+", l: "Years of History" },
              { v: "5", l: "UNESCO Wonders" },
              { v: "∞", l: "Stories to Tell" },
            ].map((s, i) => (
              <motion.div
                key={s.l}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-4 py-6 text-center"
              >
                <div className="font-display text-3xl text-gold">{s.v}</div>
                <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">Featured Destinations</p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl">Wonders of the Eternal Land</h2>
          </div>
          <Link to="/stories" className="hidden text-sm text-gold underline-offset-4 hover:underline sm:inline">
            View all stories →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.length === 0 && (
            <div className="col-span-full rounded-xl border border-border bg-card/40 p-10 text-center text-muted-foreground">
              No destinations match — try another search or category.
            </div>
          )}
          {featured.map((l, i) => (
            <motion.article
              key={l.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card/60 backdrop-blur transition-all hover:-translate-y-1 hover:border-gold/40 hover:shadow-gold"
            >
              <div
                className="relative h-48 overflow-hidden bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `linear-gradient(180deg, transparent 30%, oklch(0.13 0.012 260 / 0.85)), linear-gradient(135deg, ${l.color}40, ${l.color}10)`,
                }}
                aria-hidden
              >
                <div className="absolute right-4 top-4 rounded-full bg-background/70 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-gold backdrop-blur">
                  {categoryMeta[l.category].label}
                </div>
                <div className="absolute bottom-4 left-4 text-5xl drop-shadow-lg">{l.emoji}</div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display text-xl leading-tight">{l.name}</h3>
                  <Rating rating={l.rating} className="text-sm" />
                </div>
                <p className="mt-2 text-sm text-muted-foreground text-pretty">{l.teaser}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <span>📅 {l.era}</span>
                  <span>⏱ {l.duration}</span>
                </div>
              </div>
              <Link
                to="/stories"
                search={{ id: l.id }}
                className="absolute inset-0"
                aria-label={`Read about ${l.name}`}
              />
            </motion.article>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
