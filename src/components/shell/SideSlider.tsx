"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";

export default function SideSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Smoothly scroll using Lenis if available, or native window fallback
  const scrollTo = useCallback((targetY: number, immediate = false) => {
    const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
    if (lenis) {
      lenis.scrollTo(targetY, { immediate });
    } else {
      window.scrollTo({
        top: targetY,
        behavior: immediate ? "auto" : "smooth",
      });
    }
  }, []);

  // Update slider thumb position from window scroll
  useEffect(() => {
    let rafId: number;

    const handleScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const nextProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
        setProgress(Math.min(1, Math.max(0, nextProgress)));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Handle pointer drag on thumb
  const startDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);

    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const trackHeight = trackRect.height;
    const thumbHeight = thumbRef.current?.offsetHeight || 48;
    const availableHeight = trackHeight - thumbHeight;

    const moveAt = (clientY: number) => {
      const relY = Math.min(
        Math.max(0, clientY - trackRect.top - thumbHeight / 2),
        availableHeight
      );
      const ratio = availableHeight > 0 ? relY / availableHeight : 0;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const targetScroll = ratio * maxScroll;

      setProgress(ratio);
      scrollTo(targetScroll, true);
    };

    const onPointerMove = (moveEvent: PointerEvent) => {
      moveAt(moveEvent.clientY);
    };

    const onPointerUp = () => {
      setIsDragging(false);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
  };

  // Jump to track position on track click
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const track = trackRef.current;
    if (!track) return;

    const trackRect = track.getBoundingClientRect();
    const trackHeight = trackRect.height;
    const thumbHeight = thumbRef.current?.offsetHeight || 48;
    const availableHeight = trackHeight - thumbHeight;

    const clickY = e.clientY - trackRect.top - thumbHeight / 2;
    const clampedY = Math.min(Math.max(0, clickY), availableHeight);
    const ratio = availableHeight > 0 ? clampedY / availableHeight : 0;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;

    scrollTo(ratio * maxScroll, false);
  };

  const percentDisplay = Math.round(progress * 100);

  return (
    <aside
      aria-label="Studio Navigation Slider"
      className="hidden md:flex fixed right-0 top-0 bottom-0 z-50 w-8 flex-col justify-between items-center select-none border-l border-[var(--W8)] bg-[rgba(5,5,5,0.75)] backdrop-blur-md transition-opacity duration-300"
    >
      {/* Top Cap Button: Scroll to Top */}
      <button
        type="button"
        data-cursor="hidden"
        onClick={() => scrollTo(0)}
        title="Scroll to Top"
        aria-label="Scroll to Top"
        className="w-full h-8 flex items-center justify-center text-[var(--W55)] hover:text-[var(--W)] hover:bg-[var(--R)] border-b border-[var(--W8)] transition-all group cursor-pointer"
      >
        <span className="text-[10px] transform group-hover:-translate-y-0.5 transition-transform font-mono">
          ▲
        </span>
      </button>

      {/* Middle Interactive Track */}
      <div
        ref={trackRef}
        data-cursor="hidden"
        onClick={handleTrackClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex-1 w-full flex items-center justify-center cursor-pointer py-0 group"
      >
        {/* Subtle center hairline guide */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[var(--W8)] group-hover:bg-[var(--W15)] transition-colors" />

        {/* Diagnostic millimeter tick marks */}
        <div className="absolute inset-y-4 right-1 flex flex-col justify-between pointer-events-none opacity-20 group-hover:opacity-60 transition-opacity">
          {[...Array(11)].map((_, i) => (
            <span
              key={i}
              className={`block bg-[var(--W)] h-[1px] ${
                i % 5 === 0 ? "w-2 bg-[var(--R)] opacity-100" : "w-1"
              }`}
            />
          ))}
        </div>

        {/* Draggable Studio Thumb */}
        <div
          ref={thumbRef}
          onPointerDown={startDrag}
          className="absolute left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing touch-none group/thumb"
          style={{
            top: `calc(${progress * 100}% - ${progress * 48}px)`,
            height: "48px",
            width: "16px",
          }}
        >
          {/* Live digital readout badge on hover or active dragging */}
          {(isHovered || isDragging) && (
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
              <span className="font-mono text-[9px] font-black tracking-widest bg-[var(--K)] text-[var(--W)] border border-[var(--R)] px-1.5 py-0.5 shadow-[2px_2px_0_var(--R)] whitespace-nowrap">
                {percentDisplay.toString().padStart(2, "0")}%
              </span>
            </div>
          )}

          {/* Thumb Block: Neo-Brutalist Red Laser Block */}
          <div
            className={`w-full h-full bg-[var(--R)] border border-[var(--W)] shadow-[2px_2px_0_var(--K)] flex flex-col items-center justify-center gap-1 transition-transform ${
              isDragging
                ? "scale-105 shadow-[0_0_16px_var(--R)]"
                : "group-hover/thumb:shadow-[0_0_12px_rgba(230,21,21,0.7)]"
            }`}
          >
            {/* Tactical Grip lines */}
            <span className="w-2 h-[1px] bg-[var(--W)] opacity-90" />
            <span className="w-2 h-[1px] bg-[var(--W)] opacity-90" />
            <span className="w-2 h-[1px] bg-[var(--W)] opacity-90" />
          </div>
        </div>
      </div>

      {/* Bottom Cap Button: Scroll to Bottom */}
      <button
        type="button"
        data-cursor="hidden"
        onClick={() => {
          const maxScroll =
            document.documentElement.scrollHeight - window.innerHeight;
          scrollTo(maxScroll);
        }}
        title="Scroll to Bottom"
        aria-label="Scroll to Bottom"
        className="w-full h-8 flex items-center justify-center text-[var(--W55)] hover:text-[var(--W)] hover:bg-[var(--R)] border-t border-[var(--W8)] transition-all group cursor-pointer"
      >
        <span className="text-[10px] transform group-hover:translate-y-0.5 transition-transform font-mono">
          ▼
        </span>
      </button>
    </aside>
  );
}
