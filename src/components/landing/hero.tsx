import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-black px-6 pb-9 pt-12"
      style={{ fontFamily: "'Oswald', sans-serif" }}>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-[260px] w-[260px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(9,0,139,0.25) 0%, transparent 70%)" }}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#C23636]" />
          <span
            className="text-[11px] font-semibold uppercase tracking-[0.25em] text-white/50"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Facial Masculinity Intelligence
          </span>
        </div>
        <Image
          src="/mmlogo.jpg"
          alt="Macho Meter AI"
          width={80}
          height={28}
          className="object-contain"
        />
      </div>

      {/* Main content */}
      <div className="flex flex-col gap-5">

        <h1 className="font-bold leading-[1.05] text-white" style={{ fontSize: "54px" }}>
          CHECK<br />
          YOUR<br />
          <span className="text-[#C23636]">MASCULINITY.</span>
        </h1>

        {/* Sample result preview card — shows users what they get */}
        <div
          className="w-full overflow-hidden rounded-2xl border border-white/1 p-4"
          style={{ background: "linear-gradient(160deg, #0A2C47 0%, #050D14 100%)" }}>

          <p className="mb-3 text-[10px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
            Sample result preview
          </p>

          <div className="flex items-center gap-4">
            {/* Mini score rings */}
            <div className="flex gap-3">
              {/* Current */}
              <div className="flex flex-col items-center">
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#880808" strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="138.2"
                    strokeDashoffset="35.9"
                    transform="rotate(-90 28 28)" />
                  <text x="28" y="28" textAnchor="middle" dominantBaseline="central"
                    fill="#fff" fontSize="13" fontWeight="700" fontFamily="Oswald, sans-serif">74</text>
                </svg>
                <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>Current</span>
              </div>

              {/* Potential */}
              <div className="flex flex-col items-center">
                <svg width="56" height="56" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="22" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                  <circle cx="28" cy="28" r="22" fill="none" stroke="#7C9FC9" strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray="138.2"
                    strokeDashoffset="20.7"
                    transform="rotate(-90 28 28)" />
                  <text x="28" y="28" textAnchor="middle" dominantBaseline="central"
                    fill="#fff" fontSize="13" fontWeight="700" fontFamily="Oswald, sans-serif">85</text>
                </svg>
                <span className="mt-1 text-[9px] uppercase tracking-[0.1em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>Potential</span>
              </div>
            </div>

            {/* Archetype + metrics */}
            <div className="flex-1">
              <div
                className="mb-2 rounded-xl px-3 py-2 text-center"
                style={{ background: "rgba(136,8,8,0.2)" }}>
                <span className="text-sm font-bold tracking-[0.06em] text-[#E8857F]">DARK HUNTER</span>
              </div>
              
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-2.5">
          <Link href="/signup" className="block">
            <button className="w-full rounded-2xl bg-[#880808] py-[19px] text-[15px] font-semibold uppercase tracking-[0.06em] text-white transition-all active:scale-[0.98]">
              Get My Masculinity Rating
            </button>
          </Link>


        </div>

        <p className="max-w-[280px] text-[15px] leading-relaxed text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
          AI scans your face. Rates your masculine structure. Reveals your archetype. Tells you exactly what to fix to become more masculine.
        </p>

      </div>
    </section>
  );
}