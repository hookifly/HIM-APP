"use client";

import { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/context/auth-context";

import { useScanStore } from "@/stores/scanstore";

import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();

  const searchParams =
  useSearchParams();

  const {
  user,
  loading,
  isAdmin,
  hasAnalysis,
  signOut,
} = useAuth();

const {
  analysis,
  imageUrls,
} = useScanStore();

  const [activeTab, setActiveTab] =
useState<"scan" | "insights">(
  searchParams.get("tab") ===
    "insights"
    ? "insights"
    : analysis && !isAdmin
    ? "insights"
    : "scan"
);

useEffect(() => {
  if (hasAnalysis && !isAdmin) {
    setActiveTab("insights");
  }
}, [hasAnalysis, isAdmin]);

useEffect(() => {
  if (!hasAnalysis || isAdmin) {
    setActiveTab("scan");
  }
}, [hasAnalysis, isAdmin]);

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
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#880808] border-t-transparent" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
      <div className="mx-auto max-w-sm">

        {/* TABS */}
        <div className="flex gap-2">

          <button
            onClick={() =>
              setActiveTab("scan")
            }
            className={`flex-1 rounded-[14px] py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-all ${
              activeTab === "scan"
                ? "bg-[#880808] text-white"
                : "border border-white/7 bg-white/[0.03] text-white/35"
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
            className={`flex-1 rounded-[14px] py-3.5 text-[13px] font-semibold uppercase tracking-[0.08em] transition-all ${
              activeTab ===
              "insights"
                ? "bg-[#880808] text-white"
                : "border border-white/7 bg-white/[0.03] text-white/35"
            }`}
          >
            Insights
          </button>

        </div>

        {/* SCAN TAB */}
        {activeTab === "scan" ? (
          <div className="relative mt-2 overflow-hidden rounded-3xl bg-[#0A2C47]">

            <div className="relative h-[540px] w-full">

              <Image
                src="/main.jpg"
                alt="Model"
                fill
                className="object-cover object-top"
              />

              {/* Ambient glow */}
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-[200px] w-[200px] rounded-full"
                style={{ background: "radial-gradient(circle, rgba(9,0,139,0.3) 0%, transparent 70%)" }}
              />

              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, #000 0%, rgba(0,0,0,0.3) 45%, transparent 75%)" }}
              />

              <div className="absolute bottom-8 left-0 right-0 px-[22px] text-center">

                {hasAnalysis && !isAdmin ? (
  <>
    <h2 className="mb-3.5 font-bold leading-[1.15] text-white" style={{ fontSize: "30px" }}>
      Face Already Analyzed
    </h2>

    <p className="mb-6 text-sm leading-relaxed text-white/55" style={{ fontFamily: "Inter, sans-serif" }}>
      Your masculinity report has been generated.
      Continue following your improvement plan.
    </p>

    <button
      onClick={() =>
        setActiveTab("insights")
      }
      className="w-full rounded-2xl bg-[#880808] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white"
    >
      View Insights
    </button>
  </>
) : (
  <>
    <h2 className="mb-6 font-bold leading-[1.15] text-white" style={{ fontSize: "30px" }}>
      Get Ratings and Recommendations To Become Him
    </h2>

    <button
      onClick={() =>
        router.push("/instructions")
      }
      className="w-full rounded-2xl bg-[#880808] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white"
    >
      Begin Scan
    </button>
  </>
)}

              </div>

            </div>

          </div>
        ) : (
          <div
            className="relative mt-2 flex min-h-[600px] flex-col justify-between rounded-3xl p-6"
            style={{ background: "linear-gradient(160deg, #0A2C47 0%, #050D14 70%)" }}>

            <div className="flex flex-1 items-center justify-center">

  {analysis && hasAnalysis && !isAdmin ? (
    <div className="w-full">

      <div className="mb-5 flex items-center justify-center gap-2">
        <div className="h-[7px] w-[7px] flex-shrink-0 rounded-full bg-[#C23636]" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45" style={{ fontFamily: "Inter, sans-serif" }}>
          Face Analyzed
        </span>
      </div>

      <div className="rounded-[18px] border border-white/7 bg-white/[0.03] p-6">

        <p className="mb-2 text-[11px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
          Current Score
        </p>

        <h3 className="font-bold text-white" style={{ fontSize: "64px", lineHeight: "1", letterSpacing: "-1px" }}>
          {analysis.currentScore}
        </h3>

        <div className="my-5 h-px bg-white/7" />

        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1.5 text-[11px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
              Archetype
            </p>
            <h3 className="font-semibold text-[#E8857F]" style={{ fontSize: "24px", lineHeight: "1" }}>
              {analysis.archetype}
            </h3>
          </div>
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-[14px] bg-[#09008B]/25">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C9FC9" strokeWidth="1.6">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" />
              <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
            </svg>
          </div>
        </div>

      </div>

    </div>
  ) : (
    <div className="w-full rounded-[18px] border-[1.5px] border-dashed border-[#7C9FC9]/25 bg-white/[0.015] px-7 py-14 text-center">
      <div className="mx-auto mb-[18px] flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#7C9FC9]/10">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7C9FC9" strokeWidth="1.6">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
      <p className="mx-auto max-w-[220px] text-sm leading-relaxed text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
        Insights will appear here after scanning your face
      </p>
    </div>
  )}

</div>

            <button
              onClick={() => {
  if (hasAnalysis && !isAdmin) {
    router.push("/results");
  } else {
    router.push("/instructions");
  }
}}
              className="relative z-[2] mt-6 w-full rounded-2xl bg-[#880808] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white"
            >
              {
analysis && !isAdmin
  ? "Open Full Report"
  : "Begin Scan"
}
            </button>

          </div>
        )}

        <div className="mt-8 flex justify-center">

        <button
  onClick={signOut}
  className="text-[12px] font-medium uppercase tracking-[0.12em] text-white/30 transition hover:text-white/60"
  style={{ fontFamily: "Inter, sans-serif" }}
>
  Sign Out
</button>
</div>

      </div>
    </main>
  );
}