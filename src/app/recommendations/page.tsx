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
    <main className="min-h-screen bg-black px-4 py-6 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
      <div className="mx-auto max-w-sm">

        {/* HEADER */}
        <div className="flex items-center gap-3.5">
          <button
            onClick={() =>
              router.push("/results")
            }
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03]"
          >
            <ArrowLeft size={20} />
          </button>

          <h1 className="flex-1 text-center font-semibold uppercase tracking-[0.08em]" style={{ fontSize: "22px" }}>
            Recommendations
          </h1>

          <div className="h-11 w-11 flex-shrink-0" />
        </div>

        {/* FACE */}
        <div className="mt-9 flex justify-center">
          <div className="relative h-36 w-36 overflow-hidden rounded-full border border-white/10">
            <Image
              src={
                imageUrls[0] ||
                images[0] ||
                "/main.jpg"
              }
              alt="Face"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* GLOW-UP CARD */}
        <div className="mt-9">
          <GlowupCard
            current={analysis.currentScore}
            potential={analysis.potentialScore}
          />
        </div>

        {/* TOP PRIORITIES */}
        <div className="mt-9">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#09008B]/25">
              <Sparkles size={17} className="text-[#7C9FC9]" />
            </div>

            <h2 className="text-xl font-semibold">
              Top Priorities
            </h2>
          </div>

          <div className="mt-5 space-y-3">
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
        <div className="mt-9 space-y-3">
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

        {/* DOWNLOAD PDF */}
        <button
          onClick={downloadReport}
          className="mt-10 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#880808] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
          </svg>
          Download PDF Report
        </button>

        {/* BACK */}
        <button
          onClick={() =>
            router.push("/results")
          }
          className="mt-3.5 w-full rounded-2xl border border-white/10 bg-white/[0.03] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white/65"
        >
          Back to Insights
        </button>

      </div>
    </main>
  );
}