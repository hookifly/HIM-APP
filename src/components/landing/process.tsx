const steps = [
  {
    number: "01",
    title: "Upload 3 Photos",
    sub: "Front. Left. Right.",
    description: "Natural light. No filters. No sunglasses. Raw.",
  },
  {
    number: "02",
    title: "AI Scans Your Face",
    sub: "12+ traits analyzed.",
    description: "Jawline. Eyes. Symmetry. Bone structure. Skin. All of it.",
  },
  {
    number: "03",
    title: "Get Your Rating",
    sub: "5.0 — 8.5 scale.",
    description: "Current rating, presence score, potential bonus, and your archetype unlocked.",
  },
  {
    number: "04",
    title: "Become Him",
    sub: "Your blueprint.",
    description: "Exact grooming, fitness, and style moves to maximize your rating.",
  },
];

export function Process() {
  return (
    <section className="bg-black px-6 py-20">

      {/* Section header */}
      <div className="mb-14">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-8 bg-[#A60800]" />
          <span className="text-xs font-black tracking-[0.4em] text-[#A60800] uppercase">
            The Process
          </span>
        </div>
        <h2 className="text-5xl font-black leading-[0.9] text-white">
          HOW IT<br />
          <span className="text-[#A60800]">WORKS.</span>
        </h2>
      </div>

      {/* Steps */}
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div key={step.number} className="relative">
            {/* Connector line */}
            {i < steps.length - 1 && (
              <div className="absolute left-[19px] top-[52px] h-full w-px bg-white/8" />
            )}

            <div className="flex gap-5 pb-10">
              {/* Number circle */}
              <div className="relative flex-shrink-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[#A60800]/40 bg-[#A60800]/10">
                  <span className="text-xs font-black text-[#A60800]">{step.number}</span>
                </div>
              </div>

              {/* Content */}
              <div className="pt-1">
                <div className="flex items-baseline gap-3">
                  <h3 className="text-xl font-black text-white">{step.title}</h3>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#A60800]">{step.sub}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-white/40">{step.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom divider */}
      <div className="mt-4 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/8" />
        <span className="text-xs uppercase tracking-widest text-white/20">End to end</span>
        <div className="h-px flex-1 bg-white/8" />
      </div>
    </section>
  );
}