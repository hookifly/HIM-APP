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
    <div className="rounded-[28px] bg-zinc-950 p-6">

      {tag && (
        <div className="mb-4 inline-flex rounded-full bg-blue-600/15 px-4 py-2 text-sm font-semibold text-blue-400">
          {tag}
        </div>
      )}

      <h3 className="text-3xl font-bold">
        {title}
      </h3>

      <p className="mt-4 text-lg leading-relaxed text-white/60">
        {description}
      </p>

    </div>
  );
}