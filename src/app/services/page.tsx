import type { Metadata } from "next";
import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";
import ServicesClient from "@/components/services/ServicesClient";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Services & Capabilities — Deezaina Studios",
  description:
    "Strategy, Branding, and Web engineering. Discover how our connected disciplines solve commercial problems and compound brand value.",
};

export default function ServicesPage() {
  return (
    <div className="pt-12 pb-24 space-y-20">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <Label>WHAT WE DO // CONNECTED SYSTEM</Label>
        <Reveal>
          <h1 className="type-h1 text-[var(--W)]">
            One Connected System.
          </h1>
        </Reveal>
        <p className="type-body text-lg text-[var(--W55)] max-w-2xl">
          We combine commercial strategy, distinctive visual branding, and modern web
          development to help brands become easier to understand, trust, and choose.
        </p>
      </div>

      {/* Main Interactive Services Component */}
      <div className="max-w-7xl mx-auto px-6">
        <ServicesClient />
      </div>

      {/* Bottom CTA */}
      <CtaBand />
    </div>
  );
}
