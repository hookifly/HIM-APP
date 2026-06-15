// "use client";

// import { useEffect, useState } from "react";

// import { useRouter } from "next/navigation";

// import { useAuth } from "@/context/auth-context";

// import { useScanStore } from "@/stores/scanstore";

// import Image from "next/image";

// export default function DashboardPage() {
//   const router = useRouter();

//   const { user, loading } =
//     useAuth();

//   const { analysis, imageUrls } =
//     useScanStore();

//   const [activeTab, setActiveTab] =
//   useState<"scan" | "insights">(
//     analysis ? "insights" : "scan"
//   );

// useEffect(() => {
//   if (analysis) {
//     setActiveTab("insights");
//   }
// }, [analysis]);

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/signin");
//     }
//   }, [
//     user,
//     loading,
//     router,
//   ]);

//   if (loading || !user) {
//     return (
//       <main className="flex min-h-screen items-center justify-center bg-black">
//         <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
//       </main>
//     );
//   }

//   return (
//     <main className="min-h-screen bg-black px-4 py-6 text-white">
//       <div className="mx-auto max-w-sm">

//         {/* TABS */}
//         <div className="flex rounded-full bg-zinc-900 p-1">

//           <button
//             onClick={() =>
//               setActiveTab("scan")
//             }
//             className={`flex-1 rounded-full py-4 text-2xl font-bold transition-all ${
//               activeTab === "scan"
//                 ? "bg-[#A60800] text-white"
//                 : "text-white/70"
//             }`}
//           >
//             Scan
//           </button>

//           <button
//             onClick={() =>
//               setActiveTab(
//                 "insights"
//               )
//             }
//             className={`flex-1 rounded-full py-4 text-2xl font-bold transition-all ${
//               activeTab ===
//               "insights"
//                 ? "bg-[#090040] text-white"
//                 : "text-white/70"
//             }`}
//           >
//             Insights
//           </button>

//         </div>

//         {/* SCAN TAB */}
//         {activeTab === "scan" ? (
//           <div className="mt-6 overflow-hidden rounded-[32px] border border-red-900 bg-zinc-950">

//             <div className="relative h-[560px] w-full">

//               <Image
//                 src="/main.jpg"
//                 alt="Model"
//                 fill
//                 className="object-cover object-top"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

//               <div className="absolute bottom-8 left-0 right-0 px-5 text-center">

//                 {analysis ? (
//   <>
//     <h2 className="text-4xl italic leading-tight text-white">
//       Face Already Analyzed
//     </h2>

//     <p className="mt-4 text-lg text-white/60">
//       Your masculinity report has been generated.
//       Continue following your improvement plan.
//     </p>

//     <button
//       onClick={() =>
//         setActiveTab("insights")
//       }
//       className="mt-8 w-full rounded-xl bg-[#A60800] py-5 text-xl font-black uppercase tracking-widest"
//     >
//       View Insights
//     </button>
//   </>
// ) : (
//   <>
//     <h2 className="text-4xl italic leading-tight text-white">
//       Get Ratings and Recommendations To Become Him
//     </h2>

//     <button
//       onClick={() =>
//         router.push("/instructions")
//       }
//       className="mt-8 w-full rounded-xl bg-[#A60800] py-5 text-xl font-black uppercase tracking-widest"
//     >
//       Begin Scan
//     </button>
//   </>
// )}

//               </div>

//             </div>

//           </div>
//         ) : (
//           <div className="mt-6 flex h-[640px] flex-col justify-between rounded-[32px] border border-white/10 bg-black p-5">

//             <div className="flex flex-1 items-center justify-center">

//   {analysis ? (
//     <div className="w-full text-center">

//       <h2 className="text-3xl font-bold">
//         Face Analyzed
//       </h2>

//       <div className="mt-8 rounded-3xl bg-zinc-950 p-6">

//         <p className="text-white/50">
//           Current Score
//         </p>

//         <h3 className="mt-2 text-5xl font-bold">
//           {analysis.currentScore}
//         </h3>

//         <p className="mt-6 text-white/50">
//           Archetype
//         </p>

//         <h3 className="mt-2 text-3xl font-bold text-red-500">
//           {analysis.archetype}
//         </h3>

//       </div>

//     </div>
//   ) : (
//     <p className="max-w-xs text-center text-2xl leading-relaxed text-white/30">
//       Insights will appear here after scanning your face
//     </p>
//   )}

// </div>

//             <button
//               onClick={() => {
//   if (analysis) {
//     router.push("/results");
//   } else {
//     setActiveTab("scan");
//   }
// }}
//               className="w-full rounded-xl bg-[#A60800] py-5 text-xl font-black uppercase tracking-widest"
//             >
//               {
// analysis
// ? "Open Full Report"
// : "Become Him"
// }
//             </button>

//           </div>
//         )}

//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { useAuth } from "@/context/auth-context";

import { useScanStore } from "@/stores/scanstore";

import Image from "next/image";

export default function DashboardPage() {
  const router = useRouter();

  const { user, loading } =
    useAuth();

  const { analysis, imageUrls } =
    useScanStore();

  const [activeTab, setActiveTab] =
  useState<"scan" | "insights">(
    analysis ? "insights" : "scan"
  );

useEffect(() => {
  if (analysis) {
    setActiveTab("insights");
  }
}, [analysis]);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/signin");
    }
  }, [
    user,
    loading,
    router,
  ]);

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#A60800] border-t-transparent" />
      </main>
    );
  }

  const gridBg = {
    backgroundImage:
      "linear-gradient(rgba(166,8,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(166,8,0,0.05) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
  };

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-sm">

        {/* TABS */}
        <div className="flex gap-2">

          <button
            onClick={() =>
              setActiveTab("scan")
            }
            className={`flex-1 py-3.5 text-sm font-black uppercase tracking-[0.25em] transition-all ${
              activeTab === "scan"
                ? "bg-[#A60800] text-white"
                : "border border-white/8 bg-white/[0.02] text-white/35"
            }`}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              clipPath: "polygon(0 0, calc(100% - 10px) 0, 100% 100%, 10px 100%)",
            }}
          >
            <span className="mr-1.5 text-[9px] opacity-50">01</span>Scan
          </button>

          <button
            onClick={() =>
              setActiveTab(
                "insights"
              )
            }
            className={`flex-1 py-3.5 text-sm font-black uppercase tracking-[0.25em] transition-all ${
              activeTab ===
              "insights"
                ? "bg-[#A60800] text-white"
                : "border border-white/8 bg-white/[0.02] text-white/35"
            }`}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              clipPath: "polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)",
            }}
          >
            <span className="mr-1.5 text-[9px] opacity-50">02</span>Insights
          </button>

        </div>

        {/* SCAN TAB */}
        {activeTab === "scan" ? (
          <div className="relative mt-6 overflow-hidden border border-[#A60800]/20 bg-zinc-950">

            <div className="relative h-[560px] w-full">

              <Image
                src="/main.jpg"
                alt="Model"
                fill
                className="object-cover object-top"
              />

              {/* Grid texture */}
              <div className="pointer-events-none absolute inset-0" style={gridBg} />

              {/* Scan line */}
              <div className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A60800] to-transparent opacity-50 animate-scan" />

              {/* Corner brackets */}
              <div className="absolute left-4 top-4 h-6 w-6 border-l border-t border-[#A60800]/50" />
              <div className="absolute right-4 top-4 h-6 w-6 border-r border-t border-[#A60800]/50" />

              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-8 left-0 right-0 px-5 text-center">

                {analysis ? (
  <>
    <h2
      className="font-black leading-[0.95] text-white"
      style={{ fontSize: "34px", fontFamily: "'Barlow Condensed', sans-serif" }}>
      Face Already Analyzed
    </h2>

    <p className="mt-4 text-sm leading-relaxed text-white/50">
      Your masculinity report has been generated.
      Continue following your improvement plan.
    </p>

    <button
      onClick={() =>
        setActiveTab("insights")
      }
      className="mt-8 w-full bg-[#A60800] py-5 text-base font-black uppercase tracking-[0.25em] text-white"
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      }}
    >
      View Insights
    </button>
  </>
) : (
  <>
    <h2
      className="font-black leading-[0.95] text-white"
      style={{ fontSize: "34px", fontFamily: "'Barlow Condensed', sans-serif" }}>
      Get Ratings and Recommendations To Become Him
    </h2>

    <button
      onClick={() =>
        router.push("/instructions")
      }
      className="mt-8 w-full bg-[#A60800] py-5 text-base font-black uppercase tracking-[0.25em] text-white"
      style={{
        fontFamily: "'Barlow Condensed', sans-serif",
        clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
      }}
    >
      Begin Scan
    </button>
  </>
)}

              </div>

            </div>

          </div>
        ) : (
          <div className="relative mt-6 flex h-[640px] flex-col justify-between overflow-hidden border border-white/8 bg-black p-5">

            {/* Grid texture */}
            <div className="pointer-events-none absolute inset-0" style={gridBg} />

            {/* Scan line */}
            <div className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-[#A60800] to-transparent opacity-40 animate-dash-scan" />

            {/* Corner brackets */}
            <div className="absolute right-0 top-0 h-11 w-11 border-r border-t border-[#A60800]/45" />
            <div className="absolute bottom-0 left-0 h-11 w-11 border-b border-l border-[#A60800]/25" />

            <div className="relative z-[2] flex flex-1 items-center justify-center">

  {analysis ? (
    <div className="w-full">

      <div className="mb-6 flex items-center justify-center gap-2.5">
        <div
          className="h-2 w-2 flex-shrink-0 bg-[#A60800]"
          style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}
        />
        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/40">
          Face Analyzed
        </span>
      </div>

      <div className="border border-white/8 bg-white/[0.02] p-6 text-left">

        <p className="text-[10px] uppercase tracking-[0.3em] text-white/25">
          Current Score
        </p>

        <h3
          className="mt-2 font-black text-white"
          style={{ fontSize: "72px", lineHeight: "0.9", letterSpacing: "-2px", fontFamily: "'Barlow Condensed', sans-serif" }}>
          {analysis.currentScore}
        </h3>

        <div className="my-5 h-px bg-white/7" />

        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1.5 text-[10px] uppercase tracking-[0.3em] text-white/25">
              Archetype
            </p>
            <h3
              className="font-black text-[#A60800]"
              style={{ fontSize: "28px", letterSpacing: "0.04em", lineHeight: "1", fontFamily: "'Barlow Condensed', sans-serif" }}>
              {analysis.archetype}
            </h3>
          </div>
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center border border-[#A60800]/30">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A60800" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <circle cx="12" cy="12" r="4" />
              <path d="M12 1v4M12 19v4M1 12h4M19 12h4" />
            </svg>
          </div>
        </div>

      </div>

    </div>
  ) : (
    <div className="w-full border border-white/6 bg-white/[0.015] px-7 py-16 text-center">
      <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-white/10">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="1" />
          <path d="M3 9h18M3 15h18" />
        </svg>
      </div>
      <p className="mx-auto max-w-[220px] text-sm leading-relaxed text-white/25">
        Insights will appear here after scanning your face
      </p>
    </div>
  )}

</div>

            <button
              onClick={() => {
  if (analysis) {
    router.push("/results");
  } else {
    setActiveTab("scan");
  }
}}
              className="relative z-[2] w-full bg-[#A60800] py-5 text-base font-black uppercase tracking-[0.25em] text-white"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
              }}
            >
              {
analysis
? "Open Full Report"
: "Become Him"
}
            </button>

          </div>
        )}

      </div>
    </main>
  );
}