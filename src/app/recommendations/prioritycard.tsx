// prioritycard.tsx
type PriorityCardProps = {
  number: number;

  title: string;

  description: string;
};

export function PriorityCard({
  number,
  title,
  description,
}: PriorityCardProps) {
  return (
    <div
      className="rounded-[22px] border border-white/7 p-5"
      style={{ fontFamily: "'Oswald', sans-serif", background: "rgba(255,255,255,0.02)" }}>

      <div className="flex items-center gap-3.5">

        <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl bg-[#880808] text-lg font-bold text-white">
          {number}
        </div>

        <h3 className="text-lg font-semibold leading-tight">
          {title}
        </h3>

      </div>

      <p className="mt-4 text-sm leading-relaxed text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
        {description}
      </p>

    </div>
  );
}