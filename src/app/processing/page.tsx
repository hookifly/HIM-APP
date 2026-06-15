// "use client";

// import {
//   useEffect,
//   useRef,
//   useState,
// } from "react";

// import { useRouter } from "next/navigation";

// import { LoaderCircle } from "lucide-react";

// import { useScanStore } from "@/stores/scanstore";

// import { useAuth } from "@/context/auth-context";

// import { db } from "@/lib/firebase";

// import {
//   doc,
//   setDoc,
// } from "firebase/firestore";

// export default function ProcessingPage() {
//   const router = useRouter();

//   const { user } =
//     useAuth();

//   const {
//     files,
//     setAnalysis,
//   } = useScanStore();

//   const startedRef =
//     useRef(false);

//   const [message, setMessage] =
//     useState(
//       "Our AI is analyzing your facial structure, symmetry, masculinity, skin quality, hairstyle compatibility, and overall attractiveness."
//     );

//   useEffect(() => {
//     if (
//       startedRef.current
//     )
//       return;

//     startedRef.current =
//       true;

//     async function processScan() {
//       console.log(
//         "PROCESS SCAN STARTED"
//       );

//       if (
//         files.length !== 3
//       ) {
//         alert(
//           "Images missing. Please scan again."
//         );

//         router.push(
//           "/upload"
//         );

//         return;
//       }

//       const controller =
//         new AbortController();

//       const timeoutId =
//         setTimeout(() => {
//           controller.abort();
//         }, 30000);

//       const fifteenSecondTimer =
//         setTimeout(() => {
//           setMessage(
//             "Analysis is taking longer than usual due to high demand. Please wait a few more seconds..."
//           );
//         }, 15000);

//       try {
//         const formData =
//           new FormData();

//         files.forEach(
//           (file) => {
//             formData.append(
//               "images",
//               file
//             );
//           }
//         );

//         const uploadFormData =
//   new FormData();

// files.forEach((file) => {
//   uploadFormData.append(
//     "images",
//     file
//   );
// });

// const uploadResponse =
//   await fetch(
//     "/api/upload-images",
//     {
//       method: "POST",
//       body: uploadFormData,
//     }
//   );

// const uploadData =
//   await uploadResponse.json();

// if (!uploadData.success) {
//   throw new Error(
//     "Image upload failed"
//   );
// }

// const imageUrls =
//   uploadData.imageUrls;

//         const response =
//           await fetch(
//             "/api/analyze-face",
//             {
//               method:
//                 "POST",
//               body: formData,
//               signal:
//                 controller.signal,
//             }
//           );

//         clearTimeout(
//           timeoutId
//         );

//         clearTimeout(
//           fifteenSecondTimer
//         );

//         const data =
//           await response.json();

//         console.log(
//           "API RESPONSE:",
//           data
//         );

//         if (
//           !data.success
//         ) {
//           alert(
//             data.error ||
//               "Face analysis is temporarily busy. Please try again in a few moments."
//           );

//           router.push(
//             "/upload"
//           );

//           return;
//         }

//         setAnalysis(
//           data.analysis
//         );

//         if (user) {
//   await setDoc(
//     doc(db, "users", user.uid),
//     {
//       analysis: data.analysis,

//       imageUrls,

//       hasScanned: true,

//       updatedAt: Date.now(),
//     },
//     {
//       merge: true,
//     }
//   );
// }

//         router.replace("/dashboard");
//       } catch (error: any) {
//         console.error(
//           "Analysis Error:",
//           error
//         );

//         clearTimeout(
//           timeoutId
//         );

//         clearTimeout(
//           fifteenSecondTimer
//         );

//         if (
//           error?.name ===
//           "AbortError"
//         ) {
//           alert(
//             "Face analysis is taking too long right now due to high demand. Please try again in a few moments."
//           );
//         } else {
//           alert(
//             "Face analysis is temporarily busy. Please try again in a few moments."
//           );
//         }

//         router.push(
//           "/upload"
//         );
//       }
//     }

//     processScan();
//   }, [
//     files,
//     router,
//     setAnalysis,
//     user,
//   ]);

//   return (
//     <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-white">
//       <LoaderCircle
//         size={90}
//         className="animate-spin text-blue-600"
//       />

//       <h1 className="mt-10 text-4xl font-bold">
//         Analyzing Face
//       </h1>

//       <p className="mt-4 max-w-sm text-center text-lg leading-relaxed text-white/60">
//         {message}
//       </p>
//     </main>
//   );
// }

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

      {/* Scan reticle */}
      <div className="relative h-[180px] w-[180px] overflow-hidden border border-[#A60800]/30 bg-[#0a0a0a]">

        {/* Grid texture */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(166,8,0,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(166,8,0,0.07) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Animated scan line */}
        <div
          className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#A60800] to-transparent opacity-70 animate-processing-scan"
          style={{ boxShadow: "0 0 12px rgba(166,8,0,0.6)" }}
        />

        {/* Corner brackets */}
        <div className="absolute left-[-1px] top-[-1px] h-5 w-5 border-l-[1.5px] border-t-[1.5px] border-[#A60800]" />
        <div className="absolute right-[-1px] top-[-1px] h-5 w-5 border-r-[1.5px] border-t-[1.5px] border-[#A60800]" />
        <div className="absolute bottom-[-1px] left-[-1px] h-5 w-5 border-b-[1.5px] border-l-[1.5px] border-[#A60800]" />
        <div className="absolute bottom-[-1px] right-[-1px] h-5 w-5 border-b-[1.5px] border-r-[1.5px] border-[#A60800]" />

        {/* Centered face glyph */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.2">
            <circle cx="12" cy="12" r="9" />
            <circle cx="9" cy="10" r="0.6" fill="#fff" />
            <circle cx="15" cy="10" r="0.6" fill="#fff" />
            <path d="M9 15c1 1 5 1 6 0" />
          </svg>
        </div>

      </div>

      {/* Status indicator */}
      <div className="mt-8 flex items-center gap-2.5">
        <div className="h-[7px] w-[7px] rounded-full bg-[#A60800] animate-processing-pulse" />
        <span className="text-[11px] font-black uppercase tracking-[0.35em] text-[#A60800]">
          Processing
        </span>
      </div>

      <h1
        className="mt-3.5 text-center font-black uppercase leading-[1]"
        style={{ fontSize: "42px", letterSpacing: "0.04em", fontFamily: "'Barlow Condensed', sans-serif" }}>
        Analyzing Face
      </h1>

      {/* Indeterminate progress bar */}
      <div className="mt-6 h-[3px] w-full max-w-[240px] overflow-hidden bg-white/6">
        <div className="h-full w-[35%] bg-[#A60800] animate-processing-sweep" />
      </div>

      <p className="mt-6 max-w-sm text-center text-[13px] leading-relaxed text-white/40">
        {message}
      </p>
    </main>
  );
}