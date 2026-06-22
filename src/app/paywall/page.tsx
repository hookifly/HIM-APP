"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { Lock } from "lucide-react";

import { useScanStore } from "@/stores/scanstore";

import { useAuth } from "@/context/auth-context";

import { useEffect, useState } from "react";

export default function PaywallPage() {
  const [loading, setLoading] =
  useState(false);

  const router = useRouter();

const { user } = useAuth();

const {
  images,
  imageUrls,
  analysis,
} = useScanStore();

  useEffect(() => {
  if (!analysis) {
    router.replace("/results");
  }
}, [analysis, router]);

if (!analysis) return null;

  async function handleUnlock() {
  try {
    setLoading(true);

    const response = await fetch(
      "/api/create-checkout",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          uid: user?.uid,
          email: user?.email,
        }),
      }
    );

    const data =
      await response.json();

    if (!response.ok) {
      throw new Error(
        "Failed to create checkout"
      );
    }

    window.location.href =
      data.checkoutUrl;
  } catch (error) {
    console.error(error);

    alert(
      "Unable to start payment."
    );
  } finally {
    setLoading(false);
  }
}

  const lockedItems = [
    "Masculinity Score",
    "Detailed Facial Analysis",
    "Beard Suitability Analysis",
    "Jawline Assessment",
    "Hairstyle Recommendations",
    "Skin Improvement Plan",
    "Top Glow-Up Priorities",
    "Personalized Action Plan",
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black px-4 py-8 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>

      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-20 left-1/2 h-[320px] w-[320px] -translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(136,8,8,0.18) 0%, transparent 70%)" }}
      />

      <div className="relative z-[2] mx-auto max-w-sm">

        {/* TITLE */}
        <div className="text-center">

          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#880808]/15 px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E8857F]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8857F]" style={{ fontFamily: "Inter, sans-serif" }}>
              Analysis Complete
            </span>
          </div>

          <h1 className="font-bold leading-[1.1]" style={{ fontSize: "38px" }}>
            Your Report Is Ready
          </h1>

          <p className="mt-3.5 text-sm leading-relaxed text-white/45" style={{ fontFamily: "Inter, sans-serif" }}>
            Unlock your complete facial report, masculinity score, and personalized glow-up roadmap.
          </p>

        </div>

        {/* FACE */}
        <div className="mt-9 flex justify-center">

          <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-[#880808]/30">

            <Image
              src={
                imageUrls[0] || images[0] || "/main.jpg"
              }
              alt="Face"
              fill
              className="object-cover"
            />

          </div>

        </div>

        {/* SCORE PREVIEW */}
        <div
  className="mt-7 rounded-3xl p-8"
  style={{ background: "linear-gradient(160deg, #0A2C47 0%, #050D14 100%)" }}>

  <div className="flex items-center justify-between">
    <div>
      <p
        className="text-[11px] uppercase tracking-[0.2em] text-white/35"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Current Score
      </p>
      <h2
        className="mt-3 font-bold"
        style={{ fontSize: "64px", lineHeight: "1" }}>
        {analysis.currentScore}
      </h2>
      <p
        className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-white/25"
        style={{ fontFamily: "Inter, sans-serif" }}>
        out of 100
      </p>
    </div>

    <div className="flex flex-col items-center gap-2">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-[#880808]/25 text-xl font-bold text-[#E8857F]">
        →
      </div>
      <span
        className="text-[10px] uppercase tracking-[0.1em] text-white/20"
        style={{ fontFamily: "Inter, sans-serif" }}>
        gap
      </span>
    </div>

    <div className="text-right">
      <p
        className="text-[11px] uppercase tracking-[0.2em] text-white/35"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Potential Score
      </p>
      <h2
        className="mt-3 font-bold text-[#5EE079]"
        style={{ fontSize: "64px", lineHeight: "1" }}>
        {analysis.potentialScore}
      </h2>
      <p
        className="mt-1.5 text-[11px] uppercase tracking-[0.1em] text-white/25"
        style={{ fontFamily: "Inter, sans-serif" }}>
        out of 100
      </p>
    </div>
  </div>

  {/* Progress bar showing gap */}
  <div className="mt-8">
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8">
      <div
        className="h-full rounded-full bg-[#880808]"
        style={{ width: `${analysis.currentScore}%` }}
      />
    </div>
    <div className="mt-2 flex items-center justify-between">
      <span
        className="text-[10px] uppercase tracking-[0.1em] text-white/25"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Current
      </span>
      <span
        className="text-[10px] uppercase tracking-[0.1em] text-[#5EE079]/60"
        style={{ fontFamily: "Inter, sans-serif" }}>
        +{analysis.potentialScore - analysis.currentScore} unlockable
      </span>
      <span
        className="text-[10px] uppercase tracking-[0.1em] text-white/25"
        style={{ fontFamily: "Inter, sans-serif" }}>
        Potential
      </span>
    </div>
  </div>

</div>

        {/* PRICE */}
        <div className="mt-9 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
            One-time payment
          </p>

          <h2 className="mt-2 font-bold" style={{ fontSize: "52px", lineHeight: "1" }}>
            $3.14
          </h2>

          <p className="mt-2.5 text-sm text-white/50" style={{ fontFamily: "Inter, sans-serif" }}>
            Get your masculinity score and your personalized masculinity improvement plan.
          </p>
        </div>

        {/* CTA */}
        <button
          onClick={handleUnlock}
          disabled={loading}
          className="mt-8 w-full rounded-2xl bg-[#880808] py-[18px] text-base font-semibold uppercase tracking-[0.06em] text-white transition-all active:scale-[0.98] disabled:opacity-60"
        >
          {
  loading
    ? "Loading..."
    : "Unlock Full Analysis"
}
        </button>

        <p className="mt-3.5 text-center text-[11px] uppercase tracking-[0.15em] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
          Secure checkout · Instant access
        </p>

        {/* LOCKED CONTENT */}
        <div className="mt-7 rounded-3xl border border-white/7 bg-white/[0.02] p-6">

          <div className="mb-5 flex items-center justify-between">

            <h2 className="text-lg font-semibold">
              Full Report Includes
            </h2>

            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#880808]/15">
              <Lock size={15} className="text-[#E8857F]" />
            </div>

          </div>

          <div className="flex flex-col gap-3">

            {lockedItems.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-white/5">
                  <Lock size={11} className="text-white/30" />
                </div>
                <span className="text-sm text-white/65" style={{ fontFamily: "Inter, sans-serif" }}>
                  {item}
                </span>
              </div>
            ))}

          </div>

        </div>

        {/* BACK */}
        <button
          onClick={() =>
  router.push("/results")
}
          className="mt-6 w-full text-center text-sm text-white/40"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          Back
        </button>

      </div>
    </main>
  );
}