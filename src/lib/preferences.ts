import type { Interest, TravelStyle, Landmark } from "@/data/landmarks";

const KEY = "kemet.preferences.v1";

export interface Preferences {
  interests: Interest[];
  travelStyle: TravelStyle;
  completed: boolean;
}

export const defaultPreferences: Preferences = {
  interests: [],
  travelStyle: "explorer",
  completed: false,
};

export function loadPreferences(): Preferences {
  if (typeof window === "undefined") return defaultPreferences;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultPreferences;
    return { ...defaultPreferences, ...JSON.parse(raw) };
  } catch {
    return defaultPreferences;
  }
}

export function savePreferences(prefs: Preferences) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(prefs));
}

// Mock "AI" recommendation: score landmarks by interest overlap + style heuristics.
export function recommend(landmarks: Landmark[], prefs: Preferences): Landmark[] {
  const scored = landmarks.map((lm) => {
    const overlap = lm.interests.filter((i) => prefs.interests.includes(i)).length;
    let score = overlap * 10;

    if (prefs.travelStyle === "academic" && (lm.category === "museum" || lm.category === "historical"))
      score += 5;
    if (prefs.travelStyle === "explorer" && (lm.category === "nature" || lm.category === "historical"))
      score += 4;
    if (prefs.travelStyle === "relaxed" && (lm.category === "nature" || lm.category === "food"))
      score += 4;

    return { lm, score };
  });

  return scored
    .sort((a, b) => b.score - a.score)
    .filter((s) => s.score > 0)
    .map((s) => s.lm);
}
