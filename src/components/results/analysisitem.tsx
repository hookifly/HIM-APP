"use client";

type AnalysisItemProps = {
  title: string;

  score: number;

  color: string;

  insight: string;
};

export function AnalysisItem({
  title,
  score,
  color,
  insight,
}: AnalysisItemProps) {
  return (
    <div>

      {/* TOP */}
      <div className="flex items-center justify-between">

        <h3 className="text-xl font-semibold">
          {title}
        </h3>

        <span
          className="text-xl font-bold"
          style={{ color }}
        >
          {score}
        </span>

      </div>

      {/* BAR */}
      <div className="mt-3 h-4 overflow-hidden rounded-full bg-zinc-800">

        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{
            width: `${score}%`,
            backgroundColor: color,
          }}
        />

      </div>

      {/* INSIGHT */}
      <p className="mt-3 text-base leading-relaxed text-white/50">
        {insight}
      </p>

    </div>
  );
}