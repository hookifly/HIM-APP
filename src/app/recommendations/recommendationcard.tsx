// recommendationcard.tsx
type RecommendationCardProps = {
  title: string;

  description: string;

  tag?: string;
};

export function RecommendationCard({
  title,
  description,
  tag,
}: RecommendationCardProps) {
  return (
    <div
      className="rounded-[22px] border border-white/6 p-5"
      style={{ fontFamily: "'Oswald', sans-serif" }}>

      {tag && (
        <div className="mb-3.5 inline-flex rounded-full bg-[#09008B]/20 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.06em] text-[#7C9FC9]" style={{ fontFamily: "Inter, sans-serif" }}>
          {tag}
        </div>
      )}

      <h3 className="text-xl font-semibold leading-tight">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
        {description}
      </p>

    </div>
  );
}