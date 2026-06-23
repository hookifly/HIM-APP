"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { ArrowLeft, Sparkles } from "lucide-react";

import { useScanStore } from "@/stores/scanstore";

import { GlowupCard } from "@/app/recommendations/glowupcard";
import { PriorityCard } from "@/app/recommendations/prioritycard";
import { RecommendationCard } from "@/app/recommendations/recommendationcard";
import { useAuth } from "@/context/auth-context";
import mixpanel from "@/lib/mixpanel";

import { jsPDF } from "jspdf";

export default function RecommendationsPage() {
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

  useEffect(() => {
  mixpanel.track(
    "Recommendations Viewed"
  );
}, []);

  useEffect(() => {
    if (!analysis) {
      router.push("/upload");
    }

    if (analysis && !isPremium) {
      router.push("/paywall");
    }
  }, [
    analysis,
    isPremium,
    router,
  ]);

  if (!analysis || !isPremium) {
  return null;
}

const report = analysis;

  function downloadReport() {
    const pdf = new jsPDF();

    pdf.setFontSize(20);
    pdf.text(
      "Become Him - Facial Analysis Report",
      20,
      20
    );

    pdf.setFontSize(14);

    pdf.text(
      `Current Score: ${report.currentScore}`,
      20,
      40
    );

    pdf.text(
      `Potential Score: ${report.potentialScore}`,
      20,
      50
    );

    pdf.text(
      `Masculinity Score: ${report.masculinityScore}`,
      20,
      60
    );

    pdf.text(
      `Archetype: ${report.archetype}`,
      20,
      70
    );

    pdf.text(
      "Top Priorities:",
      20,
      90
    );

    let y = 105;

    report.priorities.forEach(
      (item, index) => {
        pdf.text(
          `${index + 1}. ${item.title}`,
          20,
          y
        );

        y += 10;
      }
    );

    y += 10;

    pdf.text(
      "Recommendations:",
      20,
      y
    );

    y += 15;

    report.recommendations.forEach(
      (item, index) => {
        pdf.text(
          `${index + 1}. ${item.title}`,
          20,
          y
        );

        y += 10;
      }
    );

    pdf.save(
      "become-him-report.pdf"
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-16 pt-6 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
      <div className="mx-auto max-w-sm">

        {/* HEADER */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() => router.push("/results")}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03]"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="flex-1 text-center font-semibold uppercase tracking-[0.08em]" style={{ fontSize: "22px" }}>
            Your Blueprint
          </h1>

          <div className="h-11 w-11 flex-shrink-0" />
        </div>

        {/* PREMIUM UNLOCKED BANNER */}
        <div
          className="relative mt-7 overflow-hidden rounded-3xl p-6"
          style={{ background: "linear-gradient(160deg, #1A0606 0%, #0A2C47 100%)" }}>

          {/* Ambient glow */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-[160px] w-[160px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(136,8,8,0.3) 0%, transparent 70%)" }}
          />

          <div className="relative z-[2] flex items-center gap-4">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#880808]/40">
              <Image
                src={imageUrls[0] || images[0] || "/main.jpg"}
                alt="Face"
                fill
                className="object-cover"
              />
            </div>

            <div className="flex-1">
              <div className="mb-1.5 inline-flex items-center gap-1.5 rounded-full bg-[#880808]/20 px-2.5 py-1">
                <div className="h-1.5 w-1.5 rounded-full bg-[#E8857F]" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#E8857F]" style={{ fontFamily: "Inter, sans-serif" }}>
                  Full Report Unlocked
                </span>
              </div>

              <h2 className="font-bold leading-tight" style={{ fontSize: "22px" }}>
                {analysis.archetype}
              </h2>

              <p className="mt-1 text-[11px] uppercase tracking-[0.1em] text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
                Your Archetype
              </p>
            </div>
          </div>

          {/* Score row */}
          <div className="relative z-[2] mt-5 grid grid-cols-3 gap-3 border-t border-white/8 pt-5">
            {[
              { val: analysis.currentScore, label: "Current" },
              { val: analysis.masculinityScore, label: "Masculinity" },
              { val: analysis.potentialScore, label: "Potential" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-bold" style={{ fontSize: "28px", lineHeight: "1" }}>
                  {s.val}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.1em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GLOW-UP CARD */}
        <div className="mt-5">
          <GlowupCard
            current={analysis.currentScore}
            potential={analysis.potentialScore}
          />
        </div>

        {/* TOP PRIORITIES */}
        <div className="mt-9">

          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#09008B]/25">
              <Sparkles size={16} className="text-[#7C9FC9]" />
            </div>
            <div>
              <h2 className="text-xl font-semibold leading-tight">Top Priorities</h2>
              <p className="text-[11px] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
                Fix these first for maximum impact
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {analysis.priorities.map(
              (item, index) => (
                <PriorityCard
                  key={item.title}
                  number={index + 1}
                  title={item.title}
                  description={item.description}
                />
              )
            )}
          </div>
        </div>

        {/* RECOMMENDATIONS */}
        <div className="mt-9">

          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#09008B]/25">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#7C9FC9" strokeWidth="1.8">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-semibold leading-tight">Action Plan</h2>
              <p className="text-[11px] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
                Your personalized improvement roadmap
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {analysis.recommendations.map(
              (item) => (
                <RecommendationCard
                  key={item.title}
                  tag={item.tag}
                  title={item.title}
                  description={item.description}
                />
              )
            )}
          </div>
        </div>

        {/* DOWNLOAD PDF */}
        <div className="mt-10 space-y-3">
          <button
            onClick={downloadReport}
            className="flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#880808] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white transition-all active:scale-[0.98]"
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Download PDF Report
          </button>

          <button
            onClick={() => router.push("/results")}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white/65"
          >
            Back to Insights
          </button>
        </div>

      </div>
    </main>
  );
}