"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCapabilities } from "@/hooks/useCapabilities";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollThread() {
  const barRef = useRef<HTMLDivElement>(null);
  const { reduced } = useCapabilities();

  useEffect(() => {
    if (reduced || !barRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          if (barRef.current) {
            barRef.current.style.transform = `scaleY(${self.progress})`;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [reduced]);

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 w-[2px] h-full pointer-events-none z-45 bg-[var(--W15)]"
    >
      <div
        ref={barRef}
        className="w-full h-full bg-[var(--R)] origin-top transition-transform duration-75 ease-out"
        style={{ transform: "scaleY(0)" }}
      />
    </div>
  );
}
