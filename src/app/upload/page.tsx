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

export default function UploadPage() {
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

  const currentStep = steps[step];

  useEffect(() => {
  clearScan();
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
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-sm">

        {/* HEADER */}
        <div className="mb-8 flex items-center">

          <button
            onClick={() =>
              router.back()
            }
            className="mr-4"
          >
            <ArrowLeft size={34} />
          </button>

          <h1 className="flex-1 text-center text-4xl font-bold">
            Upload
          </h1>

        </div>

        {/* PROGRESS */}
        <div className="mb-8 flex justify-center gap-3">

          {steps.map((_, index) => (
            <div
              key={index}
              className={`h-3 w-20 rounded-full ${
                index <= step
                  ? "bg-red-600"
                  : "bg-zinc-800"
              }`}
            />
          ))}

        </div>

        {/* TITLE */}
        <h2 className="text-center text-4xl font-bold">
          {currentStep.title}
        </h2>

        <p className="mt-3 text-center text-lg text-white/60">
          {currentStep.instruction}
        </p>

        {/* MAIN PREVIEW */}
        <div className="mt-10 flex justify-center">

          <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-white">

            {images[step] ? (
              <Image
                src={images[step]}
                alt="Preview"
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-zinc-200">
                <span className="text-6xl text-black">
                  ×
                </span>
              </div>
            )}

          </div>

        </div>

        {/* GALLERY BUTTON */}
        <button
          onClick={() =>
            inputRef.current?.click()
          }
          className="mt-10 flex h-44 w-full flex-col items-center justify-center rounded-3xl border border-dashed border-white/15 bg-zinc-950 transition-all hover:border-red-500/40"
        >

          <ImagePlus
            size={52}
            className="text-white/50"
          />

          <p className="mt-4 text-2xl font-medium">
            Upload {currentStep.title}
          </p>

          <p className="mt-2 text-lg text-white/40">
            JPG, PNG • Max 10MB
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
        <div className="mt-8 flex justify-center gap-4">

          {steps.map((item, index) => {
            const image =
              images[index];

            return (
              <div
                key={item.key}
                className={`relative h-20 w-20 overflow-hidden rounded-full border-2 ${
                  image
                    ? "border-green-500"
                    : "border-zinc-700"
                }`}
              >

                {image ? (
                  <>
                    <Image
                      src={image}
                      alt={item.title}
                      fill
                      className="object-cover"
                    />

                    <div className="absolute bottom-0 right-0 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">

                      <Check size={14} />

                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center bg-zinc-900 text-sm text-white/40">
                    {index + 1}
                  </div>
                )}

              </div>
            );
          })}

        </div>

        {/* DIVIDER */}
        <div className="my-10 flex items-center">

          <div className="h-px flex-1 bg-white/10" />

          <span className="mx-4 text-3xl text-white/60">
            or
          </span>

          <div className="h-px flex-1 bg-white/10" />

        </div>

        {/* CAMERA */}
        <button
          onClick={() =>
            router.push("/camera")
          }
          className="flex w-full items-center justify-between rounded-3xl bg-zinc-950 px-6 py-6 transition-all hover:bg-zinc-900"
        >

          <div className="flex items-center gap-5">

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">

              <Camera
                size={34}
                className="text-red-500"
              />

            </div>

            <div className="text-left">

              <p className="text-3xl font-semibold">
                Scan Directly
              </p>

              <p className="mt-1 text-lg text-white/40">
                Open camera and take
                3 angles
              </p>

            </div>

          </div>

          <ChevronRight
            size={34}
            className="text-white/60"
          />

        </button>

        {/* CONTINUE */}
        <button
          onClick={handleContinue}
          disabled={images.length !== 3 || files.length !== 3}
          className={`mt-12 w-full rounded-full py-5 text-3xl font-bold transition-all ${
            images.length === 3
              ? "bg-red-600 text-white hover:bg-red-500"
              : "bg-zinc-800 text-zinc-500"
          }`}
        >
          Continue
        </button>

        {/* RETAKE */}
        {images.length > 0 && (
          <button
            onClick={handleRetake}
            className="mt-8 flex w-full items-center justify-center gap-3 text-2xl text-white/50 transition-all hover:text-white"
          >

            <RotateCcw size={24} />

            Retake Previous

          </button>
        )}

      </div>
    </main>
  );
}