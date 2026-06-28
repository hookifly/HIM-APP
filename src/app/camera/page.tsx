"use client";

import Webcam from "react-webcam";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";

import {
  ArrowLeft,
  Camera,
  Check,
  RotateCcw,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { useScanStore } from "@/stores/scanstore";

import mixpanel from "@/lib/mixpanel";

const steps = [
  {
    key: "front",
    title: "Front Face",
    instruction:
      "Look straight into the camera",
  },

  {
    key: "left",
    title: "Left Angle",
    instruction:
      "Turn slightly to your left",
  },

  {
    key: "right",
    title: "Right Angle",
    instruction:
      "Turn slightly to your right",
  },
];

export default function CameraPage() {
  const router = useRouter();

  const {
  setImages,
  setFiles,
} = useScanStore();

  const webcamRef =
    useRef<Webcam>(null);

  const [step, setStep] =
    useState(0);

  const [cameraReady, setCameraReady] =
    useState(false);

  const [cameraError, setCameraError] =
    useState("");

  const [capturedImages, setCapturedImages] =
    useState<string[]>([]);

  const [previewImage, setPreviewImage] =
  useState<string | null>(null);

  const currentStep = steps[step];

  useEffect(() => {
  mixpanel.track("Capture Viewed", {
    method: "camera",
  });
}, []);

  // ENABLE CAMERA
  useEffect(() => {
    async function enableCamera() {
      try {
        await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: "user",
          },
          audio: false,
        });

        setCameraReady(true);
      } catch (error) {
        console.log(error);

        setCameraError(
          "Camera permission denied or unavailable. Please allow camera access in browser settings."
        );
      }
    }

    enableCamera();
  }, []);

  function dataURLtoFile(
  dataurl: string,
  filename: string
) {
  const arr = dataurl.split(",");

  const mime =
    arr[0].match(/:(.*?);/)?.[1] ||
    "image/jpeg";

  const bstr = atob(arr[1]);

  let n = bstr.length;

  const u8arr =
    new Uint8Array(n);

  while (n--) {
    u8arr[n] =
      bstr.charCodeAt(n);
  }

  return new File(
    [u8arr],
    filename,
    { type: mime }
  );
}

  // CAPTURE IMAGE
  function captureImage() {
  const imageSrc =
    webcamRef.current?.getScreenshot();

  if (!imageSrc) return;

  setPreviewImage(imageSrc);
}

function useCurrentPhoto() {
  if (!previewImage) return;

  const updatedImages = [
    ...capturedImages,
    previewImage,
  ];

  setCapturedImages(updatedImages);

  setPreviewImage(null);

  if (step < 2) {
    setStep(step + 1);
  }
}

function startAnalysis() {
  const files =
    capturedImages.map(
      (image, index) =>
        dataURLtoFile(
          image,
          `scan-${index}.jpg`
        )
    );

  setImages(capturedImages);

  setFiles(files);

  router.push("/processing");
}

  // RETAKE
  function retakeCurrent() {
  if (capturedImages.length === 0) return;

  const updatedImages =
    capturedImages.slice(0, -1);

  setCapturedImages(updatedImages);

  setStep(updatedImages.length);

  setPreviewImage(null);
}

  return (
    <main className="min-h-screen overflow-y-auto bg-black px-4 py-4 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
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

          <h1 className="flex-1 text-center font-semibold uppercase tracking-[0.08em]" style={{ fontSize: "22px" }}>
            Scan Face
          </h1>

          <div className="h-11 w-11 flex-shrink-0" />
        </div>

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
        <h2 className="text-center font-bold" style={{ fontSize: "32px", lineHeight: "1.1" }}>
          {currentStep.title}
        </h2>

        <p className="mt-2 text-center text-sm text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
          {currentStep.instruction}
        </p>

        {/* CAMERA */}
        <div
          className="relative mt-5 overflow-hidden rounded-[32px] border border-white/8"
          style={{ background: "linear-gradient(160deg, #0A2C47 0%, #050D14 75%)" }}>

          {cameraError ? (
  <div className="flex h-[400px] items-center justify-center p-8 text-center text-base text-[#E8857F]" style={{ fontFamily: "Inter, sans-serif" }}>
    {cameraError}
  </div>
) : previewImage ? (
  <div className="relative h-[52vh] max-h-[400px] min-h-[280px] w-full">
    <Image
      src={previewImage}
      alt="Preview"
      fill
      className="object-cover"
    />
  </div>
) : cameraReady ? (
  <Webcam
    ref={webcamRef}
    audio={false}
    mirrored
    screenshotFormat="image/jpeg"
    videoConstraints={{
      facingMode: "user",
    }}
    className="h-[52vh] max-h-[400px] min-h-[280px] w-full object-cover"
  />
) : (
  <div className="flex h-[52vh] max-h-[400px] min-h-[280px] items-center justify-center gap-2.5 text-base text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#7C9FC9] border-t-transparent" />
    Opening Camera...
  </div>
)}
        </div>

        {/* PREVIEWS */}
        <div className="mt-4 flex justify-center gap-3.5">
          {steps.map((item, index) => {
            const image =
              capturedImages[index];

            return (
              <div
                key={item.key}
                className={`relative h-16 w-16 overflow-hidden rounded-full border ${
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
                      className="object-cover"
                    />

                    <div className="absolute bottom-[-2px] right-[-2px] flex h-5 w-5 items-center justify-center rounded-full bg-[#5EE079]">
                      <Check size={12} className="text-[#04342C]" strokeWidth={3} />
                    </div>
                  </>
                ) : (
                  <div className="flex h-full items-center justify-center text-base font-semibold text-white/30">
                    {index + 1}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CAPTURE */}
        {previewImage ? (
  <div className="mt-9 flex gap-3">

    <button
      onClick={() => setPreviewImage(null)}
      className="flex-1 rounded-2xl border border-white/10 bg-white/[0.04] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white/70"
    >
      Retake
    </button>

    <button
      onClick={useCurrentPhoto}
      className="flex-1 rounded-2xl bg-[#880808] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white"
    >
      Use Photo
    </button>

  </div>
) : capturedImages.length < 3 ? (

  <button
    onClick={captureImage}
    disabled={!cameraReady}
    className={`mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl py-[18px] text-sm font-semibold uppercase tracking-[0.06em] ${
      cameraReady
        ? "bg-[#880808] text-white"
        : "border border-white/10 bg-transparent text-white/25"
    }`}
  >
    <Camera size={20} />
    Capture
  </button>

) : null}

{capturedImages.length === 3 &&
  !previewImage && (
    <button
      onClick={startAnalysis}
      className="mt-5 w-full rounded-2xl bg-[#880808] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white"
    >
      Analyze My Face
    </button>
)}

        {/* RETAKE */}
        {step > 0 && (
          <button
            onClick={retakeCurrent}
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