import { useMemo, useState } from "react";
import type { Landmark, Story } from "@/data/landmarks";

interface StoryPanelProps {
  stories: Story[];
  landmarks: Landmark[];
  onClose: () => void;
  onStep: (landmarkId: string) => void;
}

export function StoryPanel({ stories, landmarks, onClose, onStep }: StoryPanelProps) {
  const [storyId, setStoryId] = useState<string | null>(null);
  const [stepIdx, setStepIdx] = useState(0);

  const story = useMemo(() => stories.find((s) => s.id === storyId) ?? null, [stories, storyId]);

  const begin = (id: string) => {
    setStoryId(id);
    setStepIdx(0);
    const s = stories.find((x) => x.id === id);
    if (s) onStep(s.steps[0].landmarkId);
  };

  const goto = (idx: number) => {
    if (!story) return;
    const clamped = Math.max(0, Math.min(idx, story.steps.length - 1));
    setStepIdx(clamped);
    onStep(story.steps[clamped].landmarkId);
  };

  return (
    <div className="fixed inset-0 z-40 flex items-stretch justify-end bg-dusk/70 backdrop-blur-sm animate-fade-up">
      <div className="relative w-full max-w-xl h-full bg-card border-l border-border shadow-deep flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-spice">
              Storymaps
            </div>
            <div className="font-display text-2xl text-sand mt-1">
              {story ? story.title : "Curated Journeys"}
            </div>
          </div>
          <button
            onClick={onClose}
            className="size-9 rounded-full border border-border text-muted-foreground hover:text-sand hover:border-spice transition-colors"
            aria-label="Close stories"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {!story && (
            <div className="p-6 space-y-4">
              {stories.map((s) => (
                <button
                  key={s.id}
                  onClick={() => begin(s.id)}
                  className="group w-full text-left rounded-xl overflow-hidden border border-border bg-secondary/30 hover:border-spice/60 transition-all duration-500 ease-cinematic"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-muted">
                    <img
                      src={s.cover}
                      alt={s.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 grayscale-[0.3] group-hover:grayscale-0"
                    />
                  </div>
                  <div className="p-5">
                    <div className="font-mono text-[10px] uppercase tracking-widest text-spice">
                      {s.steps.length} chapters
                    </div>
                    <div className="font-display text-3xl text-sand mt-2 leading-tight">{s.title}</div>
                    <div className="text-sm text-muted-foreground mt-2">{s.subtitle}</div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {story && (
            <div className="flex flex-col">
              {(() => {
                const step = story.steps[stepIdx];
                const lm = landmarks.find((l) => l.id === step.landmarkId);
                if (!lm) return null;
                return (
                  <>
                    <div className="aspect-[16/10] overflow-hidden bg-muted relative">
                      <img
                        src={lm.image}
                        alt={lm.name}
                        loading="lazy"
                        className="w-full h-full object-cover"
                        key={lm.id}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="font-mono text-[10px] uppercase tracking-widest text-spice">
                          {step.chapter}
                        </div>
                        <div className="font-display text-3xl text-sand mt-2 leading-tight">
                          {lm.name}
                        </div>
                        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                          {lm.city} · {lm.era}
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <p className="text-base text-sand/90 leading-relaxed font-light">
                        {step.narration}
                      </p>

                      {/* Audio placeholder */}
                      <div className="mt-6 flex items-center gap-3 p-4 rounded-lg border border-border bg-secondary/30">
                        <button className="size-10 rounded-full bg-spice text-primary-foreground flex items-center justify-center shrink-0">
                          ▶
                        </button>
                        <div className="flex-1">
                          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                            Narration
                          </div>
                          <div className="text-sm text-sand mt-0.5">{step.chapter}</div>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground tabular-nums">
                          02:14
                        </span>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Story controls */}
        {story && (
          <div className="p-6 border-t border-border bg-charcoal/50">
            <div className="flex items-center gap-1 mb-4">
              {story.steps.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    i === stepIdx ? "bg-spice" : i < stepIdx ? "bg-spice/40" : "bg-border"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center justify-between gap-4">
              <button
                onClick={() => setStoryId(null)}
                className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-sand transition-colors"
              >
                ← All Stories
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goto(stepIdx - 1)}
                  disabled={stepIdx === 0}
                  className="px-4 py-2 border border-border rounded-md text-xs font-mono uppercase tracking-widest text-sand hover:border-spice disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Prev
                </button>
                <span className="font-mono text-xs text-muted-foreground tabular-nums px-2">
                  {String(stepIdx + 1).padStart(2, "0")} / {String(story.steps.length).padStart(2, "0")}
                </span>
                <button
                  onClick={() => goto(stepIdx + 1)}
                  disabled={stepIdx === story.steps.length - 1}
                  className="px-4 py-2 bg-spice text-primary-foreground rounded-md text-xs font-mono uppercase tracking-widest hover:bg-spice/90 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
