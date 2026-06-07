"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth-context";

import { useScanStore } from "@/stores/scanstore";

import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();

  const { user, loading } =
    useAuth();

  const { analysis } =
    useScanStore();

  const [activeTab, setActiveTab] =
    useState("scan");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [
    user,
    loading,
    router,
  ]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-sm">

        {/* TABS */}
        <div className="flex rounded-full bg-zinc-900 p-1">

          <button
            onClick={() =>
              setActiveTab("scan")
            }
            className={`flex-1 rounded-full py-4 text-2xl font-bold transition-all ${
              activeTab === "scan"
                ? "bg-[#A60800] text-white"
                : "text-white/70"
            }`}
          >
            Scan
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "insights"
              )
            }
            className={`flex-1 rounded-full py-4 text-2xl font-bold transition-all ${
              activeTab ===
              "insights"
                ? "bg-[#090040] text-white"
                : "text-white/70"
            }`}
          >
            Insights
          </button>

        </div>

        {/* SCAN TAB */}
        {activeTab === "scan" ? (
          <div className="mt-6 overflow-hidden rounded-[32px] border border-red-900 bg-zinc-950">

            <div className="relative h-[560px] w-full">

              <Image
                src="/main.jpg"
                alt="Model"
                fill
                className="object-cover object-top"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-0 right-0 px-5 text-center">

                {analysis ? (
                  <>
                    <h2 className="text-4xl italic leading-tight text-white">
                      Face Already
                      Analyzed
                    </h2>

                    <p className="mt-4 text-lg text-white/60">
                      Follow your
                      personalized
                      improvement plan
                      and track your
                      progress.
                    </p>

                    <button
                      onClick={() =>
                        router.push(
                          "/results"
                        )
                      }
                      className="mt-8 w-full rounded-xl bg-[#A60800] py-5 text-xl font-black uppercase tracking-widest"
                    >
                      View Insights
                    </button>
                  </>
                ) : (
                  <>
                    <h2 className="text-4xl italic leading-tight text-white">
                      Get Ratings and
                      Recommendations
                      To Become Him
                    </h2>

                    <button
                      onClick={() => {
  if (analysis) {
    setActiveTab("insights");
  } else {
    router.push("/instructions");
  }
}}
                      className="mt-8 w-full rounded-xl bg-[#A60800] py-5 text-xl font-black uppercase tracking-widest"
                    >
                      {
  analysis
    ? "View Report"
    : "Begin Scan"
}
                    </button>
                  </>
                )}

              </div>

            </div>

          </div>
        ) : (
          <div className="mt-6 flex h-[640px] flex-col justify-between rounded-[32px] border border-white/10 bg-black p-5">

            <div className="flex flex-1 items-center justify-center">

              {analysis ? (
                <div className="text-center">

                  <h2 className="text-3xl font-bold">
                    Your Analysis
                  </h2>

                  <p className="mt-4 text-white/50">
                    Current Score:
                    {" "}
                    {
                      analysis.currentScore
                    }
                  </p>

                  <p className="mt-2 text-white/50">
                    Archetype:
                    {" "}
                    {
                      analysis.archetype
                    }
                  </p>

                </div>
              ) : (
                <p className="max-w-xs text-center text-2xl leading-relaxed text-white/30">
                  {
  analysis
    ? "Your face has already been analyzed."
    : "Insights will appear here after scanning your face"
}
                </p>
              )}

            </div>

            <button
              onClick={() => {
  if (analysis) {
    router.push("/results");
  } else {
    setActiveTab("scan");
  }
}}
              className="w-full rounded-xl bg-[#A60800] py-5 text-xl font-black uppercase tracking-widest"
            >
              {
  analysis
    ? "Open Report"
    : "Become Him"
}
            </button>

          </div>
        )}

      </div>
    </main>
  );
}