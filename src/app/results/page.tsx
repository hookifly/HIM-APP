"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { useScanStore } from "@/stores/scanstore";
import { useAuth } from "@/context/auth-context";
import { ArrowLeft } from "lucide-react";

export default function ResultsPage() {
  const router = useRouter();

  const {
    images,
    imageUrls,
    analysis,
    hasPurchased,
  } = useScanStore();

  const {
  isAdmin,
} = useAuth();

const isPremium =
  hasPurchased || isAdmin;

  // Animated ring fill-in on first mount — presentation only, doesn't touch analysis data
  const [animatedFace, setAnimatedFace] = useState(0);
  const [animatedCurrent, setAnimatedCurrent] = useState(0);
  const [animatedPotential, setAnimatedPotential] = useState(0);
  const [animatedMasculinity, setAnimatedMasculinity] = useState(0);

  useEffect(() => {
    if (!analysis) return;

    const targets = {
      face: analysis.currentScore || 0,
      current: analysis.currentScore || 0,
      potential: analysis.potentialScore || 0,
      masculinity: isPremium ? (analysis.masculinityScore || 0) : 0,
    };

    const duration = 1400;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedFace(targets.face * eased);
      setAnimatedCurrent(targets.current * eased);
      setAnimatedPotential(targets.potential * eased);
      setAnimatedMasculinity(targets.masculinity * eased);

      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }, [analysis, isPremium]);

  useEffect(() => {
  if (!analysis) {
    router.replace("/dashboard");
  }
}, [analysis, router]);

if (!analysis) return null;

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
      <div className="mx-auto max-w-sm">

        {/* HEADER */}
<div className="mb-3 flex items-center gap-3">

  <button
    onClick={() =>
      router.push("/dashboard?tab=insights")
    }
    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border border-white/8 bg-white/[0.03"
  >
    <ArrowLeft size={18} />
  </button>

  <h1
    className="flex-1 text-center font-semibold uppercase tracking-[0.08em]"
    style={{ fontSize: "22px" }}
  >
    Results
  </h1>

  <div className="h-11 w-11 flex-shrink-0" />

</div>

        {/* FACE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 flex flex-col items-center"
        >
          <div className="relative h-52 w-52">
            <CircularProgressbar
              value={animatedFace}
              strokeWidth={5}
              styles={buildStyles({
                pathColor: "#880808",
                trailColor: "#0A2C47",
                pathTransitionDuration: 0,
              })}
            />

            <div className="absolute inset-4 overflow-hidden rounded-full border border-white/10">
              <Image
                src={imageUrls[0] || images[0] || "/main.jpg"}
                alt="Face"
                fill
                className="object-cover"
              />
            </div>
          </div>

          <div className="mt-4 flex items-end gap-1">
            <span className="font-bold leading-none" style={{ fontSize: "32px" }}>
              {Math.round(animatedFace)}
            </span>
            <span className="pb-1 text-base font-medium text-white/30">/ 100</span>
          </div>
        </motion.div>

        {/* ARCHETYPE */}
        <div className="mt-9">
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
            Your Archetype
          </p>

          <div
            className="rounded-2xl py-4 text-center"
            style={{ background: "linear-gradient(135deg, rgba(136,8,8,0.18) 0%, rgba(9,0,139,0.12) 100%)" }}>
            <span className="text-xl font-semibold uppercase tracking-[0.04em] text-[#E8857F]">
              {analysis.archetype}
            </span>
          </div>
        </div>

        {/* SCORES */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="flex flex-col items-center rounded-2xl border border-white/7 py-5">
            <div className="relative h-[110px] w-[110px]">
              <CircularProgressbar
                value={animatedCurrent}
                strokeWidth={9}
                styles={buildStyles({
                  pathColor: "#880808",
                  trailColor: "rgba(255,255,255,0.06)",
                  pathTransitionDuration: 0,
                })}
              />
              <div className="absolute inset-0 flex items-center justify-center font-bold" style={{ fontSize: "24px" }}>
                {Math.round(animatedCurrent)}
              </div>
            </div>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
              Current Score
            </p>
          </div>

          <div className="flex flex-col items-center rounded-2xl border border-white/7 py-5">
            <div className="relative h-[110px] w-[110px]">
              <CircularProgressbar
                value={animatedPotential}
                strokeWidth={9}
                styles={buildStyles({
                  pathColor: "#7C9FC9",
                  trailColor: "rgba(255,255,255,0.06)",
                  pathTransitionDuration: 0,
                })}
              />
              <div className="absolute inset-0 flex items-center justify-center font-bold" style={{ fontSize: "24px" }}>
                {Math.round(animatedPotential)}
              </div>
            </div>
            <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
              Potential Score
            </p>
          </div>
        </div>

        {/* MASCULINITY SCORE */}
        <div
           onClick={() => {
              if (!isPremium) {
               router.push("/paywall");
               }
              }}

          className="relative mt-6 overflow-hidden rounded-3xl p-6"
          style={{
            background: isPremium
              ? "linear-gradient(160deg, #1A0606 0%, #050D14 80%)"
              : "rgba(255,255,255,0.02)",
            border: isPremium ? "1px solid rgba(136,8,8,0.25)" : "1px solid rgba(255,255,255,0.06)",
          }}>

          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-xl font-semibold">
              Masculinity Score
            </h3>

            {!isPremium && (
              <span
    onClick={() => router.push("/paywall")}
    className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-white/30"
    style={{ fontFamily: "Inter, sans-serif" }}
  >
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
    Locked
  </span>
            )}
          </div>
          

          <div className="flex flex-col items-center">
            <div className="relative h-[150px] w-[150px]">
              <CircularProgressbar
                value={animatedMasculinity}
                strokeWidth={8}
                styles={buildStyles({
                  pathColor: isPremium ? "#E8857F" : "rgba(255,255,255,0.1)",
                  trailColor: "rgba(255,255,255,0.06)",
                  pathTransitionDuration: 0,
                })}
              />

              {isPremium ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-bold text-[#E8857F]" style={{ fontSize: "36px", lineHeight: "1" }}>
                    {Math.round(animatedMasculinity)}
                  </span>
                  <span className="mt-0.5 text-xs font-medium text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
                    / 100
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.6">
                    <rect x="3" y="11" width="18" height="11" rx="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                </div>
              )}
            </div>

            <p className="mt-4 text-[13px] font-bold uppercase tracking-[0.2em] text-white/75" style={{ fontFamily: "Inter, sans-serif" }}>
              {isPremium ? "Masculinity Score" : "Tap to reveal"}
            </p>
          </div>
        </div>

        {/* AI SUMMARY */}
        <div className="mt-6 rounded-3xl border border-white/6 p-6">

          <h3 className="mb-3 text-xl font-semibold">
            AI Summary
          </h3>

          <p className="text-sm leading-relaxed text-white/55" style={{ fontFamily: "Inter, sans-serif" }}>
            {analysis.summary}
          </p>

        </div>

        {/* CTA */}
        <button
          onClick={() => {
            if (isPremium) {
              router.push("/recommendations");
            } else {
              router.push("/paywall");
            }
          }}
          className="mt-8 w-full rounded-2xl bg-[#880808] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white"
        >
          {isPremium
            ? "View Your Glow-Up Plan"
            : "Unlock Full Analysis"}
        </button>

      </div>
    </main>
  );
}