import Link from "next/link";

const archetypes = [
  "Dark Masculine", "Wolf Energy", "Golden Ratio",
  "Athletic Aura", "Pretty Boy", "Street King",
  "Rugged Alpha", "Classic Gentleman",
];

export function CTA() {
  return (
    <section className="bg-black pb-20 pt-4">

      {/* Scrolling archetype ticker */}
      <div className="mb-9 overflow-hidden">
        <p className="mb-3.5 px-6 text-[11px] font-black uppercase tracking-[0.3em] text-white/20">
          Your archetype is one of:
        </p>
        <div className="relative w-full overflow-hidden">
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-black to-transparent" />

          <div className="flex w-max animate-ticker gap-2.5 px-6">
            {[...archetypes, ...archetypes].map((a, i) => (
              <span
                key={`${a}-${i}`}
                className="flex-shrink-0 whitespace-nowrap border border-[#A60800]/25 bg-[#A60800]/[0.06] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.15em] text-white/50"
                style={{ clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)" }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main CTA card */}
      <div className="relative mx-6 overflow-hidden border border-[#A60800]/15 bg-[#A60800]/[0.06] p-8"
        style={{ clipPath: "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 100%)" }}>

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(166,8,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(166,8,0,0.05) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Scan line */}
        <div className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A60800] to-transparent opacity-40 animate-cta-scan" />

        {/* Corner accents */}
        <div className="absolute right-0 top-0 h-[60px] w-[60px] border-r-2 border-t-2 border-[#A60800]/40" />
        <div className="absolute bottom-0 left-0 h-[60px] w-[60px] border-b-2 border-l-2 border-[#A60800]/40" />

        <div className="relative z-[2]">
          <p className="mb-2.5 text-[11px] font-black uppercase tracking-[0.4em] text-[#A60800]">
            Free to start
          </p>

          <h2
            className="mb-3.5 font-black leading-[0.9] text-white"
            style={{ fontSize: "48px", letterSpacing: "-0.5px", fontFamily: "'Barlow Condensed', sans-serif" }}>
            WHAT'S<br />
            YOUR<br />
            <span className="text-[#A60800]">NUMBER?</span>
          </h2>

          <p className="mb-7 max-w-[280px] text-sm leading-relaxed text-white/50">
            Stop guessing. Get your rating, archetype, and exact blueprint to become masculine.
          </p>

          <Link href="/signup" className="block">
            <button
              className="w-full bg-[#A60800] py-[18px] text-sm font-black uppercase text-white transition-all active:scale-[0.98] hover:brightness-110"
              style={{
                letterSpacing: "0.28em",
                fontFamily: "'Barlow Condensed', sans-serif",
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}>
              Scan My Face →
            </button>
          </Link>

          {/* Stats */}
          <div className="mt-6 flex justify-center gap-9">
            {[
              { val: "30s", label: "Fast" },
              { val: "100%", label: "Private" },
            ].map((s) => (
              <div key={s.label} className="border-t-2 border-[#A60800] pt-2 text-center">
                <div
                  className="font-black text-white"
                  style={{ fontSize: "22px", lineHeight: "1", fontFamily: "'Barlow Condensed', sans-serif" }}>
                  {s.val}
                </div>
                <div className="mt-1 text-[9px] uppercase tracking-[0.2em] text-white/30">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Footer links */}
          <div className="mt-9 border-t border-white/6 pt-5 text-center">
            <Link href="/privacy" className="text-[11px] uppercase tracking-[0.1em] text-white/35 no-underline">
              Privacy Policy
            </Link>
            <span className="mx-3.5 text-white/15">/</span>
            <Link href="/terms" className="text-[11px] uppercase tracking-[0.1em] text-white/35 no-underline">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}