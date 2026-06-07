"use client";

import { useEffect, useRef } from "react";

export default function TestCamera() {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function startCamera() {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: {
              facingMode: "user",
            },
          });

        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;
        }
      } catch (error) {
        console.log(error);
        alert(
          "Camera failed to open"
        );
      }
    }

    startCamera();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-black">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="h-screen w-full object-cover"
      />
    </main>
  );
}