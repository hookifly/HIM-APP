import Link from "next/link";

const archetypes = [
  "Dark Masculine", "Wolf Energy", "Golden Ratio",
  "Athletic Aura", "Pretty Boy", "Street King",
  "Rugged Alpha", "Classic Gentleman",
];

export function CTA() {
  return (
    <section className="bg-black px-6 pb-24 pt-4">

      {/* Scrolling archetype ticker */}
      <div className="mb-12 overflow-hidden">
        <p className="mb-3 text-xs font-black uppercase tracking-[0.3em] text-white/20">
          Your archetype is one of:
        </p>
        <div className="flex flex-wrap gap-2">
          {archetypes.map((a) => (
            <span
              key={a}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/40"
            >
              {a}
            </span>
          ))}
        </div>
      </div>

      {/* Main CTA card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#A60800]/10 p-8">

        {/* Background texture */}
        <div className="pointer-events-none absolute inset-0 opacity-5"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, #A60800 0, #A60800 1px, transparent 0, transparent 50%)",
            backgroundSize: "12px 12px",
          }}
        />

        {/* Corner accent */}
        <div className="absolute right-0 top-0 h-16 w-16 border-r-2 border-t-2 border-[#A60800]/40" />
        <div className="absolute bottom-0 left-0 h-16 w-16 border-b-2 border-l-2 border-[#A60800]/40" />

        <div className="relative">
          <p className="mb-2 text-xs font-black uppercase tracking-[0.4em] text-[#A60800]">
            Free to start
          </p>

          <h2 className="mb-3 text-5xl font-black leading-[0.9] text-white">
            WHAT'S<br />
            YOUR<br />
            <span className="text-[#A60800]">NUMBER?</span>
          </h2>

          <p className="mb-8 text-sm leading-relaxed text-white/50">
            Stop guessing. Get your rating, archetype, and exact blueprint to become masculine.
          </p>

          <Link href="/signup" className="block">
            <button className="w-full rounded-xl bg-[#A60800] py-5 text-base font-black uppercase tracking-[0.25em] text-white transition-all active:scale-[0.98] hover:brightness-110">
              Scan My Face →
            </button>
          </Link>

          <div className="mt-6 flex justify-center gap-8">
            {[
              { val: "30s", label: "Fast" },
              { val: "100%", label: "Private" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-lg font-black text-white">{s.val}</div>
                <div className="text-[10px] uppercase tracking-widest text-white/30">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}