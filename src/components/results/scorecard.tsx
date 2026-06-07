"use client";

type ScoreCardProps = {
  title: string;

  score: number;

  color: string;
};

export function ScoreCard({
  title,
  score,
  color,
}: ScoreCardProps) {
  const radius = 42;

  const stroke = 10;

  const normalizedRadius =
    radius - stroke / 2;

  const circumference =
    normalizedRadius * 2 * Math.PI;

  const strokeDashoffset =
    circumference -
    (score / 100) * circumference;

  return (
    <div className="rounded-[28px] bg-zinc-950 p-5">

      {/* TITLE */}
      <h3 className="text-3xl font-bold leading-none">
        {title}
      </h3>

      {/* RING */}
      <div className="mt-6 flex justify-center">

        <div className="relative h-32 w-32">

          <svg
            height="100%"
            width="100%"
            viewBox="0 0 100 100"
            className="-rotate-90"
          >

            {/* BACKGROUND */}
            <circle
              stroke="#27272a"
              fill="transparent"
              strokeWidth={stroke}
              r={normalizedRadius}
              cx="50"
              cy="50"
            />

            {/* PROGRESS */}
            <circle
              stroke={color}
              fill="transparent"
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={`${circumference} ${circumference}`}
              style={{
                strokeDashoffset,
                transition:
                  "stroke-dashoffset 1s ease",
              }}
              r={normalizedRadius}
              cx="50"
              cy="50"
            />

          </svg>

          {/* SCORE */}
          <div className="absolute inset-0 flex items-center justify-center">

            <span
              className="text-5xl font-bold"
              style={{
                color,
              }}
            >
              {score}
            </span>

          </div>

        </div>

      </div>
    </div>
  );
}