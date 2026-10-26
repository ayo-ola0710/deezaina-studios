"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useCapabilities } from "@/hooks/useCapabilities";

interface MagneticProps {
  children: React.ReactNode;
  strength?: number; // default 0.25
  radius?: number; // active distance radius in px (default 80)
  className?: string;
}

export default function Magnetic({
  children,
  strength = 0.25,
  radius = 80,
  className = "",
}: MagneticProps) {
  const magneticRef = useRef<HTMLDivElement>(null);
  const { canCursor, reduced } = useCapabilities();

  useEffect(() => {
    if (!canCursor || reduced || !magneticRef.current) return;

    const el = magneticRef.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.3, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.3, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);

      if (dist < radius) {
        const deltaX = (e.clientX - centerX) * strength;
        const deltaY = (e.clientY - centerY) * strength;
        xTo(deltaX);
        yTo(deltaY);
      } else {
        xTo(0);
        yTo(0);
      }
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    window.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      gsap.set(el, { x: 0, y: 0 });
    };
  }, [canCursor, reduced, strength, radius]);

  return (
    <div ref={magneticRef} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
