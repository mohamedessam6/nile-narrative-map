import * as React from "react";

const KEY = "pharos-itinerary";

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent("pharos-itinerary-change"));
}

export function useItinerary() {
  const [ids, setIds] = React.useState<string[]>([]);

  React.useEffect(() => {
    setIds(read());
    const sync = () => setIds(read());
    window.addEventListener("pharos-itinerary-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("pharos-itinerary-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const add = React.useCallback((id: string) => {
    const next = read();
    if (!next.includes(id)) {
      next.push(id);
      write(next);
    }
  }, []);

  const remove = React.useCallback((id: string) => {
    write(read().filter((x) => x !== id));
  }, []);

  const move = React.useCallback((from: number, to: number) => {
    const next = read();
    if (to < 0 || to >= next.length) return;
    const [item] = next.splice(from, 1);
    next.splice(to, 0, item);
    write(next);
  }, []);

  const clear = React.useCallback(() => write([]), []);

  return { ids, add, remove, move, clear };
}

/** Approx total hours from duration strings like "2–4 hrs", "Half day", "Full day", "2–3 days". */
export function estimateHours(duration: string): number {
  const lower = duration.toLowerCase();
  if (lower.includes("days")) {
    const m = lower.match(/(\d+)/g);
    if (m) {
      const nums = m.map(Number);
      const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
      return avg * 8;
    }
  }
  if (lower.includes("full")) return 8;
  if (lower.includes("half")) return 4;
  const m = lower.match(/(\d+)/g);
  if (m) {
    const nums = m.map(Number);
    return nums.reduce((a, b) => a + b, 0) / nums.length;
  }
  return 2;
}
