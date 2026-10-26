"use client";

import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";
import { useUI } from "@/store/useUI";

import HeroLens from "./HeroLens";

export default function Hero() {
  const { openBooking } = useUI();

  return (
    <section className="relative min-h-[82vh] flex flex-col justify-center py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      {/* Background Ambience: Subtle Red Glow + Ghost Monogram */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(230,21,21,0.12)_0%,transparent_70%)] pointer-events-none -z-10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute right-4 top-1/2 -translate-y-1/2 select-none pointer-events-none text-[clamp(16rem,30vw,35rem)] font-display font-extrabold text-[var(--W4)] -z-10 leading-none"
      >
        D.
      </div>

      {/* Main Content */}
      <div className="space-y-8 max-w-5xl">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 bg-[var(--R)] inline-block" />
            <Label>STRATEGY · BRANDING · WEB</Label>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <HeroLens />
        </Reveal>

        <Reveal delay={0.2}>
          <p className="type-body text-[var(--W55)] text-lg sm:text-xl max-w-2xl leading-relaxed">
            We help businesses become easier to understand, trust, and choose.
            Before we build or design, we isolate the true obstacle holding your brand back.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="flex flex-wrap gap-5 items-center pt-2">
            <Button variant="red" magnetic onClick={openBooking}>
              Book a Diagnostic
            </Button>
            <Button variant="ghost" magnetic href="/work">
              See Our Work →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
