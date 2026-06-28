"use client";

import { useEffect } from "react";
import mixpanel from "@/lib/mixpanel";

export default function InstructionsTracker() {
  useEffect(() => {
    mixpanel.track("Instructions Viewed");
  }, []);

  return null;
}