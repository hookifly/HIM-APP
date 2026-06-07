type Analysis = {
  beardSuitability: {
    score: number;
    insight: string;
  };

  facialDefinition: {
    score: number;
    insight: string;
  };

  skinQuality: {
    score: number;
    insight: string;
  };

  hairstyleMatch: {
    score: number;
    insight: string;
  };

  jawline: {
    score: number;
    insight: string;
  };
};

export function generateRecommendations(
  analysis: Analysis
) {
  const priorities = [];

  const recommendations = [];

  // JAWLINE
  if (
    analysis.jawline.score < 80
  ) {
    priorities.push({
      title: "Facial Leanness",
      description:
        "Reducing facial fat and bloating will improve jaw visibility.",
    });

    recommendations.push({
      tag: "FACIAL STRUCTURE",
      title:
        "Enhance Jaw Definition",
      description:
        analysis.jawline.insight,
    });
  }

  // SKIN
  if (
    analysis.skinQuality.score <
    80
  ) {
    priorities.push({
      title: "Skin Quality",
      description:
        "Improving skin clarity will noticeably increase attractiveness.",
    });

    recommendations.push({
      tag: "SKINCARE",
      title:
        "Improve Skin Clarity",
      description:
        analysis.skinQuality
          .insight,
    });
  }

  // HAIR
  if (
    analysis.hairstyleMatch
      .score < 85
  ) {
    priorities.push({
      title:
        "Hair Optimization",
      description:
        "A better hairstyle can improve overall facial harmony.",
    });

    recommendations.push({
      tag: "HAIRSTYLE",
      title:
        "Volume Boost Styling",
      description:
        analysis.hairstyleMatch
          .insight,
    });
  }

  // BEARD
  if (
    analysis.beardSuitability
      .score > 80
  ) {
    recommendations.push({
      tag: "BEARD",
      title:
        "Short Boxed Beard",
      description:
        analysis.beardSuitability
          .insight,
    });
  }

  if (
  priorities.length === 0
) {
  priorities.push({
    title:
      "Maintain Current Look",
    description:
      "Your facial metrics are already strong. Focus on consistency and maintenance.",
  });

  recommendations.push({
    tag: "MAINTENANCE",
    title:
      "Keep Current Routine",
    description:
      "Continue your current grooming, fitness, hairstyle, and skincare habits.",
  });
}

  return {
    priorities:
      priorities.slice(0, 3),

    recommendations,
  };
}