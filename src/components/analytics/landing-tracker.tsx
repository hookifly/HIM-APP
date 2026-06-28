"use client";

import { useEffect } from "react";
import mixpanel from "@/lib/mixpanel";

export default function LandingTracker() {
  useEffect(() => {
    mixpanel.track("Landing Viewed");
  }, []);

  return null;
}