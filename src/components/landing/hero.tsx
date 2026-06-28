import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section
      className="relative flex h-[100svh] max-h-[100svh] flex-col overflow-hidden bg-black px-6"
      style={{ fontFamily: "'Oswald', sans-serif", paddingTop: "env(safe-area-inset-top, 48px)" }}>

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-[250px] w-[250px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(136,8,8,0.18) 0%, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-[220px] w-[220px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(9,0,139,0.22) 0%, transparent 70%)" }}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between pt-10 pb-6">
        <div className="flex items-center gap-2">
          <div
            className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C23636]"
            style={{ animation: "pulse 2s ease-in-out infinite" }}
          />
          <span
            className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/45"
            style={{ fontFamily: "Inter, sans-serif" }}>
            Facial Masculinity Intelligence
          </span>
        </div>
        <Image
          src="/mmlogo.jpg"
          alt="Macho Meter AI"
          width={72}
          height={24}
          className="object-contain"
        />
      </div>

      {/* All content in one natural flow */}
      <div className="flex flex-1 flex-col justify-between pb-8">

        {/* Upper content */}
        <div className="flex flex-col gap-4">

          {/* Social proof */}
          <div className="flex items-center gap-2">
            <div className="flex -space-x-1.5">
              {["#880808", "#0A2C47", "#333333", "#09008B"].map((c, i) => (
                <div
                  key={i}
                  className="h-5 w-5 rounded-full border-[1.5px] border-black"
                  style={{ background: c, zIndex: 4 - i }}
                />
              ))}
            </div>
            <p className="text-[11px] text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
              <span className="font-semibold text-white/60">2,400+ guys</span> scanned their faces
            </p>
          </div>

          {/* Headline */}
          <div>
            <h1
              className="font-bold leading-[0.95] text-white"
              style={{ fontSize: "clamp(44px, 13vw, 52px)" }}>
              RATE<br />
              YOUR<br />
              <span className="text-[#C23636]">MASCULINITY</span>
            </h1>
            <p
              className="mt-2.5 max-w-[260px] text-[13px] leading-relaxed text-white/45"
              style={{ fontFamily: "Inter, sans-serif" }}>
              Your face has a masculinity score. Most guys never find out. Yours takes 30 seconds.
            </p>
          </div>

          {/* Sample result card */}
          <div
            className="w-full overflow-hidden rounded-2xl p-3.5"
            style={{ background: "linear-gradient(160deg, #0A2C47 0%, #080808 100%)", border: "1px solid rgba(255,255,255,0.07)" }}>

            <div className="mb-2.5 flex items-center justify-between">
              <p
                className="text-[9px] uppercase tracking-[0.18em] text-white/25"
                style={{ fontFamily: "Inter, sans-serif" }}>
                Sample result
              </p>
              <div className="flex items-center gap-1 rounded-full bg-[#5EE079]/10 px-2 py-0.5">
                <div className="h-1 w-1 rounded-full bg-[#5EE079]" />
                <span
                  className="text-[8px] font-semibold uppercase tracking-[0.1em] text-[#5EE079]"
                  style={{ fontFamily: "Inter, sans-serif" }}>
                  Real result
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Score rings */}
              <div className="flex gap-2.5">
                <div className="flex flex-col items-center">
                  <svg width="52" height="52" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                    <circle cx="26" cy="26" r="20" fill="none" stroke="#880808" strokeWidth="5"
                      strokeLinecap="round" strokeDasharray="125.7" strokeDashoffset="32.7"
                      transform="rotate(-90 26 26)" />
                    <text x="26" y="26" textAnchor="middle" dominantBaseline="central"
                      fill="#fff" fontSize="12" fontWeight="700" fontFamily="Oswald, sans-serif">74</text>
                  </svg>
                  <span className="mt-1 text-[8px] uppercase tracking-[0.08em] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>Now</span>
                </div>

                <div className="flex flex-col items-center">
                  <svg width="52" height="52" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="20" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="5" />
                    <circle cx="26" cy="26" r="20" fill="none" stroke="#5EE079" strokeWidth="5"
                      strokeLinecap="round" strokeDasharray="125.7" strokeDashoffset="18.9"
                      transform="rotate(-90 26 26)" />
                    <text x="26" y="26" textAnchor="middle" dominantBaseline="central"
                      fill="#fff" fontSize="12" fontWeight="700" fontFamily="Oswald, sans-serif">85</text>
                  </svg>
                  <span className="mt-1 text-[8px] uppercase tracking-[0.08em] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>Unlock</span>
                </div>
              </div>

              {/* Archetype */}
              <div className="flex-1">
                <div
                  className="rounded-lg px-2.5 py-2.5 text-center"
                  style={{ background: "linear-gradient(135deg, rgba(136,8,8,0.3) 0%, rgba(9,0,139,0.2) 100%)" }}>
                  <p className="text-[8px] uppercase tracking-[0.12em] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>Archetype</p>
                  <span className="text-[13px] font-bold tracking-[0.04em] text-[#E8857F]">DARK HUNTER</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA — pinned to bottom of flex container */}
        <div className="flex flex-col gap-2.5 pt-0 pb-14">
          <Link href="/signup" className="block">
            <button className="w-full rounded-2xl bg-[#880808] py-[17px] text-[14px] font-semibold uppercase tracking-[0.06em] text-white transition-all active:scale-[0.98]">
              Find My Ratings →
            </button>
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </section>
  );
}