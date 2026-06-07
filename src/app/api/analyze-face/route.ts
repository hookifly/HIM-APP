import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

console.log("ANALYZE REQUEST STARTED");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
);

const fallbackAnalysis = {
  archetype: "Sharp Executive",
  currentScore: 78,
  potentialScore: 91,
  masculinityScore: 84,

  beardSuitability: {
    score: 85,
    insight:
      "Good beard growth potential with proper grooming.",
  },

  facialDefinition: {
    score: 74,
    insight:
      "Facial definition can improve through lower body fat and reduced bloating.",
  },

  skinQuality: {
    score: 80,
    insight:
      "Skin quality is generally healthy with room for improvement.",
  },

  hairstyleMatch: {
    score: 86,
    insight:
      "Textured hairstyles would complement your facial structure.",
  },

  jawline: {
    score: 77,
    insight:
      "Jawline visibility can improve with leanness and posture.",
  },

  summary:
    "Strong masculine potential with several high-impact improvement opportunities.",
};

async function sleep(ms: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, ms)
  );
}

export async function POST(
  request: Request
) {
  try {
    const formData =
      await request.formData();

    const files =
      formData.getAll(
        "images"
      ) as File[];

    if (files.length !== 3) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Exactly 3 images required",
        },
        {
          status: 400,
        }
      );
    }

    const imageParts =
      await Promise.all(
        files.map(async (file) => {
          const buffer =
            await file.arrayBuffer();

          return {
            inlineData: {
              data: Buffer.from(
                buffer
              ).toString("base64"),

              mimeType:
                file.type,
            },
          };
        })
      );

    const model =
      genAI.getGenerativeModel({
        model: "gemini-2.5-flash",
      });

    let text = "";

    for (
      let attempt = 1;
      attempt <= 3;
      attempt++
    ) {
      try {
        const result =
  await model.generateContent([
`
You are an elite male facial masculinity analyst.

Analyze all three images together.

Focus on masculine development and realistic assessment.

Evaluate:

- facial masculinity
- facial bone structure
- jawline strength
- chin projection
- facial definition
- beard potential
- eye area strength
- hairstyle suitability
- skin quality
- facial symmetry
- overall masculine presence and dominance

Important:

- Scores must be integers from 0 to 100.
- Never return decimals.
- Average men should score around 50-65.
- Strong masculine faces should score around 75-90.
- Exceptional faces should score above 90.
- Do not inflate scores.
- Use the entire range from 40 to 95.
- Different faces should naturally receive different scores.
- Avoid clustering scores around 75-85.
- Potential score should represent realistic improvements achievable in 6-12 months.
- Current score should represent present appearance.
- Be realistic and consistent.

Archetype must be one of:

Warrior
Executive
Athlete
Rogue
Model
Scholar
Titan
Kingpin
Hunter
Commander
Prince
Monk
Predator
Viking
Knight
Gentleman
Patriarch
Mercenary
Samurai
Chief

Face shape must be one of:

Oval
Square
Diamond
Rectangle
Heart
Round
Triangle
Oblong

Eye area must be one of:

Elite
Strong
Average
Developing

Symmetry must be one of:

Very High
High
Moderate
Average

StrongestFeature and WeakestFeature must be one of:

Jawline
Beard
Eye Area
Skin Quality
Facial Definition
Hair
Chin Projection
Symmetry

Return ONLY raw JSON.

{
  "archetype":"",
  "faceShape":"",
  "eyeArea":"",
  "symmetry":"",
  "confidenceScore":95,

  "strongestFeature":"",
  "weakestFeature":"",

  "currentScore":75,
  "potentialScore":88,
  "masculinityScore":82,

  "beardSuitability":{
    "score":0,
    "insight":""
  },

  "facialDefinition":{
    "score":0,
    "insight":""
  },

  "skinQuality":{
    "score":0,
    "insight":""
  },

  "hairstyleMatch":{
    "score":0,
    "insight":""
  },

  "jawline":{
    "score":0,
    "insight":""
  },

  "summary":""
}
`,
...imageParts,
]);

        text =
          result.response.text();

        break;
      } catch (err) {
        console.error(
          `Gemini attempt ${attempt} failed`,
          err
        );

        if (attempt < 3) {
          await sleep(2000);
        }
      }
    }

    if (!text) {
  return NextResponse.json(
    {
      success: false,
      error:
        "Face analysis is temporarily busy. Please try again in a few moments.",
    },
    {
      status: 503,
    }
  );
}

    console.log(
      "RAW GEMINI RESPONSE:"
    );
    console.log(text);

    const jsonMatch =
      text.match(
        /\{[\s\S]*\}/
      );

    if (!jsonMatch) {
  return NextResponse.json(
    {
      success: false,
      error:
        "Face analysis is temporarily busy. Please try again in a few moments.",
    },
    {
      status: 503,
    }
  );
}

    const analysis =
      JSON.parse(
        jsonMatch[0]
      );

    return NextResponse.json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error(
      "ANALYSIS ERROR:",
      error
    );

    return NextResponse.json(
  {
    success: false,
    error:
      "Face analysis is temporarily busy. Please try again in a few moments.",
  },
  {
    status: 503,
  }
);
  }
}