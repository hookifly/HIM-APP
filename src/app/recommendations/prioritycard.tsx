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
    <div className="rounded-[28px] border border-white/10 bg-zinc-950 p-6">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-600 text-2xl font-bold">
          {number}
        </div>

        <h3 className="text-2xl font-bold">
          {title}
        </h3>

      </div>

      <p className="mt-5 text-lg leading-relaxed text-white/60">
        {description}
      </p>

    </div>
  );
}