"use client";

import Image from "next/image";

import { ArrowLeft, Check } from "lucide-react";

import { useRouter } from "next/navigation";

export default function InstructionsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white" style={{ fontFamily: "'Oswald', sans-serif" }}>
      <div className="mx-auto max-w-sm">
        {/* Header */}
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
            className="flex-1 text-center font-semibold uppercase tracking-[0.08em] text-white"
            style={{ fontSize: "22px" }}>
            Instructions
          </h1>

          <div className="h-11 w-11 flex-shrink-0" />
        </div>

        {/* DO SECTION */}
        <div
          className="relative overflow-hidden rounded-3xl p-5"
          style={{ background: "linear-gradient(160deg, #0A2C47 0%, #050D14 75%)" }}>

          <div className="mb-4.5 flex items-center gap-2.5">
            <h2 className="font-bold" style={{ fontSize: "28px", lineHeight: "1", color: "#5EE079" }}>
              Do's
            </h2>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative h-40 overflow-hidden rounded-2xl border border-[#5EE079]/20">
              <Image
                src="/yes1.jpg"
                alt="Good example"
                fill
                className="object-cover object-[center_15%]"
              />
            </div>

            <div className="relative h-40 overflow-hidden rounded-2xl border border-[#5EE079]/20">
              <Image
                src="/yes2.jpg"
                alt="Good example"
                fill
                className="object-cover object-[center_15%]"
              />
            </div>
          </div>

          {/* Points */}
          <div className="mt-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#5EE079]">
                <Check
                  size={14}
                  className="text-[#04342C]"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[15px] font-medium text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
                Raw image, no editing
              </p>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#5EE079]">
                <Check
                  size={14}
                  className="text-[#04342C]"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[15px] font-medium text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
                Clear high resolution image
              </p>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#5EE079]">
                <Check
                  size={14}
                  className="text-[#04342C]"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[15px] font-medium text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
                Selfie taken at arms length
              </p>
            </div>
          </div>
        </div>

        {/* DON'T SECTION */}
        <div
          className="relative mt-3.5 overflow-hidden rounded-3xl p-5"
          style={{ background: "linear-gradient(160deg, #1A0606 0%, #0D0303 75%)" }}>

          <div className="mb-4.5 flex items-center gap-2.5">
            <h2 className="font-bold text-[#E8857F]" style={{ fontSize: "28px", lineHeight: "1" }}>
              Don'ts
            </h2>
          </div>

          {/* Images */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="relative h-40 overflow-hidden rounded-2xl border border-[#880808]/25">
              <Image
                src="/no1.jpg"
                alt="Bad example"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="relative h-40 overflow-hidden rounded-2xl border border-[#880808]/25">
              <Image
                src="/no2.jpg"
                alt="Bad example"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Points */}
          <div className="mt-5 flex flex-col gap-3.5">
            <div className="flex items-center gap-3.5">
              <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#880808]">
                <Check
                  size={14}
                  className="text-white"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[15px] font-medium text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
                Filters or edited photos
              </p>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#880808]">
                <Check
                  size={14}
                  className="text-white"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[15px] font-medium text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
                Low light or blurry images
              </p>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="flex h-[30px] w-[30px] flex-shrink-0 items-center justify-center rounded-full bg-[#880808]">
                <Check
                  size={14}
                  className="text-white"
                  strokeWidth={3}
                />
              </div>

              <p className="text-[15px] font-medium text-white/70" style={{ fontFamily: "Inter, sans-serif" }}>
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
          className="mt-6 w-full rounded-2xl bg-[#880808] py-[18px] text-sm font-semibold uppercase tracking-[0.06em] text-white"
        >
          Continue
        </button>
      </div>
    </main>
  );
}