// "use client";

// import Image from "next/image";

// import { ArrowLeft, Check } from "lucide-react";

// import { useRouter } from "next/navigation";

// export default function InstructionsPage() {
//   const router = useRouter();

//   return (
//     <main className="min-h-screen bg-black px-4 py-6 text-white">
//       <div className="mx-auto max-w-sm">
//         {/* Header */}
//         <div className="mb-8 flex items-center">
//           <button
//             onClick={() =>
//               router.back()
//             }
//             className="mr-4"
//           >
//             <ArrowLeft size={30} />
//           </button>

//           <h1 className="flex-1 text-center text-3xl font-bold">
//             Instructions
//           </h1>
//         </div>

//         {/* DO SECTION */}
//         <div className="rounded-[30px] bg-zinc-900 p-5">
//           <h2 className="mb-5 text-4xl font-bold text-green-400">
//             Do’s
//           </h2>

//           {/* Images */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="relative h-52 overflow-hidden rounded-2xl border border-white/30">
//               <Image
//                 src="/yes1.jpg"
//                 alt="Good example"
//                 fill
//                 className="object-cover object-[center_15%]"
//               />
//             </div>

//             <div className="relative h-52 overflow-hidden rounded-2xl border border-white/30">
//               <Image
//                 src="/yes2.jpg"
//                 alt="Good example"
//                 fill
//                 className="object-cover object-[center_15%]"
//               />
//             </div>
//           </div>

//           {/* Points */}
//           <div className="mt-6 space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400">
//                 <Check
//                   size={16}
//                   className="text-black"
//                 />
//               </div>

//               <p className="text-xl">
//                 Raw image, no editing
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400">
//                 <Check
//                   size={16}
//                   className="text-black"
//                 />
//               </div>

//               <p className="text-xl">
//                 Clear high resolution image
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400">
//                 <Check
//                   size={16}
//                   className="text-black"
//                 />
//               </div>

//               <p className="text-xl">
//                 Selfie taken at arms length
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* DON'T SECTION */}
//         <div className="mt-6 rounded-[30px] bg-zinc-900 p-5">
//           <h2 className="mb-5 text-4xl font-bold text-red-500">
//             Don’ts
//           </h2>

//           {/* Images */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="relative h-52 overflow-hidden rounded-2xl border border-white/30">
//               <Image
//                 src="/no1.jpg"
//                 alt="Bad example"
//                 fill
//                 className="object-cover object-center"
//               />
//             </div>

//             <div className="relative h-52 overflow-hidden rounded-2xl border border-white/30">
//               <Image
//                 src="/no2.jpg"
//                 alt="Bad example"
//                 fill
//                 className="object-cover object-center"
//               />
//             </div>
//           </div>

//           {/* Points */}
//           <div className="mt-6 space-y-4">
//             <div className="flex items-center gap-3">
//               <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
//                 <Check
//                   size={16}
//                   className="text-black"
//                 />
//               </div>

//               <p className="text-xl">
//                 Filters or edited photos
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
//                 <Check
//                   size={16}
//                   className="text-black"
//                 />
//               </div>

//               <p className="text-xl">
//                 Low light or blurry images
//               </p>
//             </div>

//             <div className="flex items-center gap-3">
//               <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
//                 <Check
//                   size={16}
//                   className="text-black"
//                 />
//               </div>

//               <p className="text-xl">
//                 Hidden face angles
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Continue */}
//         <button
//           onClick={() =>
//             router.push("/upload")
//           }
//           className="mt-8 w-full rounded-full bg-blue-700 py-5 text-2xl font-bold"
//         >
//           Continue
//         </button>
//       </div>
//     </main>
//   );
// }

"use client";

import Image from "next/image";

import { ArrowLeft, Check } from "lucide-react";

import { useRouter } from "next/navigation";

export default function InstructionsPage() {
  const router = useRouter();

  const gridGreen = {
    backgroundImage:
      "linear-gradient(rgba(94,224,121,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(94,224,121,0.04) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
  };

  const gridRed = {
    backgroundImage:
      "linear-gradient(rgba(166,8,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(166,8,0,0.05) 1px, transparent 1px)",
    backgroundSize: "32px 32px",
  };

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-sm">
        {/* Header */}
        <div className="mb-6 flex items-center gap-3.5">
          <button
            onClick={() =>
              router.back()
            }
            className="flex h-11 w-11 flex-shrink-0 items-center justify-center border border-white/10 bg-white/[0.02]"
          >
            <ArrowLeft size={20} />
          </button>

          <h1
            className="flex-1 text-center font-black uppercase tracking-[0.15em] text-white"
            style={{ fontSize: "26px", fontFamily: "'Barlow Condensed', sans-serif" }}>
            Instructions
          </h1>

          <div className="h-11 w-11 flex-shrink-0" />
        </div>

        {/* DO SECTION */}
        <div className="relative overflow-hidden border border-white/8 bg-black p-5">
          <div className="pointer-events-none absolute inset-0" style={gridGreen} />
          <div className="absolute right-0 top-0 h-9 w-9 border-r border-t border-[#5EE079]/35" />

          <div className="relative z-[2] mb-4.5 flex items-center gap-2.5">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/25">01</span>
            <h2
              className="font-black"
              style={{ fontSize: "34px", lineHeight: "1", letterSpacing: "0.02em", color: "#5EE079", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Do's
            </h2>
          </div>

          {/* Images */}
          <div className="relative z-[2] grid grid-cols-2 gap-2.5">
            <div className="relative h-40 overflow-hidden border border-[#5EE079]/25">
              <Image
                src="/yes1.jpg"
                alt="Good example"
                fill
                className="object-cover object-[center_15%]"
              />
              <div className="absolute right-1.5 top-1.5 h-3.5 w-3.5 border-r border-t border-[#5EE079]/50" />
            </div>

            <div className="relative h-40 overflow-hidden border border-[#5EE079]/25">
              <Image
                src="/yes2.jpg"
                alt="Good example"
                fill
                className="object-cover object-[center_15%]"
              />
              <div className="absolute right-1.5 top-1.5 h-3.5 w-3.5 border-r border-t border-[#5EE079]/50" />
            </div>
          </div>

          {/* Points */}
          <div className="relative z-[2] mt-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center bg-[#5EE079]"
                style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}>
                <Check
                  size={14}
                  className="text-[#04342C]"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[17px] font-medium text-white/70">
                Raw image, no editing
              </p>
            </div>

            <div className="flex items-center gap-3.5">
              <div
                className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center bg-[#5EE079]"
                style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}>
                <Check
                  size={14}
                  className="text-[#04342C]"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[17px] font-medium text-white/70">
                Clear high resolution image
              </p>
            </div>

            <div className="flex items-center gap-3.5">
              <div
                className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center bg-[#5EE079]"
                style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}>
                <Check
                  size={14}
                  className="text-[#04342C]"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[17px] font-medium text-white/70">
                Selfie taken at arms length
              </p>
            </div>
          </div>
        </div>

        {/* DON'T SECTION */}
        <div className="relative mt-3.5 overflow-hidden border border-white/8 bg-black p-5">
          <div className="pointer-events-none absolute inset-0" style={gridRed} />
          <div className="absolute right-0 top-0 h-9 w-9 border-r border-t border-[#A60800]/35" />

          <div className="relative z-[2] mb-4.5 flex items-center gap-2.5">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-white/25">02</span>
            <h2
              className="font-black text-[#A60800]"
              style={{ fontSize: "34px", lineHeight: "1", letterSpacing: "0.02em", fontFamily: "'Barlow Condensed', sans-serif" }}>
              Don'ts
            </h2>
          </div>

          {/* Images */}
          <div className="relative z-[2] grid grid-cols-2 gap-2.5">
            <div className="relative h-40 overflow-hidden border border-[#A60800]/30">
              <Image
                src="/no1.jpg"
                alt="Bad example"
                fill
                className="object-cover object-center"
              />
              <div className="absolute right-1.5 top-1.5 h-3.5 w-3.5 border-r border-t border-[#A60800]/50" />
            </div>

            <div className="relative h-40 overflow-hidden border border-[#A60800]/30">
              <Image
                src="/no2.jpg"
                alt="Bad example"
                fill
                className="object-cover object-center"
              />
              <div className="absolute right-1.5 top-1.5 h-3.5 w-3.5 border-r border-t border-[#A60800]/50" />
            </div>
          </div>

          {/* Points */}
          <div className="relative z-[2] mt-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5">
              <div
                className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center bg-[#A60800]"
                style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}>
                <Check
                  size={14}
                  className="text-white"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[17px] font-medium text-white/70">
                Filters or edited photos
              </p>
            </div>

            <div className="flex items-center gap-3.5">
              <div
                className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center bg-[#A60800]"
                style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}>
                <Check
                  size={14}
                  className="text-white"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[17px] font-medium text-white/70">
                Low light or blurry images
              </p>
            </div>

            <div className="flex items-center gap-3.5">
              <div
                className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center bg-[#A60800]"
                style={{ clipPath: "polygon(50% 0, 100% 50%, 50% 100%, 0 50%)" }}>
                <Check
                  size={14}
                  className="text-white"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[17px] font-medium text-white/70">
                Hidden face angles
              </p>
            </div>
          </div>
        </div>

        {/* Continue */}
        <button
          onClick={() =>
            router.push("/upload")
          }
          className="mt-6 w-full bg-[#A60800] py-[18px] text-base font-black uppercase tracking-[0.25em] text-white"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
          }}
        >
          Continue
        </button>
      </div>
    </main>
  );
}