type GlowupCardProps = {
  current: number;

  potential: number;
};

export function GlowupCard({
  current,
  potential,
}: GlowupCardProps) {
  return (
    <div className="rounded-[32px] bg-gradient-to-br from-blue-700 to-indigo-900 p-7">

      <p className="text-lg font-semibold text-white/70">
        Potential Increase
      </p>

      <div className="mt-5 flex items-end justify-between">

        <div>
          <p className="text-sm text-white/50">
            Current
          </p>

          <h2 className="text-5xl font-black">
            {current}
          </h2>
        </div>

        <div className="pb-2 text-4xl font-black">
          →
        </div>

        <div>
          <p className="text-sm text-white/50">
            Potential
          </p>

          <h2 className="text-5xl font-black text-green-300">
            {potential}
          </h2>
        </div>

      </div>

    </div>
  );
}