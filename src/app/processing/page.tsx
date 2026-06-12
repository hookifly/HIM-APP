"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import { LoaderCircle } from "lucide-react";

import { useScanStore } from "@/stores/scanstore";

import { useAuth } from "@/context/auth-context";

import { db } from "@/lib/firebase";

import {
  doc,
  setDoc,
} from "firebase/firestore";

export default function ProcessingPage() {
  const router = useRouter();

  const { user } =
    useAuth();

  const {
    files,
    setAnalysis,
  } = useScanStore();

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

      if (
        files.length !== 3
      ) {
        alert(
          "Images missing. Please scan again."
        );

        router.push(
          "/upload"
        );

        return;
      }

      const controller =
        new AbortController();

      const timeoutId =
        setTimeout(() => {
          controller.abort();
        }, 30000);

      const fifteenSecondTimer =
        setTimeout(() => {
          setMessage(
            "Analysis is taking longer than usual due to high demand. Please wait a few more seconds..."
          );
        }, 15000);

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

        if (
          !data.success
        ) {
          alert(
            data.error ||
              "Face analysis is temporarily busy. Please try again in a few moments."
          );

          router.push(
            "/upload"
          );

          return;
        }

        setAnalysis(
          data.analysis
        );

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

        router.replace("/dashboard");
      } catch (error: any) {
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

        if (
          error?.name ===
          "AbortError"
        ) {
          alert(
            "Face analysis is taking too long right now due to high demand. Please try again in a few moments."
          );
        } else {
          alert(
            "Face analysis is temporarily busy. Please try again in a few moments."
          );
        }

        router.push(
          "/upload"
        );
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
      <LoaderCircle
        size={90}
        className="animate-spin text-blue-600"
      />

      <h1 className="mt-10 text-4xl font-bold">
        Analyzing Face
      </h1>

      <p className="mt-4 max-w-sm text-center text-lg leading-relaxed text-white/60">
        {message}
      </p>
    </main>
  );
}