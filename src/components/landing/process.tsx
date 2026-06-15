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
    <section className="bg-black px-6 py-[72px]">

      {/* Section header */}
      <div className="mb-12">
        <div className="mb-3 flex items-center gap-3">
          <div className="h-px w-7 bg-[#A60800]" />
          <span className="text-[10px] font-black uppercase tracking-[0.38em] text-[#A60800]">
            The Process
          </span>
        </div>
        <h2
          className="font-black text-white"
          style={{ fontSize: "54px", lineHeight: "0.88", letterSpacing: "-0.5px", fontFamily: "'Barlow Condensed', sans-serif" }}>
          HOW IT<br />
          <span className="text-[#A60800]">WORKS.</span>
        </h2>
      </div>

      {/* Steps */}
      <div className="flex flex-col">
        {steps.map((step, i) => (
          <div key={step.number} className="relative flex gap-5">

            {/* Left: number + connector */}
            <div className="flex flex-shrink-0 flex-col items-center">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-[#A60800]/40 bg-[#A60800]/8">
                <span
                  className="text-[11px] font-black text-[#A60800]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em" }}>
                  {step.number}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className="w-px flex-1 bg-white/7 min-h-6" />
              )}
            </div>

            {/* Content */}
            <div className="pb-8 pt-1.5 flex-1">
              <div className="mb-1.5 flex flex-wrap items-baseline gap-2">
                <h3
                  className="font-black text-white"
                  style={{ fontSize: "22px", lineHeight: "1", fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {step.title}
                </h3>
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-[#A60800]">
                  {step.sub}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-white/38">{step.description}</p>

              {/* Results preview card — only on step 03 */}
              {step.number === "03" && (
                <div
                  className="relative mt-4 overflow-hidden border border-[#A60800]/20 bg-[#0D0D0D] p-5"
                  style={{ borderTop: "1px solid #A60800" }}>

                  <p className="mb-4 text-[9px] uppercase tracking-[0.3em] text-white/25"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                    Sample Result Preview
                  </p>

                  {/* Score */}
                  <div className="mb-3 flex items-end gap-1.5">
                    <span
                      className="font-black text-white"
                      style={{ fontSize: "56px", lineHeight: "1", fontFamily: "'Barlow Condensed', sans-serif" }}>
                      7.4
                    </span>
                    <span
                      className="pb-1.5 font-bold text-white/25"
                      style={{ fontSize: "20px", fontFamily: "'Barlow Condensed', sans-serif" }}>
                      / 10
                    </span>
                    <span
                      className="ml-2 pb-2 text-[10px] font-black uppercase leading-tight tracking-[0.18em] text-[#A60800]"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Masculinity<br />Score
                    </span>
                  </div>

                  {/* Bar */}
                  <div className="relative mb-4 h-[3px] bg-white/7">
                    <div className="h-full w-[74%] bg-[#A60800]" />
                    <div className="absolute -top-[3px] left-[88%] h-[9px] w-[2px] bg-white/30" />
                  </div>

                  {/* Metrics grid */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {[
                      { val: "8.8", key: "Potential Score" },
                      { val: "+1.4", key: "Unlockable Gap" },
                      { val: "82%", key: "Symmetry" },
                      { val: "Strong", key: "Jaw Structure" },
                    ].map((m) => (
                      <div
                        key={m.key}
                        className="border-l-2 border-[#A60800]/35 bg-white/[0.03] px-3 py-2.5">
                        <div
                          className="font-black text-white"
                          style={{ fontSize: "20px", lineHeight: "1", fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {m.val}
                        </div>
                        <div className="mt-0.5 text-[9px] uppercase tracking-[0.15em] text-white/30"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                          {m.key}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Archetype row */}
                  <div className="mt-3 flex items-center justify-between border-t border-white/5 pt-3">
                    <div>
                      <div className="text-[9px] uppercase tracking-[0.2em] text-white/25"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Your Archetype
                      </div>
                      <div
                        className="font-black text-[#A60800]"
                        style={{ fontSize: "16px", letterSpacing: "0.08em", fontFamily: "'Barlow Condensed', sans-serif" }}>
                        DARK HUNTER
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/>
                      </svg>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-white/20"
                        style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Full report locked
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="mt-10 flex items-center gap-4">
        <div className="h-px flex-1 bg-white/6" />
        <span className="text-[9px] uppercase tracking-[0.25em] text-white/18"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
          End to end
        </span>
        <div className="h-px flex-1 bg-white/6" />
      </div>
    </section>
  );
}