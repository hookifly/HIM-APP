import { Hero } from "@/components/landing/hero";
import { Process } from "@/components/landing/process";
import { CTA } from "@/components/landing/cta";
import mixpanel from "@/lib/mixpanel";
import { useEffect } from "react";

useEffect(() => {
  mixpanel.track("Landing Viewed");
}, []);

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <Hero />
      <Process />
      <CTA />
    </main>
  );
}