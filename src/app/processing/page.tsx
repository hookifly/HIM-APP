"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { useScanStore } from "@/stores/scanstore";

import { useAuth } from "@/context/auth-context";

import { db } from "@/lib/firebase";

import Image from "next/image";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import mixpanel from "@/lib/mixpanel";

export default function ProcessingPage() {
  const router = useRouter();

  const { user, isAdmin } =
    useAuth();

  const {
    files,
    setAnalysis,
    setImageUrls,
  } = useScanStore();

  const [frontImage, setFrontImage] =
  useState<string | null>(null);

useEffect(() => {
  if (!files[0]) return;

  const url =
    URL.createObjectURL(files[0]);

  setFrontImage(url);

  return () => {
    URL.revokeObjectURL(url);
  };
}, [files]);

  const startedRef =
    useRef(false);

  const [message, setMessage] =
    useState(
      "Our AI is analyzing your facial structure, symmetry, masculinity, skin quality, hairstyle compatibility, and overall attractiveness."
    );

  useEffect(() => {
    if (
      startedRef.current
    )
      return;

    startedRef.current =
      true;

    async function processScan() {
      console.log(
        "PROCESS SCAN STARTED"
      );

      if (!user) {
         return;
        }

      if (files.length !== 3) {
            router.replace("/upload");
        return;
       }

      const controller =
        new AbortController();

        let requestFinished = false;

      const timeoutId =
        setTimeout(() => {
      if (!requestFinished) {
         controller.abort();
       }
      }, 60000);

      const fifteenSecondTimer =
        setTimeout(() => {
          setMessage(
            "Analysis is taking longer than usual due to high demand. Just few more seconds, do not refresh."
          );
        }, 20000);

      try {
        const formData =
          new FormData();

        files.forEach(
          (file) => {
            formData.append(
              "images",
              file
            );
          }
        );

        const uploadFormData =
  new FormData();

files.forEach((file) => {
  uploadFormData.append(
    "images",
    file
  );
});

const uploadResponse =
  await fetch(
    "/api/upload-images",
    {
      method: "POST",
      body: uploadFormData,
    }
  );

const uploadData =
  await uploadResponse.json();

if (!uploadData.success) {
  throw new Error(
    "Image upload failed"
  );
}

const imageUrls =
  uploadData.imageUrls;

  setImageUrls(imageUrls);

        const response =
          await fetch(
            "/api/analyze-face",
            {
              method:
                "POST",
              body: formData,
              signal:
                controller.signal,
            }
          );

          requestFinished = true;

        clearTimeout(
          timeoutId
        );

        clearTimeout(
          fifteenSecondTimer
        );

        const data =
          await response.json();

        console.log(
          "API RESPONSE:",
          data
        );

        if (!data.success) {
           router.replace("/upload?error=service_unavailable");

          return;
         }

        setAnalysis(
          data.analysis
        );

        mixpanel.track("Analysis Completed", {
           current_score: data.analysis.currentScore,
           potential_score: data.analysis.potentialScore,
           archetype: data.analysis.archetype,
         });

        if (user) {
            await setDoc(
        doc(db, "users", user.uid),
    {
      analysis: data.analysis,

      imageUrls,

      hasScanned: true,

      updatedAt: Date.now(),
    },
    {
      merge: true,
    }
  );
}

router.replace("/results");

      } catch (error: any) {
        requestFinished = true;

        console.error(
          "Analysis Error:",
          error
        );

        clearTimeout(
          timeoutId
        );

        clearTimeout(
          fifteenSecondTimer
        );

        if (error?.name === "AbortError") {
             router.replace("/upload?error=timeout");
           } else {
         router.replace("/upload?error=service_unavailable");
       }
      }
    }

    processScan();
  }, [
    files,
    router,
    setAnalysis,
    user,
  ]);

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black px-6 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>

      {/* Ambient dual-tone moving glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute h-[420px] w-[420px] rounded-full opacity-70 blur-3xl animate-glow-blob-a"
          style={{ background: "radial-gradient(circle, #880808 0%, transparent 70%)" }}
        />
        <div
          className="absolute h-[420px] w-[420px] rounded-full opacity-70 blur-3xl animate-glow-blob-b"
          style={{ background: "radial-gradient(circle, #09008B 0%, transparent 70%)" }}
        />
      </div>

      {/* Face preview */}
      <div className="relative h-[220px] w-[220px] overflow-hidden rounded-full border border-white/10 bg-black">

        {frontImage && (
          <Image
            src={frontImage}
            alt="Face"
            fill
            className="object-cover"
          />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/25" />

        {/* Scan line */}
        <div
          className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8857F] to-transparent opacity-80 animate-processing-scan"
          style={{
            boxShadow:
              "0 0 14px rgba(232,133,127,0.7)",
          }}
        />

      </div>

      {/* Status indicator */}
      <div className="relative z-[2] mt-8 flex items-center gap-2.5">
        <div className="h-[7px] w-[7px] rounded-full bg-[#E8857F] animate-processing-pulse" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#E8857F]" style={{ fontFamily: "Inter, sans-serif" }}>
          Processing
        </span>
      </div>

      <h1
        className="relative z-[2] mt-3.5 text-center font-bold uppercase leading-[1]"
        style={{ fontSize: "38px", letterSpacing: "0.02em" }}>
        Analyzing Face
      </h1>

      {/* Indeterminate progress bar */}
      <div className="relative z-[2] mt-6 h-[3px] w-full max-w-[240px] overflow-hidden rounded-full bg-white/6">
        <div className="h-full w-[35%] rounded-full bg-[#880808] animate-processing-sweep" />
      </div>

      <p className="relative z-[2] mt-6 max-w-sm text-center text-[13px] leading-relaxed text-white/40" style={{ fontFamily: "Inter, sans-serif" }}>
        {message}
      </p>
    </main>
  );
}