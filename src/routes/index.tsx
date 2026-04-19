import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { KemetMap } from "@/components/kemet/KemetMap";
import { Sidebar } from "@/components/kemet/Sidebar";
import { Onboarding } from "@/components/kemet/Onboarding";
import { StoryPanel } from "@/components/kemet/StoryPanel";
import { landmarks, stories, type Category } from "@/data/landmarks";
import { defaultPreferences, loadPreferences, recommend, savePreferences, type Preferences } from "@/lib/preferences";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [prefs, setPrefs] = useState<Preferences>(defaultPreferences);
  const [hydrated, setHydrated] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [showStories, setShowStories] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [category, setCategory] = useState<Category | "all">("all");
  const [search, setSearch] = useState("");
  const [mobilePanel, setMobilePanel] = useState(false);

  // Hydrate preferences from localStorage
  useEffect(() => {
    const loaded = loadPreferences();
    setPrefs(loaded);
    setHydrated(true);
    if (!loaded.completed) setShowOnboarding(true);
  }, []);

  const completeOnboarding = (next: Preferences) => {
    setPrefs(next);
    savePreferences(next);
    setShowOnboarding(false);
  };

  const highlightedIds = useMemo(() => {
    if (!hydrated || !prefs.completed) return [];
    return recommend(landmarks, prefs)
      .slice(0, 4)
      .map((l) => l.id);
  }, [prefs, hydrated]);

  const filteredLandmarks = useMemo(() => {
    if (!search) return landmarks;
    return landmarks.filter((lm) =>
      `${lm.name} ${lm.city}`.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const handleSelect = (id: string) => {
    setActiveId(id);
    setMobilePanel(false);
  };

  return (
    <main className="h-dvh w-screen overflow-hidden flex flex-col lg:flex-row bg-background text-foreground">
      {/* Mobile top bar */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-card/80 backdrop-blur-xl z-20">
        <div>
          <div className="font-display text-2xl text-sand leading-none">Kemet</div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-spice mt-0.5">
            Atlas of Egypt
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowStories(true)}
            className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest border border-border rounded-md text-sand"
          >
            Stories
          </button>
          <button
            onClick={() => setMobilePanel((v) => !v)}
            className="px-3 py-2 text-[10px] font-mono uppercase tracking-widest bg-spice text-primary-foreground rounded-md"
          >
            {mobilePanel ? "Map" : "Browse"}
          </button>
        </div>
      </header>

      {/* Sidebar — hidden on mobile unless toggled */}
      <div
        className={`${
          mobilePanel ? "flex" : "hidden"
        } lg:flex flex-1 lg:flex-none lg:h-full overflow-hidden z-10`}
      >
        <Sidebar
          landmarks={filteredLandmarks}
          preferences={prefs}
          activeId={activeId}
          category={category}
          search={search}
          onCategory={setCategory}
          onSearch={setSearch}
          onSelect={handleSelect}
          onOpenStories={() => setShowStories(true)}
          onEditPreferences={() => setShowOnboarding(true)}
        />
      </div>

      {/* Map */}
      <div
        className={`${
          mobilePanel ? "hidden" : "flex"
        } lg:flex flex-1 relative h-full`}
      >
        <KemetMap
          landmarks={landmarks}
          activeId={activeId}
          highlightedIds={highlightedIds}
          categoryFilter={category}
          onSelect={handleSelect}
        />

        {/* Floating legend */}
        <div className="hidden md:flex absolute top-6 left-6 z-10 items-center gap-3 px-4 py-2.5 bg-card/80 backdrop-blur-xl border border-border rounded-full shadow-deep">
          <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            {filteredLandmarks.length} sites
          </span>
          <span className="w-px h-4 bg-border" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-spice">
            {category === "all" ? "All categories" : category}
          </span>
        </div>
      </div>

      {/* Onboarding modal */}
      {hydrated && showOnboarding && <Onboarding onComplete={completeOnboarding} />}

      {/* Stories panel */}
      {showStories && (
        <StoryPanel
          stories={stories}
          landmarks={landmarks}
          onClose={() => setShowStories(false)}
          onStep={(id) => setActiveId(id)}
        />
      )}
    </main>
  );
}
