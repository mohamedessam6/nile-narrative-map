import { useState } from "react";
import type { Interest, TravelStyle } from "@/data/landmarks";
import type { Preferences } from "@/lib/preferences";

const INTERESTS: { id: Interest; label: string; icon: string }[] = [
  { id: "history", label: "History", icon: "𓂀" },
  { id: "culture", label: "Culture", icon: "✦" },
  { id: "spiritual", label: "Spiritual", icon: "☥" },
  { id: "nature", label: "Nature", icon: "❋" },
  { id: "food", label: "Food", icon: "◈" },
];

const STYLES: { id: TravelStyle; label: string; description: string }[] = [
  { id: "relaxed", label: "Relaxed", description: "Slow mornings, sunset cruises, leisurely meals." },
  { id: "explorer", label: "Explorer", description: "Off-the-path sites, desert drives, full days." },
  { id: "academic", label: "Academic", description: "Museums, guided context, deep historical layers." },
];

interface OnboardingProps {
  onComplete: (prefs: Preferences) => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [travelStyle, setTravelStyle] = useState<TravelStyle>("explorer");

  const toggle = (id: Interest) =>
    setInterests((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));

  const finish = () => onComplete({ interests, travelStyle, completed: true });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-dusk/85 backdrop-blur-md p-4 animate-fade-up">
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl overflow-hidden shadow-deep">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-glow-spice rounded-full blur-3xl pointer-events-none" />

        <div className="relative p-10 md:p-14">
          <div className="flex items-center justify-between mb-8">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-spice">
              Step {step + 1} / 2
            </span>
            <button
              onClick={finish}
              className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-sand transition-colors"
            >
              Skip
            </button>
          </div>

          {step === 0 && (
            <>
              <h2 className="font-display text-5xl md:text-6xl text-sand leading-none">
                What calls <span className="text-spice italic">you?</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-md">
                Choose what stirs your curiosity. We'll shape your map around it.
              </p>

              <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-3">
                {INTERESTS.map((i) => {
                  const active = interests.includes(i.id);
                  return (
                    <button
                      key={i.id}
                      onClick={() => toggle(i.id)}
                      className={`group relative flex flex-col items-start gap-2 p-5 border rounded-lg text-left transition-all duration-300 ease-cinematic ${
                        active
                          ? "border-spice bg-spice/10 text-sand"
                          : "border-border bg-secondary/30 text-muted-foreground hover:border-spice/50 hover:text-sand"
                      }`}
                    >
                      <span className={`text-2xl ${active ? "text-spice" : "text-muted-foreground"}`}>
                        {i.icon}
                      </span>
                      <span className="font-medium">{i.label}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-end">
                <button
                  onClick={() => setStep(1)}
                  disabled={interests.length === 0}
                  className="px-8 py-3 bg-spice text-primary-foreground font-medium uppercase tracking-widest text-xs hover:bg-spice/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all rounded-md"
                >
                  Continue →
                </button>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2 className="font-display text-5xl md:text-6xl text-sand leading-none">
                How do you <span className="text-spice italic">travel?</span>
              </h2>
              <p className="text-muted-foreground mt-4 max-w-md">
                We'll pace your journeys to match your rhythm.
              </p>

              <div className="mt-10 flex flex-col gap-3">
                {STYLES.map((s) => {
                  const active = travelStyle === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setTravelStyle(s.id)}
                      className={`flex items-start gap-5 p-5 border rounded-lg text-left transition-all duration-300 ease-cinematic ${
                        active
                          ? "border-spice bg-spice/10"
                          : "border-border bg-secondary/30 hover:border-spice/50"
                      }`}
                    >
                      <span
                        className={`mt-1 size-3 rounded-full shrink-0 ${active ? "bg-spice" : "bg-muted"}`}
                      />
                      <div>
                        <div className={`font-display text-2xl ${active ? "text-sand" : "text-muted-foreground"}`}>
                          {s.label}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">{s.description}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-between items-center">
                <button
                  onClick={() => setStep(0)}
                  className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground hover:text-sand transition-colors"
                >
                  ← Back
                </button>
                <button
                  onClick={finish}
                  className="px-8 py-3 bg-spice text-primary-foreground font-medium uppercase tracking-widest text-xs hover:bg-spice/90 transition-all rounded-md"
                >
                  Begin Journey
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
