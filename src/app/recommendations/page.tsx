"use client";

import Image from "next/image";

import { useRouter } from "next/navigation";

import { useEffect } from "react";

import { useScanStore } from "@/stores/scanstore";

import { GlowupCard } from "@/app/recommendations/glowupcard";

import { PriorityCard } from "@/app/recommendations/prioritycard";

import { RecommendationCard } from "@/app/recommendations/recommendationcard";

import { generateRecommendations } from "@/lib/recommendation-engine";

import {
  ArrowLeft,
  Sparkles,
} from "lucide-react";

export default function RecommendationsPage() {
  const router = useRouter();

  const {
    images,
    analysis,
    hasPurchased,
  } = useScanStore();

  // PROTECT PAGE
  if (!analysis) {
  router.push("/upload");
  return null;
}

if (!hasPurchased) {
  router.push("/paywall");
  return null;
}

  const {
    priorities,
    recommendations,
  } = generateRecommendations(
    analysis
  );

  useEffect(() => {
  if (!analysis) {
    router.push("/upload");
  }

  if (
    analysis &&
    !hasPurchased
  ) {
    router.push("/paywall");
  }
}, [
  analysis,
  hasPurchased,
  router,
]);

if (
  !analysis ||
  !hasPurchased
) {
  return null;
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
                images[0] ||
                "/main.jpg"
              }
              alt="Face"
              fill
              className="object-cover"
            />

          </div>

        </div>

        {/* GLOWUP */}
        <div className="mt-10">

          <GlowupCard
            current={
              analysis.currentScore
            }
            potential={
              analysis.potentialScore
            }
          />

        </div>

        {/* PRIORITIES */}
        <div className="mt-10">

          <div className="flex items-center gap-3">

            <Sparkles className="text-blue-500" />

            <h2 className="text-3xl font-bold">
              Top Priorities
            </h2>

          </div>

          <div className="mt-6 space-y-5">

            {priorities.map(
              (item, index) => (
                <PriorityCard
                  key={item.title}
                  number={index + 1}
                  title={item.title}
                  description={
                    item.description
                  }
                />
              )
            )}

          </div>

        </div>

        {/* RECOMMENDATIONS */}
        <div className="mt-10 space-y-5">

          {recommendations.map(
            (item) => (
              <RecommendationCard
                key={item.title}
                tag={item.tag}
                title={item.title}
                description={
                  item.description
                }
              />
            )
          )}

        </div>

        {/* FINAL CTA */}
        <button
          onClick={() =>
            router.push("/results")
          }
          className="mt-12 w-full rounded-full bg-blue-700 py-5 text-3xl font-bold"
        >
          Back to Insights
        </button>

      </div>
    </main>
  );
}