"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCapabilities } from "@/hooks/useCapabilities";

export default function Intro() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLSpanElement>(null);

  const { reduced } = useCapabilities();
  const [isDismissed, setIsDismissed] = useState(false);

  // Active on initial page load unless reduced motion or dismissed
  const shouldShow = !reduced && !isDismissed;

  const finishLoader = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.75,
        ease: "power4.inOut",
        onComplete: () => {
          setIsDismissed(true);
        },
      });
    } else {
      setIsDismissed(true);
    }
  };

  useEffect(() => {
    if (!shouldShow || !overlayRef.current) return;

    // Lock page scrolling while preloader runs
    document.body.style.overflow = "hidden";

    const progressObj = { value: 0 };
    const bar = progressBarRef.current;
    const percentText = percentTextRef.current;
    const statusText = statusTextRef.current;

    const statuses = [
      "CALIBRATING DIAGNOSTIC CORE...",
      "SYNCHRONIZING BRAND ASSETS...",
      "SYSTEMS READY: DIAGNOSE BEFORE DESIGN.",
    ];

    const tl = gsap.timeline({
      onComplete: finishLoader,
    });

    // Animate percentage counter from 0 to 100 over 1.6 seconds
    tl.to(progressObj, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        const val = Math.round(progressObj.value);
        if (percentText) {
          percentText.textContent = `${val < 10 ? "0" + val : val}%`;
        }
        if (bar) {
          bar.style.transform = `scaleX(${progressObj.value / 100})`;
        }
        if (statusText) {
          if (val < 40) {
            statusText.textContent = statuses[0];
          } else if (val < 85) {
            statusText.textContent = statuses[1];
          } else {
            statusText.textContent = statuses[2];
          }
        }
      },
    });

    // Hold briefly at 100% before smooth curtain rise
    tl.to({}, { duration: 0.15 });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        tl.kill();
        finishLoader();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      tl.kill();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shouldShow]);

  if (!shouldShow) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-[var(--K)] flex flex-col justify-between p-6 sm:p-12 overflow-hidden select-none pointer-events-auto"
      role="dialog"
      aria-label="Site Preloader"
    >
      {/* Top Header */}
      <div className="flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <span className="font-display font-extrabold text-2xl text-[var(--R)]">
            D.
          </span>
          <span className="font-mono text-xs text-[var(--W55)] uppercase tracking-widest hidden sm:inline">
            DEEZAINA STUDIOS // INITIALIZING
          </span>
        </div>

        <button
          type="button"
          onClick={finishLoader}
          className="btn-ghost !py-1.5 !px-3 !text-[11px] font-mono tracking-widest"
          aria-label="Skip preloader animation"
        >
          SKIP [ESC]
        </button>
      </div>

      {/* Center Digital Counter & Monogram */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-4">
        {/* Pulsing Monogram */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 border-2 border-[var(--W15)] flex items-center justify-center bg-[var(--K3)] shadow-2xl">
          <span className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--R)] animate-pulse">
            D.
          </span>
          <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[var(--R)]" />
        </div>

        {/* Live 00% -> 100% Digital Counter */}
        <div className="font-display font-extrabold text-[clamp(4.5rem,14vw,10rem)] tracking-tight leading-none text-[var(--W)]">
          <span ref={percentTextRef}>00%</span>
        </div>

        {/* Dynamic Status Text */}
        <div className="text-xs font-mono tracking-[0.3em] text-[var(--R)] uppercase">
          <span ref={statusTextRef}>CALIBRATING DIAGNOSTIC CORE...</span>
        </div>
      </div>

      {/* Bottom High-Tension Red Laser Progress Track */}
      <div className="relative z-10 space-y-3 pt-6 border-t border-[var(--W15)]">
        <div className="flex justify-between items-center text-[10px] font-mono text-[var(--W35)]">
          <span>PHILOSOPHY: DIAGNOSE BEFORE DESIGN</span>
          <span>NIGERIA · CANADA · UK</span>
        </div>

        <div className="w-full h-[3px] bg-[var(--K3)] overflow-hidden">
          <div
            ref={progressBarRef}
            className="w-full h-full bg-[var(--R)] origin-left transition-transform duration-75 shadow-[0_0_12px_var(--R)]"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
