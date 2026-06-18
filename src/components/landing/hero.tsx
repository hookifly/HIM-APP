import Link from "next/link";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-9 pt-12"
      style={{ fontFamily: "'Oswald', sans-serif", background: "radial-gradient(circle at 30% 0%, #0A2C47 0%, #000 55%)" }}>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-[260px] w-[260px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(9,0,139,0.25) 0%, transparent 70%)" }}
      />

      {/* Scan badge */}
      <div className="absolute right-6 top-12 flex h-[46px] w-[46px] items-center justify-center rounded-full bg-[#09008B]/30">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C9FC9" strokeWidth="1.8">
          <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </div>

      {/* Top label */}
      <div className="flex items-center gap-2.5">
        
        <div className="h-2 w-2 rounded-full bg-[#C23636]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
          Facial Masculinity Intelligence
        </span>
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#880808]/15 px-3.5 py-[7px]">
          <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#E8857F]" style={{ fontFamily: "Inter, sans-serif" }}>
            Macho Meter AI
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-6">

        <h1 className="font-bold leading-[1.05] text-white" style={{ fontSize: "64px" }}>
          KNOW<br />
          YOUR<br />
          <span className="text-[#C23636]">FACE.</span>
        </h1>

        <p className="max-w-[280px] text-[15px] leading-relaxed text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
          AI scans your face. Rates your masculine structure. Reveals your archetype. Tells you exactly what to fix to become more masculine.
        </p>

        <div className="flex flex-col gap-3">
          <Link href="/signup" className="block">
            <button className="w-full rounded-2xl bg-[#880808] py-[19px] text-[15px] font-semibold uppercase tracking-[0.06em] text-white transition-all active:scale-[0.98]">
              Get My Rating →
            </button>
          </Link>
        </div>

        <p className="text-center text-[11px] uppercase tracking-[0.15em] text-white/28" style={{ fontFamily: "Inter, sans-serif" }}>
          Free · Private · 30 seconds
        </p>
      </div>
    </section>
  );
}