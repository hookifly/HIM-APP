import { Hero } from "@/components/landing/hero";
import { Process } from "@/components/landing/process";
import { CTA } from "@/components/landing/cta";
import LandingTracker from "@/components/analytics/landing-tracker";

export default function HomePage() {
  return (
    <main className="bg-black text-white">
      <LandingTracker />
      <Hero />
      <Process />
      <CTA />
    </main>
  );
}