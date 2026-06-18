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
              <h3 className="mb-1.5 font-semibold leading-tight text-white" style={{ fontSize: "19px" }}>
                {step.title}
              </h3>
              <p className="text-[13.5px] leading-relaxed text-white/45" style={{ fontFamily: "Inter, sans-serif" }}>
                {step.description}
              </p>

              {/* Dashboard preview slot — only on step 03 */}
              {step.number === "03" && (
                <div className="mt-4 rounded-[18px] border-[1.5px] border-dashed border-[#7C9FC9]/30 bg-[#0A2C47]/[0.15] px-4 py-7 text-center">
                  {/*
                    Replace this placeholder block with your real dashboard screenshot, e.g.:
                    <Image src="/dashboard-preview.png" alt="Macho Meter AI dashboard preview" width={320} height={400} className="w-full rounded-xl" />
                  */}
                  <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-[#0A2C47]/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C9FC9" strokeWidth="1.8">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                  <p className="mb-1 text-[13px] font-medium text-[#7C9FC9]/85" style={{ fontFamily: "Inter, sans-serif" }}>
                    Dashboard preview goes here
                  </p>
                  <p className="text-[11px] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
                    Replace with real product screenshot
                  </p>
                </div>
              )}
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