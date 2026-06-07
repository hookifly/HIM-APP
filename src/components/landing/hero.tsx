import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-black px-6 pb-12 pt-16">

      {/* Background number watermark */}
      <div className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-[220px] font-black leading-none text-white/[0.03]">
        HIM
      </div>

      {/* Red left border accent */}
      <div className="absolute left-0 top-0 h-full w-[3px] bg-gradient-to-b from-transparent via-[#A60800] to-transparent" />

      {/* Top label */}
      <div className="flex items-center gap-3">
        <div className="h-px w-8 bg-[#A60800]" />
        <span className="text-xs font-black tracking-[0.4em] text-[#A60800]">
          FACIAL MASCULINITY INTELLIGENCE
        </span>
      </div>

      {/* Main hero content */}
      <div className="flex flex-col gap-8">

        {/* Big headline */}
        <div>
          <p className="mb-2 text-sm font-bold tracking-[0.3em] text-white/30 uppercase">
            Are you him?
          </p>
          <h1 className="text-[72px] font-black leading-[0.88] tracking-tight text-white">
            KNOW<br />
            YOUR<br />
            <span className="text-[#A60800]">FACE.</span>
          </h1>
        </div>

        {/* Description */}
        <p className="max-w-xs text-base leading-relaxed text-white/50">
          AI scans your face. Rates your structure. Reveals your archetype. Tells you exactly what to fix.
        </p>

        {/* Stats row */}
        <div className="flex gap-8 border-l-2 border-[#A60800] pl-4">
          {[
            { val: "30", label: "Archetypes" },
            { val: "12+", label: "Traits" },
            { val: "30s", label: "Results" },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-2xl font-black text-white">{s.val}</div>
              <div className="text-[10px] uppercase tracking-widest text-white/30">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link href="/signup" className="block">
            <button className="w-full rounded-xl bg-[#A60800] py-5 text-base font-black uppercase tracking-[0.25em] text-white transition-all active:scale-[0.98]">
              Get My Rating →
            </button>
          </Link>
        </div>

        <p className="text-center text-xs tracking-widest text-white/20 uppercase">
          Free · Private · 30 seconds
        </p>
      </div>
    </section>
  );
}