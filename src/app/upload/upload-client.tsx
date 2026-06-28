
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

import { useSearchParams } from "next/navigation";

import mixpanel from "@/lib/mixpanel";

const steps = [
  {
    key: "front",
    title: "Front Face",
    instruction: "Look straight at the camera. Keep your face centered and neutral.",
    tip: "Chin slightly down, eyes forward, natural lighting.",
  },
  {
    key: "left",
    title: "Left Side",
    instruction: "Turn your head left until your right ear is hidden. Stay still.",
    tip: "Full profile — your nose should stick out past your cheek.",
  },
  {
    key: "right",
    title: "Right Side",
    instruction: "Turn your head right until your left ear is hidden. Stay still.",
    tip: "Mirror of the last shot. Keep your chin level.",
  },
];

export default function UploadPageClient() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const inputRef = useRef<HTMLInputElement>(null);

  const {
    files,
    setImages,
    setFiles,
    clearScan,
  } = useScanStore();

  const [step, setStep] = useState(0);
  const [images, setLocalImages] = useState<string[]>([]);

  const currentStep = steps[step];

  useEffect(() => {
  mixpanel.track("Capture Viewed", {
    method: "upload",
  });
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
  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    const updatedImages = [...images, imageUrl];

    setLocalImages(updatedImages);
    setImages(updatedImages);

    const updatedFiles = [...files, file];
    setFiles(updatedFiles);

    if (step < 2) {
      setStep(step + 1);
    }
  }

  // RETAKE LAST
  function handleRetake() {
    if (images.length === 0) return;

    const updatedImages = images.slice(0, -1);
    const updatedFiles = files.slice(0, -1);

    setLocalImages(updatedImages);
    setImages(updatedImages);
    setFiles(updatedFiles);
    setStep(Math.max(updatedImages.length, 0));
  }

  // CONTINUE
  const paywallEnabled =
    process.env.NEXT_PUBLIC_ENABLE_PAYWALL === "true";

  function handleContinue() {
    if (images.length !== 3 || files.length !== 3) return;

    if (paywallEnabled) {
      router.push("/paywall");
    } else {
      router.replace("/processing");
    }
  }

  const allDone = images.length === 3;

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
      <div className="mx-auto max-w-sm">

        {/* HEADER */}
        <div className="mb-6 flex items-center gap-3.5">
          <button
            onClick={() => router.back()}
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-white/8 bg-white/[0.03]"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="flex-1 text-center">
            <h1 className="font-semibold uppercase tracking-[0.08em]" style={{ fontSize: "20px" }}>
              {allDone ? "Ready to Analyze" : `Photo ${step + 1} of 3`}
            </h1>
          </div>

          <div className="h-11 w-11 flex-shrink-0" />
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-2xl border border-[#880808]/30 bg-[#880808]/10 px-4 py-3.5 text-sm text-[#E8857F]" style={{ fontFamily: "Inter, sans-serif" }}>
            {error === "timeout"
              ? "Analysis is taking longer than usual. Please try again in a few moments."
              : "Face analysis is temporarily unavailable. Please try again shortly."}
          </div>
        )}

        {/* PROGRESS — segmented with labels */}
        <div className="mb-7 flex gap-2">
          {steps.map((s, index) => (
            <div key={s.key} className="flex-1">
              <div className={`h-1.5 w-full rounded-full transition-all ${
                index < images.length
                  ? "bg-[#880808]"
                  : index === step
                  ? "bg-[#880808]/40"
                  : "bg-white/8"
              }`} />
              <p className={`mt-1.5 text-center text-[9px] uppercase tracking-[0.08em] ${
                index < images.length ? "text-[#E8857F]/70" : index === step ? "text-white/40" : "text-white/15"
              }`} style={{ fontFamily: "Inter, sans-serif" }}>
                {s.title}
              </p>
            </div>
          ))}
        </div>

        {!allDone && (
          <>
            {/* STEP INSTRUCTION — contextual coaching */}
            <div
              className="mb-5 rounded-2xl border border-[#7C9FC9]/15 p-4"
              style={{ background: "rgba(10,44,71,0.3)" }}>
              <div className="flex items-start gap-3">
                <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#09008B]/40 mt-0.5">
                  <span className="text-[11px] font-bold text-[#7C9FC9]">{step + 1}</span>
                </div>
                <div>
                  <h2 className="mb-1 font-semibold" style={{ fontSize: "18px" }}>
                    {currentStep.title}
                  </h2>
                  <p className="text-[13px] leading-relaxed text-white/55" style={{ fontFamily: "Inter, sans-serif" }}>
                    {currentStep.instruction}
                  </p>
                  <p className="mt-2 text-[11px] text-[#7C9FC9]/60" style={{ fontFamily: "Inter, sans-serif" }}>
                    💡 {currentStep.tip}
                  </p>
                </div>
              </div>
            </div>

            {/* MAIN PREVIEW */}
            <div className="mb-5 flex justify-center">
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-2 border-[#880808]/30 bg-[#0a0a0a]">
                {images[step] ? (
                  <Image src={images[step]} alt="Preview" fill className="object-cover" />
                ) : (
                  <>
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: "radial-gradient(circle at 50% 40%, rgba(9,0,139,0.2) 0%, transparent 70%)" }}
                    />
                    <div className="absolute left-1/2 top-1/2 h-px w-7 -translate-x-1/2 -translate-y-1/2 bg-white/15" />
                    <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 -translate-y-1/2 bg-white/15" />
                    <p className="absolute bottom-8 left-0 right-0 text-center text-[10px] uppercase tracking-[0.1em] text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>
                      {currentStep.title}
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* PRIMARY ACTION — Camera first */}
            <button
              onClick={() => router.push("/camera")}
              className="mb-3 flex w-full items-center justify-between rounded-2xl bg-[#880808] px-5 py-[18px] transition-all active:scale-[0.98]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-[44px] w-[44px] flex-shrink-0 items-center justify-center rounded-xl bg-white/10">
                  <Camera size={22} className="text-white" />
                </div>
                <div className="text-left">
                  <p className="text-base font-semibold leading-tight">Use Camera</p>
                  <p className="mt-0.5 text-xs text-white/60" style={{ fontFamily: "Inter, sans-serif" }}>
                    Fastest · Takes all 3 automatically
                  </p>
                </div>
              </div>
              <ChevronRight size={20} className="text-white/60" />
            </button>

            {/* DIVIDER */}
            <div className="my-4 flex items-center gap-3.5">
              <div className="h-px flex-1 bg-white/8" />
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/30" style={{ fontFamily: "Inter, sans-serif" }}>or upload from gallery</span>
              <div className="h-px flex-1 bg-white/8" />
            </div>

            {/* GALLERY BUTTON — secondary */}
            <button
              onClick={() => inputRef.current?.click()}
              className="relative flex h-32 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed border-white/12 bg-white/[0.015] transition-all hover:border-[#7C9FC9]/40"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#7C9FC9]/10">
                <ImagePlus size={20} className="text-[#7C9FC9]" />
              </div>
              <p className="mt-2.5 text-sm font-semibold">Upload {currentStep.title}</p>
              <p className="mt-1 text-xs text-white/25" style={{ fontFamily: "Inter, sans-serif" }}>JPG, PNG · Max 10MB</p>
            </button>
          </>
        )}

        {/* HIDDEN INPUT */}
        <input
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={handleUpload}
          className="hidden"
        />

        {/* PHOTO PREVIEWS */}
        <div className="mt-6 flex justify-center gap-3.5">
          {steps.map((item, index) => {
            const image = images[index];
            return (
              <div
                key={item.key}
                className={`relative flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-2xl border ${
                  image ? "border-[#5EE079]" : index === step ? "border-[#880808]/40" : "border-white/10"
                }`}
              >
                {image ? (
                  <>
                    <Image src={image} alt={item.title} fill className="rounded-2xl object-cover" />
                    <div className="absolute bottom-[-2px] right-[-2px] flex h-5 w-5 items-center justify-center rounded-full bg-[#5EE079]">
                      <Check size={12} className="text-[#04342C]" strokeWidth={3} />
                    </div>
                  </>
                ) : (
                  <>
                    <span className={`text-sm font-semibold ${index === step ? "text-[#E8857F]" : "text-white/20"}`}>
                      {index + 1}
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.05em] text-white/20" style={{ fontFamily: "Inter, sans-serif" }}>
                      {item.title.split(" ")[0]}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        {/* ALL DONE STATE */}
        {allDone && (
          <div className="mt-6 rounded-2xl border border-[#5EE079]/20 bg-[#5EE079]/[0.04] p-5 text-center">
            <div className="mb-2 flex justify-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5EE079]/15">
                <Check size={20} className="text-[#5EE079]" strokeWidth={2.5} />
              </div>
            </div>
            <p className="font-semibold" style={{ fontSize: "16px" }}>All 3 photos ready</p>
            <p className="mt-1 text-sm text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
              Tap below to start your analysis
            </p>
          </div>
        )}

        {/* CONTINUE */}
        <button
          onClick={handleContinue}
          disabled={!allDone}
          className={`mt-4 w-full rounded-2xl py-[18px] text-sm font-semibold uppercase tracking-[0.06em] transition-all ${
            allDone
              ? "bg-[#880808] text-white active:scale-[0.98]"
              : "border border-white/10 bg-transparent text-white/20"
          }`}
        >
          {allDone ? "Analyze My Face →" : `${images.length}/3 Photos Uploaded`}
        </button>

        {/* RETAKE */}
        {images.length > 0 && (
          <button
            onClick={handleRetake}
            className="mt-4 flex w-full items-center justify-center gap-2 text-sm text-white/30 transition-all hover:text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            <RotateCcw size={15} />
            Retake last photo
          </button>
        )}

      </div>
    </main>
  );
}