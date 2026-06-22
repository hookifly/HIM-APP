import Link from "next/link";

const archetypes = [
  "Dark Masculine", "Wolf Energy", "Golden Ratio",
  "Athletic Aura", "Pretty Boy", "Street King",
  "Rugged Alpha", "Classic Gentleman",
];

export function CTA() {
  return (
    <section className="bg-black pb-16 pt-2" style={{ fontFamily: "'Oswald', sans-serif" }}>

      {/* Scrolling archetype ticker */}
      <div className="mb-8 overflow-hidden">
        <p className="mb-3.5 px-[22px] text-[11px] font-semibold uppercase tracking-[0.25em] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
          Your archetype is one of these & more:
        </p>
        <div className="relative w-full overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-black to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-black to-transparent" />

          <div className="flex w-max animate-ticker gap-2.5 px-[22px]">
            {[...archetypes, ...archetypes].map((a, i) => (
              <span
                key={`${a}-${i}`}
                className="flex-shrink-0 whitespace-nowrap rounded-full bg-[#0A2C47] px-4 py-[9px] text-xs font-medium text-white/60"
                style={{ fontFamily: "Inter, sans-serif" }}>
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main CTA card */}
      <div
        className="relative mx-[22px] overflow-hidden rounded-3xl px-7 py-8"
        style={{ background: "linear-gradient(160deg, #1A0606 0%, #0D0303 60%, #000 100%)" }}>

        <div className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#09008B]/25">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C9FC9" strokeWidth="1.8">
            <circle cx="12" cy="12" r="9" />
            <circle cx="12" cy="12" r="4" />
            <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
          </svg>
        </div>

        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[#C23636]" style={{ fontFamily: "Inter, sans-serif" }}>
          Free to start
        </p>

        <h2 className="mb-4 max-w-[240px] font-bold leading-[1.05] text-white" style={{ fontSize: "42px" }}>
          WHAT'S<br />
          YOUR<br />
          <span className="text-[#C23636]">MASCULINTY SCORE?</span>
        </h2>

        <p className="mb-7 max-w-[270px] text-sm leading-relaxed text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
          Stop guessing. Get your rating, archetype, and exact blueprint to become masculine.
        </p>

        <Link href="/signup" className="block">
          <button className="w-full rounded-2xl bg-[#880808] py-[18px] text-[15px] font-semibold uppercase tracking-[0.08em] text-white transition-all active:scale-[0.98] hover:brightness-110">
            Scan My Face →
          </button>
        </Link>

        {/* Stats */}
        <div className="mt-6 flex justify-center gap-9">
          {[
            { val: "30s", label: "Fast" },
            { val: "100%", label: "Private" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-semibold text-white" style={{ fontSize: "24px" }}>{s.val}</div>
              <div className="mt-1.5 text-[10px] uppercase tracking-[0.15em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* Footer links */}
        <div className="mt-8 border-t border-white/7 pt-5 text-center">
          <Link href="/privacy" className="text-xs text-white/35 no-underline" style={{ fontFamily: "Inter, sans-serif" }}>
            Privacy Policy
          </Link>
          <span className="mx-3.5 text-white/15">/</span>
          <Link href="/terms" className="text-xs text-white/35 no-underline" style={{ fontFamily: "Inter, sans-serif" }}>
            Terms &amp; Conditions
          </Link>
        </div>
      </div>
    </section>
  );
}