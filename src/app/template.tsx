"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useCapabilities } from "@/hooks/useCapabilities";

gsap.registerPlugin(useGSAP);

export default function Template({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reduced } = useCapabilities();

  useGSAP(
    () => {
      if (reduced || !containerRef.current) return;

      gsap.fromTo(
        containerRef.current,
        {
          opacity: 0,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          ease: "power2.out",
        }
      );
    },
    { scope: containerRef, dependencies: [reduced] }
  );

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  );
}
