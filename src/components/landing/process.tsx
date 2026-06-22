import Image from "next/image";

const steps = [
  {
    number: "01",
    title: "Scan Your Face",
    sub: "Front. Left. Right.",
    description: "Natural light. No filters. No sunglasses. Raw.",
  },
  {
    number: "02",
    title: "AI Scans Your Face",
    description: "Jawline. Eyes. Symmetry. Bone structure. Skin. All of it.",
  },
  {
    number: "03",
    title: "Get Your Masculinity Rating",
    description: "Current rating, presence score, potential bonus, and your archetype unlocked.",
  },
  {
    number: "04",
    title: "Try Macho Meter AI",
    description: "Exact grooming, fitness, and style moves to maximize your rating.",
  },
];

function DashboardPreview() {
  const currentScore = 78;
  const potentialScore = 88;
  const masculinityScore = 82;

  // Ring math — circumference for r=42 = 2π×42 ≈ 263.9
  const r = 42;
  const circ = 2 * Math.PI * r;
  const currentOffset = circ - (currentScore / 100) * circ;
  const potentialOffset = circ - (potentialScore / 100) * circ;

  // Large ring — r=58, circ ≈ 364.4
  const rLg = 58;
  const circLg = 2 * Math.PI * rLg;
  const mascOffset = circLg - (masculinityScore / 100) * circLg;

  return (
    <div
      className="mt-4 w-full overflow-hidden rounded-[20px] border border-white/8 p-5"
      style={{ background: "linear-gradient(160deg, #0D0D0D 0%, #0A0A0A 100%)", fontFamily: "'Oswald', sans-serif" }}>

      {/* Sample label */}
      <p className="mb-4 text-center text-[10px] uppercase tracking-[0.25em] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
        Sample Result
      </p>

      {/* Archetype pill */}
      <div
        className="mb-5 w-full rounded-2xl py-4 text-center"
        style={{ background: "linear-gradient(135deg, rgba(136,8,8,0.35) 0%, rgba(9,0,139,0.25) 100%)" }}>
        <p className="mb-0.5 text-[10px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
          Your Archetype
        </p>
        <span className="text-xl font-bold tracking-[0.06em] text-[#E8857F]">
          WARRIOR
        </span>
      </div>

      {/* Two score rings */}
      <div className="mb-4 grid grid-cols-2 gap-3">

        {/* Current Score */}
        <div className="flex flex-col items-center rounded-2xl border border-white/6 bg-white/[0.02] py-5">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r={r}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="9"
            />
            <circle
              cx="50" cy="50" r={r}
              fill="none"
              stroke="#880808"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={currentOffset}
              transform="rotate(-90 50 50)"
            />
            <text
              x="50" y="50"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              fontSize="22"
              fontWeight="700"
              fontFamily="Oswald, sans-serif">
              {currentScore}
            </text>
          </svg>
          <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
            Current Score
          </p>
        </div>

        {/* Potential Score */}
        <div className="flex flex-col items-center rounded-2xl border border-white/6 bg-white/[0.02] py-5">
          <svg width="100" height="100" viewBox="0 0 100 100">
            <circle
              cx="50" cy="50" r={r}
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="9"
            />
            <circle
              cx="50" cy="50" r={r}
              fill="none"
              stroke="#7C9FC9"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={circ}
              strokeDashoffset={potentialOffset}
              transform="rotate(-90 50 50)"
            />
            <text
              x="50" y="50"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#ffffff"
              fontSize="22"
              fontWeight="700"
              fontFamily="Oswald, sans-serif">
              {potentialScore}
            </text>
          </svg>
          <p className="mt-2 text-[9px] uppercase tracking-[0.15em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
            Potential Score
          </p>
        </div>
      </div>

      {/* Masculinity Score — large ring */}
      <div
        className="flex flex-col items-center rounded-2xl border border-[#880808]/15 py-6"
        style={{ background: "linear-gradient(160deg, #1A0606 0%, #0D0303 100%)" }}>

        <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.06em] text-white">
          Masculinity Score
        </h3>

        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle
            cx="70" cy="70" r={rLg}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
          />
          <circle
            cx="70" cy="70" r={rLg}
            fill="none"
            stroke="#E8857F"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={circLg}
            strokeDashoffset={mascOffset}
            transform="rotate(-90 70 70)"
          />
          <text
            x="70" y="64"
            textAnchor="middle"
            dominantBaseline="central"
            fill="#E8857F"
            fontSize="34"
            fontWeight="700"
            fontFamily="Oswald, sans-serif">
            {masculinityScore}
          </text>
          <text
            x="70" y="88"
            textAnchor="middle"
            dominantBaseline="central"
            fill="rgba(255,255,255,0.3)"
            fontSize="11"
            fontFamily="Inter, sans-serif">
            / 100
          </text>
        </svg>

        <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
          Masculinity Score
        </p>
      </div>

    </div>
  );
}

export function Process() {
  return (
    <section className="bg-black px-6 py-14" style={{ fontFamily: "'Oswald', sans-serif" }}>

      {/* Section header */}
      <div className="mb-10">
        <div className="mb-3.5 flex items-center gap-3">
          <div className="h-0.5 w-6 rounded-full bg-[#880808]" />
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C23636]" style={{ fontFamily: "Inter, sans-serif" }}>
            The Process
          </span>
        </div>
        <h2 className="font-bold leading-[1.05] text-white" style={{ fontSize: "44px" }}>
          HOW IT<br />
          <span className="text-[#C23636]">WORKS.</span>
        </h2>
      </div>

      {/* Steps */}
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div key={step.number} className="relative flex gap-4">

            {/* Left: number + connector */}
            <div className="flex flex-shrink-0 flex-col items-center">
              <div className="flex h-[38px] w-[38px] flex-shrink-0 items-center justify-center rounded-full border border-[#09008B]/50 bg-[#0A2C47]">
                <span className="text-[13px] font-semibold text-[#7C9FC9]">{step.number}</span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-0.5 flex-1 rounded-full bg-[#1c1c1c] min-h-5" />
              )}
            </div>

            {/* Content */}
            <div className="pb-7 pt-1.5 flex-1">

              {/* Title row — scan icon only on step 01 */}
              <div className="mb-1.5 flex items-center gap-2.5">
                <h3 className="font-semibold leading-tight text-white" style={{ fontSize: "19px" }}>
                  {step.title}
                </h3>

                {step.number === "01" && (
                  <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#09008B]/30">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#7C9FC9" strokeWidth="1.8">
                      <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </div>
                )}
              </div>

              <p className="text-[13.5px] leading-relaxed text-white/45" style={{ fontFamily: "Inter, sans-serif" }}>
                {step.description}
              </p>

              {/* Dashboard preview — only on step 03 */}
              {step.number === "03" && <DashboardPreview />}

            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-2 flex items-center gap-3.5">
        <div className="h-px flex-1 bg-white/8" />
        <span className="text-[10px] uppercase tracking-[0.2em] text-white/22" style={{ fontFamily: "Inter, sans-serif" }}>
          End to end
        </span>
        <div className="h-px flex-1 bg-white/8" />
      </div>
    </section>
  );
}