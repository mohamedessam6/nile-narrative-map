import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { Navbar } from "@/components/pharos/Navbar";
import { Footer } from "@/components/pharos/Footer";
import { Rating } from "@/components/pharos/Rating";
import { landmarks, categoryMeta, type Category, type Landmark } from "@/data/landmarks";
import { useItinerary } from "@/lib/itinerary";

interface ExploreSearch {
  id?: string;
}

export const Route = createFileRoute("/explore")({
  head: () => ({
    meta: [
      { title: "Explore Map — Pharos" },
      { name: "description", content: "Interactive map of Egypt's 10 most iconic heritage sites with rich stories and visit information." },
      { property: "og:title", content: "Explore Egypt — Pharos Map" },
      { property: "og:description", content: "Discover pyramids, temples, deserts and oases on an interactive dark map." },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): ExploreSearch => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
  component: ExplorePage,
});

const ALL: Category[] = ["historical", "museum", "nature", "culture"];

function makeIcon(emoji: string, active: boolean) {
  return L.divIcon({
    className: `pharos-pin${active ? " is-active" : ""}`,
    html: `<div class="pharos-pin-inner"><span>${emoji}</span></div>`,
    iconSize: [42, 42],
    iconAnchor: [21, 38],
    popupAnchor: [0, -36],
  });
}

function FlyTo({ target }: { target: Landmark | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo([target.lat, target.lng], 9, { duration: 1.4 });
    }
  }, [target, map]);
  return null;
}

function ExplorePage() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });
  const [active, setActive] = useState<Set<Category>>(new Set(ALL));
  const [selectedId, setSelectedId] = useState<string | null>(search.id ?? null);
  const itinerary = useItinerary();
  const initialized = useRef(false);

  useEffect(() => {
    if (search.id) setSelectedId(search.id);
  }, [search.id]);

  // Default-select first landmark on initial mount for delight
  useEffect(() => {
    if (!initialized.current && !selectedId) {
      initialized.current = true;
      setSelectedId("giza");
    }
  }, [selectedId]);

  const visible = useMemo(
    () => landmarks.filter((l) => active.has(l.category)),
    [active],
  );

  const selected = useMemo(
    () => landmarks.find((l) => l.id === selectedId) ?? null,
    [selectedId],
  );

  const toggleCat = (c: Category) => {
    const next = new Set(active);
    if (next.has(c)) next.delete(c);
    else next.add(c);
    setActive(next);
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    navigate({ search: { id }, replace: true });
  };

  const inItinerary = selected ? itinerary.ids.includes(selected.id) : false;

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="relative flex flex-1 flex-col lg:flex-row">
        {/* MAP */}
        <div className="relative flex-1">
          {/* Filters */}
          <div className="pointer-events-none absolute left-0 right-0 top-4 z-[600] flex justify-center px-4">
            <div className="pointer-events-auto flex flex-wrap items-center gap-1.5 rounded-full border border-border bg-background/80 p-1.5 shadow-deep backdrop-blur-xl">
              {ALL.map((c) => {
                const on = active.has(c);
                return (
                  <button
                    key={c}
                    onClick={() => toggleCat(c)}
                    className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
                      on
                        ? "bg-gold/15 text-gold ring-1 ring-gold/30"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span aria-hidden>{categoryMeta[c].emoji}</span>
                    {categoryMeta[c].label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="h-[60vh] w-full lg:h-[calc(100vh-4rem)]">
            <MapContainer
              center={[26.8, 29.9]}
              zoom={5}
              minZoom={4}
              maxZoom={14}
              scrollWheelZoom
              style={{ height: "100%", width: "100%" }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                subdomains={["a", "b", "c", "d"]}
              />
              <FlyTo target={selected} />
              {visible.map((l) => (
                <Marker
                  key={l.id}
                  position={[l.lat, l.lng]}
                  icon={makeIcon(l.emoji, l.id === selectedId)}
                  eventHandlers={{ click: () => handleSelect(l.id) }}
                />
              ))}
            </MapContainer>
          </div>
        </div>

        {/* SIDEBAR / BOTTOM SHEET */}
        <AnimatePresence mode="wait">
          {selected && (
            <motion.aside
              key={selected.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-border bg-card/90 backdrop-blur-xl lg:w-[400px] lg:border-l lg:border-t-0 lg:shadow-deep"
            >
              <div className="flex h-full max-h-[calc(100vh-4rem)] flex-col overflow-y-auto">
                <div
                  className="relative h-40 shrink-0"
                  style={{
                    background: `linear-gradient(180deg, ${selected.color}30 0%, transparent 100%)`,
                  }}
                >
                  <div className="absolute right-3 top-3">
                    <button
                      onClick={() => {
                        setSelectedId(null);
                        navigate({ search: {}, replace: true });
                      }}
                      className="rounded-full bg-background/70 p-2 text-muted-foreground transition-colors hover:text-foreground"
                      aria-label="Close panel"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="absolute bottom-4 left-5 text-6xl drop-shadow-2xl">{selected.emoji}</div>
                </div>

                <div className="space-y-4 p-5 pt-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest"
                      style={{ background: `${selected.color}20`, color: selected.color }}
                    >
                      {categoryMeta[selected.category].label}
                    </span>
                    <span className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                      {selected.era}
                    </span>
                  </div>

                  <h2 className="font-display text-2xl leading-tight">{selected.name}</h2>

                  <div className="flex items-center justify-between border-y border-border/50 py-2 text-sm">
                    <Rating rating={selected.rating} />
                    <span className="text-muted-foreground">⏱ {selected.duration}</span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                    {selected.story}
                  </p>

                  <div className="flex flex-col gap-2 pt-2">
                    <button
                      onClick={() => {
                        if (inItinerary) itinerary.remove(selected.id);
                        else itinerary.add(selected.id);
                      }}
                      className={`w-full rounded-full border px-4 py-2.5 text-sm font-semibold transition-all ${
                        inItinerary
                          ? "border-gold/50 bg-gold/10 text-gold"
                          : "border-border hover:border-gold/40 hover:text-gold"
                      }`}
                    >
                      {inItinerary ? "✓ Added to Itinerary" : "+ Add to Itinerary"}
                    </button>
                    <button
                      onClick={() => navigate({ to: "/stories", search: { id: selected.id } })}
                      className="w-full rounded-full bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-night shadow-gold transition-transform hover:scale-[1.02]"
                    >
                      Read Full Story →
                    </button>
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>

      <Footer />
    </div>
  );
}
