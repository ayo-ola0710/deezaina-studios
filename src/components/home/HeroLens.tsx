"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useCapabilities } from "@/hooks/useCapabilities";

export default function HeroLens() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const cleanLayerRef = useRef<HTMLDivElement>(null);
  const { reduced, canCursor } = useCapabilities();

  useEffect(() => {
    if (reduced || !containerRef.current || !cleanLayerRef.current) return;

    const container = containerRef.current;
    const cleanLayer = cleanLayerRef.current;
    const ring = ringRef.current;

    // Desktop: Track cursor smoothly with gsap.quickTo
    if (canCursor && ring) {
      const setRingX = gsap.quickTo(ring, "x", { duration: 0.25, ease: "power3" });
      const setRingY = gsap.quickTo(ring, "y", { duration: 0.25, ease: "power3" });

      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        cleanLayer.style.setProperty("--x", `${x}px`);
        cleanLayer.style.setProperty("--y", `${y}px`);

        setRingX(x);
        setRingY(y);
        gsap.to(ring, { opacity: 1, duration: 0.2 });
      };

      const handlePointerLeave = () => {
        gsap.to(ring, { opacity: 0, duration: 0.3 });
      };

      // Set initial center
      const initialX = container.offsetWidth / 2;
      const initialY = container.offsetHeight / 2;
      cleanLayer.style.setProperty("--x", `${initialX}px`);
      cleanLayer.style.setProperty("--y", `${initialY}px`);
      gsap.set(ring, { x: initialX, y: initialY, opacity: 0.8 });

      container.addEventListener("pointermove", handlePointerMove);
      container.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        container.removeEventListener("pointermove", handlePointerMove);
        container.removeEventListener("pointerleave", handlePointerLeave);
      };
    } else if (ring) {
      // Touch/Mobile: Ambient auto-drift path
      const driftObj = { x: 120, y: 80 };
      const updateDrift = () => {
        cleanLayer.style.setProperty("--x", `${driftObj.x}px`);
        cleanLayer.style.setProperty("--y", `${driftObj.y}px`);
        gsap.set(ring, { x: driftObj.x, y: driftObj.y, opacity: 0.75 });
      };

      const tl = gsap.timeline({ repeat: -1, yoyo: true });
      tl.to(driftObj, {
        x: () => container.offsetWidth - 120,
        y: () => container.offsetHeight - 60,
        duration: 4.5,
        ease: "sine.inOut",
        onUpdate: updateDrift,
      }).to(driftObj, {
        x: 100,
        y: () => container.offsetHeight / 2,
        duration: 4,
        ease: "sine.inOut",
        onUpdate: updateDrift,
      });

      return () => {
        tl.kill();
      };
    }
  }, [reduced, canCursor]);

  if (reduced) {
    return (
      <h1 className="font-display font-extrabold text-[clamp(2.75rem,7vw,6.2rem)] leading-[0.96] tracking-tight text-[var(--W)]">
        DIAGNOSE BEFORE <br />
        DESIGN.
      </h1>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative select-none cursor-crosshair overflow-visible py-2"
    >
      {/* 01 Bottom Layer: Blurred, chaotic brand friction */}
      <div
        aria-hidden="true"
        className="font-display font-extrabold text-[clamp(2.75rem,7vw,6.2rem)] leading-[0.96] tracking-tight text-[var(--W35)] filter blur-[5px] opacity-60 select-none"
      >
        <span className="inline-block transform -rotate-1 text-[var(--R)] opacity-80">
          DIAGNOSE
        </span>{" "}
        <span className="inline-block font-serif italic text-[var(--W55)]">
          BEFORE
        </span>{" "}
        <br />
        <span className="inline-block tracking-widest text-[var(--W15)]">
          D E S I G N .
        </span>
      </div>

      {/* 02 Top Layer: Clean, sharp headline masked by radial lens */}
      <div
        ref={cleanLayerRef}
        className="absolute inset-0 top-2 font-display font-extrabold text-[clamp(2.75rem,7vw,6.2rem)] leading-[0.96] tracking-tight text-[var(--W)] select-none pointer-events-none"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle 160px at var(--x, 50%) var(--y, 50%), #000 0 65%, transparent 100%)",
          maskImage:
            "radial-gradient(circle 160px at var(--x, 50%) var(--y, 50%), #000 0 65%, transparent 100%)",
        }}
      >
        DIAGNOSE BEFORE <br />
        DESIGN.
      </div>

      {/* 03 Diagnostic Lens Ring with Glow */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="absolute top-0 left-0 w-[320px] h-[320px] -ml-[160px] -mt-[160px] pointer-events-none z-10 opacity-0 transition-opacity duration-300"
        style={{
          borderRadius: "9999px",
          border: "2px solid var(--R)",
          boxShadow: "0 0 50px rgba(230, 21, 21, 0.35)",
        }}
      >
        {/* Subtle Crosshairs */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-4 h-[1px] bg-[var(--R)] opacity-50" />
          <div className="h-4 w-[1px] bg-[var(--R)] opacity-50 absolute" />
        </div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-widest text-[var(--R)] uppercase">
          LENS // DIAGNOSE
        </div>
      </div>
    </div>
  );
}
