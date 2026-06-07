"use client";

import Image from "next/image";

import { ArrowLeft, Check } from "lucide-react";

import { useRouter } from "next/navigation";

export default function InstructionsPage() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-black px-4 py-6 text-white">
      <div className="mx-auto max-w-sm">
        {/* Header */}
        <div className="mb-8 flex items-center">
          <button
            onClick={() =>
              router.back()
            }
            className="mr-4"
          >
            <ArrowLeft size={30} />
          </button>

          <h1 className="flex-1 text-center text-3xl font-bold">
            Instructions
          </h1>
        </div>

        {/* DO SECTION */}
        <div className="rounded-[30px] bg-zinc-900 p-5">
          <h2 className="mb-5 text-4xl font-bold text-green-400">
            Do’s
          </h2>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-52 overflow-hidden rounded-2xl border border-white/30">
              <Image
                src="/yes1.jpg"
                alt="Good example"
                fill
                className="object-cover object-[center_15%]"
              />
            </div>

            <div className="relative h-52 overflow-hidden rounded-2xl border border-white/30">
              <Image
                src="/yes2.jpg"
                alt="Good example"
                fill
                className="object-cover object-[center_15%]"
              />
            </div>
          </div>

          {/* Points */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400">
                <Check
                  size={16}
                  className="text-black"
                />
              </div>

              <p className="text-xl">
                Raw image, no editing
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400">
                <Check
                  size={16}
                  className="text-black"
                />
              </div>

              <p className="text-xl">
                Clear high resolution image
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-400">
                <Check
                  size={16}
                  className="text-black"
                />
              </div>

              <p className="text-xl">
                Selfie taken at arms length
              </p>
            </div>
          </div>
        </div>

        {/* DON'T SECTION */}
        <div className="mt-6 rounded-[30px] bg-zinc-900 p-5">
          <h2 className="mb-5 text-4xl font-bold text-red-500">
            Don’ts
          </h2>

          {/* Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative h-52 overflow-hidden rounded-2xl border border-white/30">
              <Image
                src="/no1.jpg"
                alt="Bad example"
                fill
                className="object-cover object-center"
              />
            </div>

            <div className="relative h-52 overflow-hidden rounded-2xl border border-white/30">
              <Image
                src="/no2.jpg"
                alt="Bad example"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>

          {/* Points */}
          <div className="mt-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
                <Check
                  size={16}
                  className="text-black"
                />
              </div>

              <p className="text-xl">
                Filters or edited photos
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
                <Check
                  size={16}
                  className="text-black"
                />
              </div>

              <p className="text-xl">
                Low light or blurry images
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-red-500">
                <Check
                  size={16}
                  className="text-black"
                />
              </div>

              <p className="text-xl">
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
          className="mt-8 w-full rounded-full bg-blue-700 py-5 text-2xl font-bold"
        >
          Continue
        </button>
      </div>
    </main>
  );
}