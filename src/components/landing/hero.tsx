import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-black px-6 pb-10 pt-14">

      {/* Grid texture overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(166,8,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(166,8,0,0.04) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Scan line animation */}
      <div className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A60800] to-transparent opacity-50 animate-scan" />

      {/* Background watermark */}
      <div className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-black leading-none text-white/[0.025]"
        style={{ fontSize: "180px", letterSpacing: "-4px", fontFamily: "'Barlow Condensed', sans-serif" }}>
        HIM
      </div>

      {/* Left red border */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-[#A60800] to-transparent" />

      {/* Corner brackets */}
      <div className="absolute right-6 top-14 h-5 w-5 border-r border-t border-[#A60800]/50" />
      <div className="absolute bottom-20 left-6 h-5 w-5 border-b border-l border-[#A60800]/30" />

      {/* Top label */}
      <div className="flex items-center gap-3">
        <div className="h-px w-7 bg-[#A60800]" />
        <span
          className="text-[10px] font-black text-[#A60800]"
          style={{ letterSpacing: "0.38em" }}>
          FACIAL MASCULINITY INTELLIGENCE
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-7">

        {/* Headline */}
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.3em] text-white/30">
            Are you him?
          </p>
          <h1
            className="font-black text-white"
            style={{ fontSize: "82px", lineHeight: "0.86", letterSpacing: "-1px", fontFamily: "'Barlow Condensed', sans-serif" }}>
            KNOW<br />
            YOUR<br />
            <span className="text-[#A60800]">FACE.</span>
          </h1>
        </div>

        {/* Description */}
        <p className="max-w-[280px] text-sm leading-relaxed text-white/45">
          AI scans your face. Rates your structure. Reveals your archetype. Tells you exactly what to fix.
        </p>

        {/* Stats */}
        <div className="flex gap-7 border-l-2 border-[#A60800] pl-4">
          {[
            { val: "30", label: "Archetypes" },
            { val: "12+", label: "Traits" },
            { val: "30s", label: "Results" },
          ].map((s) => (
            <div key={s.label}>
              <div
                className="font-black text-white"
                style={{ fontSize: "26px", lineHeight: "1", fontFamily: "'Barlow Condensed', sans-serif" }}>
                {s.val}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-white/28">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Link href="/signup" className="block">
            <button
              className="w-full bg-[#A60800] py-[18px] text-sm font-black uppercase text-white transition-all active:scale-[0.98]"
              style={{
                letterSpacing: "0.28em",
                fontFamily: "'Barlow Condensed', sans-serif",
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}>
              Get My Rating →
            </button>
          </Link>
        </div>

        <p className="text-center text-[10px] uppercase tracking-[0.22em] text-white/20">
          Free · Private · 30 seconds
        </p>
      </div>
    </section>
  );
}