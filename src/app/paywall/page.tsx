"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { Lock } from "lucide-react";

import { useScanStore } from "@/stores/scanstore";

import { useAuth } from "@/context/auth-context";

import { useState } from "react";

export default function PaywallPage() {
  const [loading, setLoading] =
  useState(false);

  const router = useRouter();

const { user } = useAuth();

const {
  images,
  imageUrls,
  analysis,
  setPurchased,
} = useScanStore();

  if (!analysis) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black text-white">

        <button
          onClick={() =>
            router.push("/upload")
          }
          className="rounded-full bg-red-600 px-8 py-4 text-2xl font-bold"
        >
          Start Scan
        </button>

      </main>
    );
  }

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

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-sm">

        {/* TITLE */}
        <div className="text-center">

          <h1 className="text-5xl font-bold">
            Analysis Ready
          </h1>

          <p className="mt-4 text-xl text-white/60">
            Unlock your complete
            facial report, masculinity
            analysis, and personalized
            glow-up roadmap.
          </p>

        </div>

        {/* FACE */}
        <div className="mt-12 flex justify-center">

          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/10">

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
        <div className="mt-8 rounded-[28px] bg-zinc-950 p-5">

          <p className="text-white/50">
            Current Score
          </p>

          <h2 className="mt-2 text-5xl font-bold">
            {analysis.currentScore}
          </h2>

          <p className="mt-5 text-white/50">
            Potential Score
          </p>

          <h2 className="mt-2 text-5xl font-bold text-green-400">
            {analysis.potentialScore}
          </h2>

        </div>

        {/* LOCKED CONTENT */}
        <div className="mt-10 rounded-[32px] bg-zinc-950 p-6">

          <div className="flex items-center justify-between">

            <h2 className="text-3xl font-bold">
              Full Report Includes
            </h2>

            <Lock className="text-red-500" />

          </div>

          <div className="mt-8 space-y-4">

            <p className="text-xl">
              🔒 Masculinity Score
            </p>

            <p className="text-xl">
              🔒 Beard Suitability Analysis
            </p>

            <p className="text-xl">
              🔒 Jawline Assessment
            </p>

            <p className="text-xl">
              🔒 Hairstyle Recommendations
            </p>

            <p className="text-xl">
              🔒 Skin Improvement Plan
            </p>

            <p className="text-xl">
              🔒 Top Glow-Up Priorities
            </p>

            <p className="text-xl">
              🔒 Personalized Action Plan
            </p>

            <p className="text-xl">
              🔒 AI Improvement Strategy
            </p>

          </div>

        </div>

        {/* PRICE */}
        <p className="text-lg text-white/50">
  One-time payment
</p>

<h2 className="mt-2 text-6xl font-bold">
  $3.14
</h2>

<p className="mt-3 text-white/40">
  Unlock complete masculinity analysis and your personalized improvement plan.
</p>

        {/* CTA */}
        <button
          onClick={handleUnlock}
          disabled={loading}
          className="mt-10 w-full rounded-full bg-red-600 py-5 text-3xl font-bold transition-all hover:bg-red-500"
        >
          {
  loading
    ? "Loading..."
    : "Unlock Full Analysis"
}
        </button>

        {/* BACK */}
        <button
          onClick={() =>
  router.push("/results")
}
          className="mt-6 w-full text-center text-xl text-white/40"
        >
          Back
        </button>

      </div>
    </main>
  );
}