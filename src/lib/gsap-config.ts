"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Respect prefers-reduced-motion: speed up all GSAP animations
// to effectively instant (avoids stuck opacity:0 elements)
if (
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches
) {
  gsap.globalTimeline.timeScale(20);
}

export { gsap, ScrollTrigger };
