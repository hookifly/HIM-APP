// glowupcard.tsx
type GlowupCardProps = {
  current: number;

  potential: number;
};

export function GlowupCard({
  current,
  potential,
}: GlowupCardProps) {
  return (
    <div
      className="rounded-[28px] p-7"
      style={{ fontFamily: "'Oswald', sans-serif", background: "linear-gradient(160deg, #0A2C47 0%, #050D14 100%)" }}>

      <p className="text-sm font-semibold uppercase tracking-[0.1em] text-white/45" style={{ fontFamily: "Inter, sans-serif" }}>
        Potential Increase
      </p>

      <div className="mt-5 flex items-end justify-between">

        <div>
          <p className="text-xs uppercase tracking-[0.1em] text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
            Current
          </p>

          <h2 className="font-bold" style={{ fontSize: "44px", lineHeight: "1" }}>
            {current}
          </h2>
        </div>

        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#880808]/20 pb-0.5 text-lg font-bold text-[#E8857F]">
          →
        </div>

        <div className="text-right">
          <p className="text-xs uppercase tracking-[0.1em] text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
            Potential
          </p>

          <h2 className="font-bold text-[#5EE079]" style={{ fontSize: "44px", lineHeight: "1" }}>
            {potential}
          </h2>
        </div>

      </div>

    </div>
  );
}