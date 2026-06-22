import { create } from "zustand";

type AnalysisSection = {
  score: number;
  insight: string;
};

type Analysis = {
  faceShape: string;

  eyeArea: string;

  symmetry: string;

  confidenceScore: number;

  strongestFeature: string;

  weakestFeature: string;

  archetype: string;

  currentScore: number;

  potentialScore: number;

  masculinityScore: number;

  beardSuitability: AnalysisSection;

  facialDefinition: AnalysisSection;

  skinQuality: AnalysisSection;

  hairstyleMatch: AnalysisSection;

  jawline: AnalysisSection;

  summary: string;

  priorities: {
    title: string;
    description: string;
  }[];

  recommendations: {
    tag: string;
    title: string;
    description: string;
  }[];
};

type ScanStore = {
  images: string[];

  imageUrls: string[];

  files: File[];

  analysis: Analysis | null;

  hasPurchased: boolean;

  setImages: (
    images: string[]
  ) => void;

  setImageUrls: (
    imageUrls: string[]
  ) => void;

  setFiles: (
    files: File[]
  ) => void;

  setAnalysis: (
    analysis: Analysis
  ) => void;

  setPurchased: (
    purchased: boolean
  ) => void;

  clearScan: () => void;
};

export const useScanStore =
  create<ScanStore>((set) => ({
    images: [],

    imageUrls: [],

    files: [],

    analysis: null,

    hasPurchased: false,

    setImages: (images) =>
      set({
         images,
         imageUrls: images,
        }),
        
    setImageUrls: (
      imageUrls
    ) =>
      set({
        imageUrls,
      }),

    setFiles: (files) =>
      set({
        files,
      }),

    setAnalysis: (
      analysis
    ) =>
      set({
        analysis,
      }),

    setPurchased: (
      purchased
    ) =>
      set({
        hasPurchased:
          purchased,
      }),

    clearScan: () =>
      set({
        images: [],
        imageUrls: [],
        files: [],
        analysis: null,
        hasPurchased: false,
      }),
  }));