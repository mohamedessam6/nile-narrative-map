interface RatingProps {
  rating: number;
  className?: string;
}

export function Rating({ rating, className = "" }: RatingProps) {
  return (
    <div className={`inline-flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={i < rating ? "text-gold" : "text-muted-foreground/30"}
          aria-hidden
        >
          ★
        </span>
      ))}
    </div>
  );
}
