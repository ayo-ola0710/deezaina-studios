"use client";

import { useId } from "react";
import { cn } from "@/lib/cn";

interface MarqueeProps {
  items: string[];
  separator?: string;
  className?: string;
  reverse?: boolean;
  speed?: number; // duration in seconds
}

export default function Marquee({
  items,
  separator = "•",
  className,
  reverse = false,
  speed = 50,
}: MarqueeProps) {
  const animId = useId().replace(/[^a-zA-Z0-9]/g, "");
  const animationName = `marquee_${animId}`;

  // Quadruple items to guarantee seamless continuous wrap across ultra-wide viewports
  const list = [...items, ...items, ...items, ...items];

  return (
    <div
      className={cn(
        "relative overflow-hidden w-full select-none py-5 border-y-2 border-[var(--W15)] bg-[var(--K)]",
        className
      )}
    >
      <style>{`
        @keyframes ${animationName} {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }
        .${animationName}-track {
          display: flex;
          width: max-content;
          animation: ${animationName} ${speed}s linear infinite;
          will-change: transform;
        }
        .${animationName}-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div
        className={cn(
          `${animationName}-track`,
          reverse && "[animation-direction:reverse]"
        )}
      >
        {list.map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-6 mx-5 shrink-0"
          >
            <span className="font-display font-extrabold text-xl sm:text-2xl uppercase tracking-wider text-[var(--W)]">
              {item}
            </span>
            <span
              className="text-[var(--R)] text-base font-bold select-none"
              aria-hidden="true"
            >
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
