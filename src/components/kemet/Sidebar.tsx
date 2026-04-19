import { useMemo, useState } from "react";
import type { Landmark, Category } from "@/data/landmarks";
import type { Preferences } from "@/lib/preferences";
import { recommend } from "@/lib/preferences";

const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "historical", label: "Historical" },
  { id: "museum", label: "Museums" },
  { id: "religious", label: "Sacred" },
  { id: "nature", label: "Nature" },
  { id: "food", label: "Food" },
];

interface SidebarProps {
  landmarks: Landmark[];
  preferences: Preferences;
  activeId: string | null;
  category: Category | "all";
  search: string;
  onCategory: (c: Category | "all") => void;
  onSearch: (s: string) => void;
  onSelect: (id: string) => void;
  onOpenStories: () => void;
  onEditPreferences: () => void;
}

export function Sidebar({
  landmarks,
  preferences,
  activeId,
  category,
  search,
  onCategory,
  onSearch,
  onSelect,
  onOpenStories,
  onEditPreferences,
}: SidebarProps) {
  const [tab, setTab] = useState<"recommended" | "all">("recommended");

  const recommendations = useMemo(
    () => recommend(landmarks, preferences),
    [landmarks, preferences],
  );

  const filtered = useMemo(() => {
    const source = tab === "recommended" && recommendations.length > 0 ? recommendations : landmarks;
    return source.filter((lm) => {
      if (category !== "all" && lm.category !== category) return false;
      if (search && !`${lm.name} ${lm.city}`.toLowerCase().includes(search.toLowerCase()))
        return false;
      return true;
    });
  }, [tab, recommendations, landmarks, category, search]);

  return (
    <aside className="flex flex-col h-full w-full lg:w-[420px] bg-card/60 backdrop-blur-xl border-r border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-display text-3xl text-sand leading-none">Kemet</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-spice mt-1">
              Egypt · Atlas of Dust
            </div>
          </div>
          <button
            onClick={onEditPreferences}
            className="text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-spice transition-colors"
            aria-label="Edit preferences"
          >
            ⚙
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search landmarks, cities…"
            className="w-full bg-input border border-border rounded-md pl-10 pr-3 py-2.5 text-sm text-sand placeholder:text-muted-foreground focus:outline-none focus:border-spice transition-colors"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" />
          </svg>
        </div>

        {/* Category chips */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => onCategory(c.id)}
              className={`px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider rounded-full border transition-all ${
                category === c.id
                  ? "bg-spice border-spice text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-spice/50 hover:text-sand"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs + Stories CTA */}
      <div className="px-6 pt-4 flex items-center justify-between gap-3">
        <div className="flex gap-1 text-[11px] font-mono uppercase tracking-widest">
          <button
            onClick={() => setTab("recommended")}
            className={`pb-2 border-b-2 transition-colors ${
              tab === "recommended"
                ? "border-spice text-sand"
                : "border-transparent text-muted-foreground hover:text-sand"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setTab("all")}
            className={`pb-2 ml-4 border-b-2 transition-colors ${
              tab === "all"
                ? "border-spice text-sand"
                : "border-transparent text-muted-foreground hover:text-sand"
            }`}
          >
            All Sites
          </button>
        </div>
        <button
          onClick={onOpenStories}
          className="text-[11px] font-mono uppercase tracking-widest text-spice hover:text-gold transition-colors"
        >
          Stories →
        </button>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">
            No landmarks match your filters.
          </p>
        )}
        {filtered.map((lm, idx) => (
          <button
            key={lm.id}
            onClick={() => onSelect(lm.id)}
            className={`group w-full flex gap-4 p-3 rounded-lg border transition-all duration-300 ease-cinematic text-left animate-fade-up ${
              activeId === lm.id
                ? "border-spice bg-spice/10"
                : "border-border bg-secondary/30 hover:border-spice/40 hover:bg-secondary/50"
            }`}
            style={{ animationDelay: `${idx * 30}ms` }}
          >
            <div className="size-20 shrink-0 overflow-hidden rounded-md bg-muted">
              <img
                src={lm.image}
                alt={lm.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[9px] uppercase tracking-widest text-spice">
                {lm.city}
              </div>
              <div className="font-display text-lg text-sand leading-tight mt-0.5 truncate">
                {lm.name}
              </div>
              <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                {lm.shortDescription}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
