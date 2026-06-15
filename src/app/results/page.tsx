"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

import { useScanStore } from "@/stores/scanstore";
import { ScoreCard } from "@/components/results/scorecard";
import { MetricPill } from "@/components/results/metrics";

export default function ResultsPage() {
  const router = useRouter();

  const {
    images,
    imageUrls,
    analysis,
    hasPurchased,
  } = useScanStore();

  if (!analysis) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">
        <button
          onClick={() => router.push("/dashboard")}
          className="rounded-full bg-red-600 px-8 py-4 text-2xl font-bold"
        >
          Start New Scan
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-sm">

        {/* FACE */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 flex justify-center"
        >
          <div className="relative h-52 w-52">
            <CircularProgressbar
              value={analysis.currentScore}
              strokeWidth={5}
              styles={buildStyles({
                pathColor: "#dc2626",
                trailColor: "#18181b",
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
        </motion.div>

        {/* ARCHETYPE */}
        <div className="mt-10">
          <h2 className="text-4xl font-bold">
            Your Archetype
          </h2>

          <div className="mt-5 rounded-full border border-red-500 py-4 text-center">
            <span className="text-2xl font-semibold text-red-500">
              {analysis.archetype}
            </span>
          </div>
        </div>

        {/* METRICS */}
        <div className="mt-8 flex flex-wrap gap-3">
          <MetricPill
            label="Face Shape"
            value={analysis.faceShape}
          />

          <MetricPill
            label="Eye Area"
            value={analysis.eyeArea}
          />

          <MetricPill
            label="Symmetry"
            value={analysis.symmetry}
          />

          <MetricPill
            label="AI Confidence"
            value={`${analysis.confidenceScore}%`}
          />
        </div>

        {/* SCORES */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <ScoreCard
            title="Current Score"
            score={analysis.currentScore}
            color="#38f5b7"
          />

          <ScoreCard
            title="Potential Score"
            score={analysis.potentialScore}
            color="#6d4cff"
          />
        </div>

        {/* MASCULINITY SCORE */}
        <div className="mt-4 rounded-[24px] border border-red-500/20 bg-zinc-950 p-6">

          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">
              Masculinity Score
            </h3>

            {!hasPurchased && (
              <span className="text-red-500">
                🔒 Locked
              </span>
            )}
          </div>

          {hasPurchased ? (
            <div className="mt-5 text-center">
              <p className="text-6xl font-bold text-red-500">
                {analysis.masculinityScore}
              </p>

              <p className="mt-3 text-white/50">
                Masculinity Score
              </p>
            </div>
          ) : (
            <div className="mt-5 h-16 rounded-xl bg-zinc-900 blur-sm" />
          )}
        </div>

        {/* AI SUMMARY */}
        <div className="mt-8 rounded-[24px] bg-zinc-950 p-6">

          <h3 className="text-2xl font-bold">
            AI Summary
          </h3>

          <p className="mt-4 text-lg leading-relaxed text-white/70">
            {analysis.summary}
          </p>

        </div>

        {/* CTA */}
        <button
          onClick={() => {
            if (hasPurchased) {
              router.push("/recommendations");
            } else {
              router.push("/paywall");
            }
          }}
          className="mt-10 w-full rounded-full bg-blue-700 py-5 text-3xl font-bold"
        >
          {hasPurchased
            ? "View Your Glow-Up Plan"
            : "Unlock Full Analysis"}
        </button>

      </div>
    </main>
  );
}