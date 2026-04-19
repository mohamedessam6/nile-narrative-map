export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/40 bg-background/60">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="hieroglyph-border mb-8" aria-hidden />
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-2 font-display text-xl tracking-[0.2em] text-gold">
            <span aria-hidden>⊕</span> PHAROS
          </div>
          <p className="font-display italic text-muted-foreground">
            Uncover the ancient. Experience the eternal.
          </p>
          <div className="flex gap-6 text-xs uppercase tracking-widest text-muted-foreground">
            <span>𓂀</span><span>𓋹</span><span>𓊽</span><span>𓏏</span><span>𓆣</span>
          </div>
          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Pharos · An interactive atlas of Egyptian heritage
          </p>
        </div>
      </div>
    </footer>
  );
}
