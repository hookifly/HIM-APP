"use client";

import Image from "next/image";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  Camera,
  Check,
  ChevronRight,
  RotateCcw,
  ImagePlus,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useScanStore } from "@/stores/scanstore";

const steps = [
  {
    key: "front",
    title: "Front Face",
    instruction:
      "Upload a clear front-facing selfie",
  },

  {
    key: "left",
    title: "Left Angle",
    instruction:
      "Upload your left side angle",
  },

  {
    key: "right",
    title: "Right Angle",
    instruction:
      "Upload your right side angle",
  },
];

export default function UploadPageClient() {
  const router = useRouter();

  const inputRef =
    useRef<HTMLInputElement>(null);

  const {
  files,
  setImages,
  setFiles,
  clearScan,
} = useScanStore();

  const [step, setStep] =
    useState(0);

  const [images, setLocalImages] =
    useState<string[]>([]);

  const [error, setError] =
  useState<string | null>(null);

  const currentStep = steps[step];

  useEffect(() => {
  const params = new URLSearchParams(
    window.location.search
  );

  setError(params.get("error"));
}, []);

  useEffect(() => {
  clearScan();
  setFiles([]); 
  setLocalImages([]);
  setStep(0);
}, []);

  // CLEANUP URLS
  useEffect(() => {
    return () => {
      images.forEach((image) =>
        URL.revokeObjectURL(image)
      );
    };
  }, [images]);

  // UPLOAD IMAGE
  function handleUpload(
  e: React.ChangeEvent<HTMLInputElement>
) {
  const file = e.target.files?.[0];

  if (!file) return;

  const imageUrl =
    URL.createObjectURL(file);

  const updatedImages = [
    ...images,
    imageUrl,
  ];

  setLocalImages(updatedImages);

  setImages(updatedImages);

  const updatedFiles = [
  ...files,
  file,
];

setFiles(updatedFiles);

  if (step < 2) {
    setStep(step + 1);
  }
}

  // RETAKE LAST
  function handleRetake() {
  if (images.length === 0) return;

  const updatedImages =
    images.slice(0, -1);

  const updatedFiles =
    files.slice(0, -1);

  setLocalImages(updatedImages);

  setImages(updatedImages);

  setFiles(updatedFiles);

  setStep(
    Math.max(updatedImages.length, 0)
  );
}

  // CONTINUE
  const paywallEnabled =
  process.env
    .NEXT_PUBLIC_ENABLE_PAYWALL ===
  "true";

function handleContinue() {
  if (
    images.length !== 3 ||
    files.length !== 3
  )
    return;

  if (paywallEnabled) {
    router.push("/paywall");
  } else {
     router.replace("/processing");
  }
}

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
      <div className="mx-auto max-w-sm">

        {/* HEADER */}
        <div className="mb-6 flex items-center gap-3.5">

          <button
            onClick={() =>
              router.back()
            }
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03]"
          >
            <ArrowLeft size={20} />
          </button>

          <h1
            className="flex-1 text-center font-semibold uppercase tracking-[0.08em]"
            style={{ fontSize: "22px" }}>
            Upload
          </h1>

          <div className="h-11 w-11 flex-shrink-0" />

        </div>

        {error && (
  <div className="mb-5 rounded-2xl border border-[#880808]/30 bg-[#880808]/10 px-4 py-3.5 text-sm text-[#E8857F]" style={{ fontFamily: "Inter, sans-serif" }}>
    {error === "timeout"
      ? "Analysis is taking longer than usual. Please try again in a few moments."
      : "Face analysis is temporarily unavailable. Please try again shortly."}
  </div>
)}

        {/* PROGRESS */}
        <div className="mb-7 flex justify-center gap-2">

          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 w-[72px] rounded-full ${
                index <= step
                  ? "bg-[#880808]"
                  : "bg-white/8"
              }`}
            />
          ))}

        </div>

        {/* TITLE */}
        <h2
          className="text-center font-bold"
          style={{ fontSize: "32px", lineHeight: "1.1" }}>
          {currentStep.title}
        </h2>

        <p className="mt-2 text-center text-sm text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
          {currentStep.instruction}
        </p>

        {/* MAIN PREVIEW */}
        <div className="mt-7 flex justify-center">

          <div className="relative h-44 w-44 overflow-hidden rounded-full border border-white/12 bg-[#0a0a0a]">

            {images[step] ? (
              <Image
                src={images[step]}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <>
                {/* Ambient glow */}
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{ background: "radial-gradient(circle at 50% 40%, rgba(9,0,139,0.2) 0%, transparent 70%)" }}
                />

                {/* Crosshair */}
                <div className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 bg-white/15" />
                <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-white/15" />
              </>
            )}

          </div>

        </div>

        {/* CAMERA — now first */}
        <button
          onClick={() =>
            router.push("/camera")
          }
          className="mt-7 flex w-full items-center justify-between rounded-2xl border border-white/7 bg-white/[0.02] px-5 py-[18px] transition-all hover:border-white/15"
        >

          <div className="flex items-center gap-4">

            <div className="flex h-[52px] w-[52px] flex-shrink-0 items-center justify-center rounded-2xl bg-[#880808]/12">

              <Camera
                size={24}
                className="text-[#E8857F]"
              />

            </div>

            <div className="text-left">

              <p className="text-lg font-semibold leading-tight">
                Scan Directly
              </p>

              <p className="mt-1 text-xs text-white/35" style={{ fontFamily: "Inter, sans-serif" }}>
                Open camera and take
                3 angles
              </p>

            </div>

          </div>

          <ChevronRight
            size={22}
            className="text-white/40"
          />

        </button>

        {/* DIVIDER */}
        <div className="my-7 flex items-center gap-3.5">

          <div className="h-px flex-1 bg-white/8" />

          <span className="text-[11px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>
            or
          </span>

          <div className="h-px flex-1 bg-white/8" />

        </div>

        {/* GALLERY BUTTON — now second */}
        <button
          onClick={() =>
            inputRef.current?.click()
          }
          className="relative flex h-40 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/12 bg-white/[0.015] transition-all hover:border-[#7C9FC9]/40"
        >

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#7C9FC9]/10">
            <ImagePlus
              size={24}
              className="text-[#7C9FC9]"
            />
          </div>

          <p className="mt-3.5 text-base font-semibold">
            Upload {currentStep.title}
          </p>

          <p className="mt-1.5 text-xs uppercase tracking-[0.08em] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
            JPG, PNG &middot; Max 10MB
          </p>

        </button>

        {/* HIDDEN INPUT */}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleUpload}
          className="hidden"
        />

        {/* PREVIEWS */}
        <div className="mt-7 flex justify-center gap-3.5">

          {steps.map((item, index) => {
            const image =
              images[index];

            return (
              <div
                key={item.key}
                className={`relative flex h-16 w-16 items-center justify-center rounded-2xl border ${
                  image
                    ? "border-[#5EE079]"
                    : "border-white/10"
                }`}
              >

                {image ? (
                  <>
                    <Image
                      src={image}
                      alt={item.title}
                      fill
                      className="rounded-2xl object-cover"
                    />

                    <div className="absolute bottom-[-2px] right-[-2px] flex h-5 w-5 items-center justify-center rounded-full bg-[#5EE079]">

                      <Check size={12} className="text-[#04342C]" strokeWidth={3} />

                    </div>
                  </>
                ) : (
                  <span className="text-lg font-semibold text-white/30">
                    {index + 1}
                  </span>
                )}

              </div>
            );
          })}

        </div>

        {/* CONTINUE */}
        <button
          onClick={handleContinue}
          disabled={images.length !== 3 || files.length !== 3}
          className={`mt-9 w-full rounded-2xl py-[18px] text-sm font-semibold uppercase tracking-[0.06em] transition-all ${
            images.length === 3
              ? "bg-[#880808] text-white"
              : "border border-white/10 bg-transparent text-white/25"
          }`}
        >
          Continue
        </button>

        {/* RETAKE */}
        {images.length > 0 && (
          <button
            onClick={handleRetake}
            className="mt-6 flex w-full items-center justify-center gap-2.5 text-sm text-white/35 transition-all hover:text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >

            <RotateCcw size={18} />

            Retake Previous

          </button>
        )}

      </div>
    </main>
  );
}