"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useCapabilities } from "@/hooks/useCapabilities";
import { useUI } from "@/store/useUI";

export default function Cursor() {
  const { canCursor } = useCapabilities();
  const { cursorVariant, cursorText, setCursorVariant } = useUI();


  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [isOverInteractive, setIsOverInteractive] = useState(false);

  useEffect(() => {
    if (!canCursor) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    const xDot = gsap.quickTo(dot, "x", { duration: 0.06, ease: "power3" });
    const yDot = gsap.quickTo(dot, "y", { duration: 0.06, ease: "power3" });

    const xRing = gsap.quickTo(ring, "x", { duration: 0.22, ease: "power3" });
    const yRing = gsap.quickTo(ring, "y", { duration: 0.22, ease: "power3" });

    const xLabel = label
      ? gsap.quickTo(label, "x", { duration: 0.22, ease: "power3" })
      : null;
    const yLabel = label
      ? gsap.quickTo(label, "y", { duration: 0.22, ease: "power3" })
      : null;

    const handlePointerMove = (e: PointerEvent) => {
      setIsVisible(true);
      xDot(e.clientX);
      yDot(e.clientY);
      xRing(e.clientX);
      yRing(e.clientY);
      if (xLabel && yLabel) {
        xLabel(e.clientX);
        yLabel(e.clientY);
      }

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInput =
        target.matches("input, textarea, select, [contenteditable='true']") ||
        !!target.closest("input, textarea, select, [contenteditable='true']");

      if (isInput) {
        setIsOverInteractive(true);
        return;
      }
      setIsOverInteractive(false);

      const cursorEl = target.closest(
        "[data-cursor], [data-cursor-label]"
      ) as HTMLElement | null;

      if (cursorEl) {
        const variant = cursorEl.getAttribute("data-cursor");
        const customText = cursorEl.getAttribute("data-cursor-label");

        if (variant === "view") {
          setCursorVariant("view");
          setActiveLabel(customText || "EXPLORE CASE");
        } else if (variant === "hidden") {
          setCursorVariant("hidden");
          setActiveLabel(null);
        } else {
          setActiveLabel(customText);
        }
      } else {
        if (cursorVariant !== "default") {
          setCursorVariant("default");
        }
        setActiveLabel(cursorText);
      }
    };

    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, [canCursor, cursorVariant, cursorText, setCursorVariant]);

  if (!canCursor) return null;

  const currentLabel = activeLabel || cursorText;
  const isViewMode = cursorVariant === "view" || !!currentLabel;
  const isHidden = cursorVariant === "hidden" || isOverInteractive || !isVisible;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50 overflow-hidden"
      style={{ opacity: isHidden ? 0 : 1, transition: "opacity 0.2s ease" }}
    >
      {/* Follower Dot (6px) */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-[3px] -mt-[3px] w-[6px] h-[6px] bg-[var(--R)] pointer-events-none z-50"
        style={{
          borderRadius: "50%",
          display: isViewMode ? "none" : "block",
        }}
      />

      {/* Follower Ring (36px default, 64px on view) */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-50 transition-all duration-200 ease-out border"
        style={{
          width: isViewMode ? "72px" : "36px",
          height: isViewMode ? "72px" : "36px",
          marginLeft: isViewMode ? "-36px" : "-18px",
          marginTop: isViewMode ? "-36px" : "-18px",
          borderRadius: "50%",
          borderColor: isViewMode ? "var(--R)" : "rgba(244, 242, 236, 0.45)",
          backgroundColor: isViewMode ? "rgba(230, 21, 21, 0.12)" : "transparent",
        }}
      />

      {/* Hover Label Pill */}
      {currentLabel && (
        <div
          ref={labelRef}
          className="fixed top-0 left-0 pointer-events-none z-50 -ml-16 -mt-16 text-center"
        >
          <span className="inline-block px-2 py-1 bg-[var(--R)] text-[var(--W)] font-body font-bold text-[10px] tracking-widest uppercase border border-[var(--W)] shadow-[2px_2px_0_var(--W)]">
            {currentLabel}
          </span>
        </div>
      )}
    </div>
  );
}
