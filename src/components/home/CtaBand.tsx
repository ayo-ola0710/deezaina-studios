"use client";

import Button from "@/components/ui/Button";
import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";
import { useUI } from "@/store/useUI";

export default function CtaBand() {
  const { openBooking } = useUI();

  return (
    <section className="py-24 border-y-2 border-[var(--W15)] bg-[var(--K3)] relative overflow-hidden">
      {/* Background glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[radial-gradient(circle,rgba(230,21,21,0.18)_0%,transparent_70%)] pointer-events-none -z-10 blur-3xl"
      />

      <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
        <Label className="mx-auto">BRAND DIAGNOSTIC // TAKE ACTION</Label>

        <Reveal>
          <h2 className="type-h2 text-[var(--W)] leading-tight">
            Not sure what your brand actually needs?
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="type-body text-lg text-[var(--W55)] max-w-xl mx-auto">
            Take our 2-minute Brand Diagnostic to identify whether your primary obstacle is
            Strategy, Branding, or Web experience — and get an immediate path forward.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Button variant="red" magnetic onClick={openBooking}>
              Start the Diagnostic
            </Button>
            <Button variant="ghost" magnetic href="/services">
              Explore Our Services →
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
