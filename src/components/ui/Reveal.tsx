"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useCapabilities } from "@/hooks/useCapabilities";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger, useGSAP);

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  as?: React.ElementType;
}

export default function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.9,
  as: Component = "div",
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const { reduced } = useCapabilities();

  useGSAP(
    () => {
      if (reduced || !innerRef.current || !containerRef.current) return;

      gsap.fromTo(
        innerRef.current,
        {
          yPercent: 105,
          opacity: 0,
        },
        {
          yPercent: 0,
          opacity: 1,
          duration,
          delay,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
            once: true,
          },
        }
      );
    },
    { scope: containerRef, dependencies: [reduced, delay, duration] }
  );

  if (reduced) {
    return <Component className={className}>{children}</Component>;
  }

  return (
    <Component
      ref={containerRef}
      className={cn("overflow-hidden block", className)}
    >
      <div ref={innerRef} className="will-change-transform">
        {children}
      </div>
    </Component>
  );
}
