"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";

export const PROCESS_STEPS = [
  {
    step: "01",
    title: "DISCOVER",
    tabColor: "bg-[#E61515]", // Deezaina Red
    textColor: "text-[#E61515]",
    subtitle: "Identify the Real Problem",
    detail:
      "We audit the business, audience perception, and commercial friction through rigorous diagnostic inquiry before proposing any deliverable.",
    markersTop: ["Brand Audit", "User Research", "Market Diagnosis"],
    markersBottom: ["Competitor Analysis", "Stakeholder Inquiry"],
    trajectory: "CHAOS → CLARITY",
  },
  {
    step: "02",
    title: "DEFINE",
    tabColor: "bg-[#F59E0B]", // Amber
    textColor: "text-[#F59E0B]",
    subtitle: "Positioning & Direction",
    detail:
      "Set the strategic direction, project scope, core messaging hierarchy, and measurable commercial benchmarks.",
    markersTop: ["Core Narrative", "Scope Definition", "Target Archetype"],
    markersBottom: ["Positioning Matrix", "Success Metrics"],
    trajectory: "CLARITY → STRATEGY",
  },
  {
    step: "03",
    title: "CREATE",
    tabColor: "bg-[#8B5CF6]", // Violet
    textColor: "text-[#8B5CF6]",
    subtitle: "Systemic Craft",
    detail:
      "Develop the visual identity system, design language, typography hierarchy, or digital product architecture with obsessive precision.",
    markersTop: ["Design Systems", "Typography Grid", "UI/UX Architecture"],
    markersBottom: ["Logo Monograms", "Motion Prototyping"],
    trajectory: "STRATEGY → CRAFT",
  },
  {
    step: "04",
    title: "DELIVER",
    tabColor: "bg-[#3B82F6]", // Cobalt Blue
    textColor: "text-[#3B82F6]",
    subtitle: "Execution & Launch",
    detail:
      "Review against diagnostic goals, stress-test every responsive screen, approve, and orchestrate a flawless public launch.",
    markersTop: ["QA Review", "Performance Tuning", "Asset Delivery"],
    markersBottom: ["Pre-Launch Testing", "Public Deployment"],
    trajectory: "CRAFT → LAUNCH",
  },
  {
    step: "05",
    title: "IMPROVE",
    tabColor: "bg-[#10B981]", // Emerald Green
    textColor: "text-[#10B981]",
    subtitle: "Compounding Growth",
    detail:
      "Monitor real market response, analyze conversion data, and refine touchpoints for long-term compounding market advantage.",
    markersTop: ["Performance Data", "User Feedback", "Iteration Cycles"],
    markersBottom: ["Conversion Tracking", "System Governance"],
    trajectory: "LAUNCH → SCALE",
  },
];

export default function Process() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const lastXRef = useRef(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    lastXRef.current = e.pageX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();

    const currentX = e.pageX;
    const deltaX = currentX - lastXRef.current;
    lastXRef.current = currentX;

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;

    // Playful pendulum swing based on drag velocity
    const tilt = Math.max(-7, Math.min(7, -deltaX * 0.45));
    const cards = scrollContainerRef.current.querySelectorAll(".process-hanging-card");

    if (cards.length > 0) {
      gsap.to(cards, {
        rotation: tilt,
        duration: 0.15,
        ease: "power1.out",
        transformOrigin: "50% 24px",
      });
    }
  };

  const stopDragging = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // Playful spring shake settling when released
    if (scrollContainerRef.current) {
      const cards = scrollContainerRef.current.querySelectorAll(".process-hanging-card");
      gsap.to(cards, {
        rotation: 0,
        duration: 1.1,
        ease: "elastic.out(1.2, 0.35)",
        stagger: 0.03,
        transformOrigin: "50% 24px",
      });
    }
  };

  const handleCardHover = (e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    gsap.fromTo(
      card,
      { rotation: 0 },
      {
        rotation: (Math.random() - 0.5) * 4,
        duration: 0.4,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        transformOrigin: "50% 24px",
      }
    );
  };

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const amount = direction === "left" ? -420 : 420;
    scrollContainerRef.current.scrollBy({ left: amount, behavior: "smooth" });

    // Subtle wave shake when clicking arrow buttons
    const cards = scrollContainerRef.current.querySelectorAll(".process-hanging-card");
    const tilt = direction === "left" ? 3 : -3;
    gsap.fromTo(
      cards,
      { rotation: tilt },
      {
        rotation: 0,
        duration: 1,
        ease: "elastic.out(1.2, 0.35)",
        stagger: 0.04,
        transformOrigin: "50% 24px",
      }
    );
  };

  return (
    <section className="relative py-24 border-t-2 border-[var(--W15)] bg-[var(--K)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-12 mb-10">
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-[var(--W15)] pb-8">
          <div className="space-y-3 max-w-xl">
            <Label>OUR PROCESS // RIGOROUS EXECUTION</Label>
            <Reveal>
              <h2 className="type-h2 text-[var(--W)]">
                From Diagnosis to Delivery.
              </h2>
            </Reveal>
            <p className="type-body text-sm text-[var(--W55)]">
              A 5-stage hanging pipeline. Drag, swipe, or click to swing through
              the diagnostic methodology.
            </p>
          </div>

          {/* Prev / Next Buttons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              className="p-3 border-2 border-[var(--W15)] bg-[var(--K3)] text-[var(--W)] hover:border-[var(--R)] hover:text-[var(--R)] transition-colors focus-visible:outline-none"
              aria-label="Previous step"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              className="p-3 border-2 border-[var(--W15)] bg-[var(--K3)] text-[var(--W)] hover:border-[var(--R)] hover:text-[var(--R)] transition-colors focus-visible:outline-none"
              aria-label="Next step"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Hanging Cable Rail Wrapper */}
      <div className="relative w-full overflow-hidden select-none">
        {/* Horizontal Steel/Cable Line passing through all cards */}
        <div
          aria-hidden="true"
          className="absolute top-[42px] left-0 right-0 h-[3px] bg-gradient-to-r from-neutral-800 via-[var(--R)] to-neutral-800 pointer-events-none z-10 shadow-[0_0_14px_rgba(230,21,21,0.6)]"
        />

        {/* Scrollable Track - with scrollbar completely removed */}
        <div
          ref={scrollContainerRef}
          data-lenis-prevent="true"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          className={`no-scrollbar flex gap-8 px-6 sm:px-12 overflow-x-auto pb-12 pt-4 scroll-smooth ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >
          {PROCESS_STEPS.map((step) => (
            <article
              key={step.step}
              onMouseEnter={handleCardHover}
              className="process-hanging-card relative w-[340px] sm:w-[380px] shrink-0 flex flex-col items-center group will-change-transform"
              style={{
                transformOrigin: "50% 24px",
              }}
            >
              {/* Hanging Tab with Metallic Screw/Eyelet Hole */}
              <div
                className={`relative z-20 w-16 h-12 ${step.tabColor} border-2 border-black flex items-center justify-center shadow-md`}
                style={{
                  borderRadius: "6px 6px 0 0",
                }}
              >
                {/* Screw / Eyelet Hole where the cable runs through */}
                <div className="w-5 h-5 rounded-full bg-black border-2 border-white/60 flex items-center justify-center shadow-inner">
                  <div className="w-2 h-2 rounded-full bg-neutral-900 border border-white/30" />
                </div>
              </div>

              {/* Card Body */}
              <div
                className="w-full bg-[var(--K3)] border-2 border-[var(--W15)] group-hover:border-[var(--R)] group-hover:shadow-[6px_6px_0_var(--R)] transition-all duration-300 overflow-hidden flex flex-col justify-between"
                style={{ minHeight: "440px" }}
              >
                {/* Card Top: Stage Header */}
                <header className="p-6 bg-black border-b-2 border-[var(--W15)] flex flex-col justify-between">
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-neutral-400">
                      STAGE {step.step} / 05
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[var(--R)] animate-pulse" />
                  </div>

                  <h3
                    className={`font-display font-extrabold text-3xl sm:text-4xl tracking-tight ${step.textColor}`}
                  >
                    {step.title}
                  </h3>
                  <p className="font-mono text-xs text-[var(--W55)] mt-1 uppercase">
                    {step.subtitle}
                  </p>
                </header>

                {/* Card Middle: Details & Marker Timeline */}
                <div className="p-6 space-y-6 flex-1 flex flex-col justify-between bg-[var(--K3)]">
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--R)] font-bold block">
                      DETAILS
                    </span>
                    <p className="type-body text-xs sm:text-sm text-[var(--W55)] leading-relaxed">
                      {step.detail}
                    </p>
                  </div>

                  {/* Diagnostic Axis / Markers */}
                  <div className="space-y-2 pt-2 border-t border-[var(--W15)]">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--W35)] block">
                      METHODOLOGY
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {step.markersTop.concat(step.markersBottom).map((m, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-[var(--K)] border border-[var(--W15)] text-[10px] font-mono text-[var(--W)]"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
