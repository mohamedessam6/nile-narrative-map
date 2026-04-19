import { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MlMap, Marker, Popup } from "maplibre-gl";
import type { Landmark, Category } from "@/data/landmarks";

interface KemetMapProps {
  landmarks: Landmark[];
  activeId: string | null;
  highlightedIds: string[];
  categoryFilter: Category | "all";
  onSelect: (id: string) => void;
}

// Free, no-key raster style with warm cartographic feel.
const MAP_STYLE: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    "carto-dark": {
      type: "raster",
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors © CARTO",
    },
  },
  layers: [
    { id: "bg", type: "background", paint: { "background-color": "#1a1410" } },
    { id: "carto", type: "raster", source: "carto-dark", paint: { "raster-opacity": 0.85, "raster-saturation": -0.4, "raster-contrast": 0.1 } },
  ],
};

const CATEGORY_COLORS: Record<Category, string> = {
  historical: "oklch(0.65 0.18 45)",
  museum: "oklch(0.78 0.15 75)",
  nature: "oklch(0.72 0.14 140)",
  religious: "oklch(0.68 0.16 320)",
  food: "oklch(0.7 0.18 25)",
};

export function KemetMap({ landmarks, activeId, highlightedIds, categoryFilter, onSelect }: KemetMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<MlMap | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const popupRef = useRef<Popup | null>(null);
  const [ready, setReady] = useState(false);

  // Init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE,
      center: [30.8, 26.8],
      zoom: 5.2,
      attributionControl: { compact: true },
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    map.on("load", () => setReady(true));
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Render markers when landmarks/filter change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready) return;

    // Clear old markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current.clear();

    const visible = landmarks.filter(
      (lm) => categoryFilter === "all" || lm.category === categoryFilter,
    );

    visible.forEach((lm) => {
      const el = document.createElement("button");
      el.type = "button";
      el.setAttribute("aria-label", lm.name);
      const isHighlighted = highlightedIds.includes(lm.id);
      const isActive = activeId === lm.id;
      el.className = "group relative cursor-pointer";
      el.innerHTML = `
        <span class="absolute inset-0 rounded-full ${isActive || isHighlighted ? "animate-pulse-pin" : ""}" style="background:${CATEGORY_COLORS[lm.category]};opacity:0.4;width:28px;height:28px;left:-2px;top:-2px"></span>
        <span class="relative block rounded-full ring-2 ring-[oklch(0.97_0.015_80)] shadow-lg transition-transform group-hover:scale-125" style="background:${CATEGORY_COLORS[lm.category]};width:24px;height:24px"></span>
      `;
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(lm.id);
      });

      const marker = new maplibregl.Marker({ element: el })
        .setLngLat(lm.coordinates)
        .addTo(map);
      markersRef.current.set(lm.id, marker);
    });
  }, [landmarks, categoryFilter, highlightedIds, activeId, ready, onSelect]);

  // Fly to active landmark + show popup
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !ready || !activeId) return;
    const lm = landmarks.find((l) => l.id === activeId);
    if (!lm) return;

    map.flyTo({
      center: lm.coordinates,
      zoom: 9.5,
      duration: 1800,
      essential: true,
      curve: 1.4,
    });

    if (popupRef.current) popupRef.current.remove();
    popupRef.current = new maplibregl.Popup({ offset: 24, closeButton: true, maxWidth: "320px" })
      .setLngLat(lm.coordinates)
      .setHTML(`
        <div class="font-body">
          <img src="${lm.image}" alt="${lm.name}" class="w-full h-36 object-cover" loading="lazy" />
          <div class="p-4">
            <div class="text-[10px] uppercase tracking-widest" style="color:oklch(0.65 0.18 45)">${lm.era}</div>
            <h3 class="font-display text-xl mt-1" style="color:oklch(0.97 0.015 80)">${lm.name}</h3>
            <p class="text-sm mt-2" style="color:oklch(0.7 0.025 60)">${lm.shortDescription}</p>
          </div>
        </div>
      `)
      .addTo(map);
  }, [activeId, landmarks, ready]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />
      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,oklch(0.13_0.02_40_/_0.6)_100%)]" />
    </div>
  );
}
