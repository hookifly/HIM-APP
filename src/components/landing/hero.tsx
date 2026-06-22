import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen flex-col bg-black pb-16 pt-2 justify-between overflow-hidden px-6 pb-9 pt-12"
      style={{ fontFamily: "'Oswald', sans-serif"}}>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-20 -left-16 h-[260px] w-[260px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(9,0,139,0.25) 0%, transparent 70%)" }}
      />

      

      {/* Top label */}
      {/* Top label */}
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