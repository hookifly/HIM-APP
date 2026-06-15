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
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-sm">

        {/* HEADER */}
        <div className="flex items-center">
          <button
            onClick={() =>
              router.push("/results")
            }
            className="mr-4"
          >
            <ArrowLeft size={34} />
          </button>

          <h1 className="flex-1 text-center text-4xl font-bold">
            Recommendations
          </h1>
        </div>

        {/* FACE */}
        <div className="mt-10 flex justify-center">
          <div className="relative h-40 w-40 overflow-hidden rounded-full border border-white/10">
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
        <div className="mt-10">
          <GlowupCard
            current={analysis.currentScore}
            potential={analysis.potentialScore}
          />
        </div>

        {/* TOP PRIORITIES */}
        <div className="mt-10">
          <div className="flex items-center gap-3">
            <Sparkles className="text-blue-500" />

            <h2 className="text-3xl font-bold">
              Top Priorities
            </h2>
          </div>

          <div className="mt-6 space-y-5">
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
        <div className="mt-10 space-y-5">
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
          className="mt-12 w-full rounded-full bg-red-600 py-5 text-3xl font-bold"
        >
          Download PDF Report
        </button>

        {/* BACK */}
        <button
          onClick={() =>
            router.push("/results")
          }
          className="mt-6 w-full rounded-full bg-blue-700 py-5 text-3xl font-bold"
        >
          Back to Insights
        </button>

      </div>
    </main>
  );
}