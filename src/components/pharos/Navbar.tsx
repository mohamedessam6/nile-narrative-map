import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "motion/react";

const tabs = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore Map" },
  { to: "/stories", label: "Stories" },
  { to: "/plan", label: "Plan My Trip" },
] as const;

export function Navbar() {
  const { location } = useRouterState();
  const path = location.pathname;

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <motion.span
            className="text-2xl text-gold"
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            ⊕
          </motion.span>
          <span className="font-display text-xl font-semibold tracking-[0.18em] text-shimmer">
            PHAROS
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {tabs.map((t) => {
            const active = t.to === "/" ? path === "/" : path.startsWith(t.to);
            return (
              <Link
                key={t.to}
                to={t.to}
                className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <span className={active ? "text-gold" : ""}>{t.label}</span>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-0 -z-10 rounded-full bg-gold/10 ring-1 ring-gold/30"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          to="/explore"
          className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-5 py-2 font-display text-sm font-semibold tracking-wider text-night shadow-gold transition-transform hover:scale-105"
        >
          Start Journey
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Mobile tabs */}
      <nav className="flex items-center justify-around border-t border-border/40 bg-background/80 px-2 py-1.5 md:hidden">
        {tabs.map((t) => {
          const active = t.to === "/" ? path === "/" : path.startsWith(t.to);
          return (
            <Link
              key={t.to}
              to={t.to}
              className={`flex-1 rounded-md px-2 py-1.5 text-center text-xs font-medium transition-colors ${
                active ? "text-gold" : "text-muted-foreground"
              }`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
