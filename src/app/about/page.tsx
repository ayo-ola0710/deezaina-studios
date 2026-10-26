import type { Metadata } from "next";
import Image from "next/image";
import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import LiveClocks from "@/components/about/LiveClocks";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "About The Studio — Deezaina Studios",
  description:
    "Founded in 2018 by Divine Owoyemi. We combine business thinking, purposeful design, and digital execution to help brands become clearer, more useful, and ready to grow.",
};

const PRINCIPLES = [
  {
    num: "01",
    title: "Diagnose first",
    desc: "We understand the root problem before producing work. Deliverables must follow clear strategic diagnosis.",
  },
  {
    num: "02",
    title: "Think in systems",
    desc: "Every asset, screen, and touchpoint must support a larger coherent commercial objective.",
  },
  {
    num: "03",
    title: "Keep it clear",
    desc: "Smart, sophisticated thinking should still be effortless to understand and act upon.",
  },
  {
    num: "04",
    title: "Own the outcome",
    desc: "Each member of our multidisciplinary team takes personal responsibility for excellence.",
  },
  {
    num: "05",
    title: "Communicate early",
    desc: "Friction, delays, and critical questions should never stay hidden. Transparency drives velocity.",
  },
  {
    num: "06",
    title: "Protect quality",
    desc: "Nothing leaves the studio without rigorous peer review and alignment against core diagnostic benchmarks.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-12 pb-24 space-y-24">
      {/* 01 Studio Header */}
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <Label>THE STUDIO // PURPOSEFUL EXECUTION</Label>
        <Reveal>
          <h1 className="type-h1 text-[var(--W)]">
            A Multidisciplinary Strategy, Branding & Web Studio.
          </h1>
        </Reveal>
        <p className="type-body text-xl text-[var(--W55)] max-w-3xl">
          Founded in 2018 by Divine Owoyemi. We combine commercial thinking,
          distinctive design systems, and digital execution to help businesses
          become clearer, more useful, and ready to compound growth.
        </p>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-y-2 border-[var(--W15)] py-8">
          <div>
            <span className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--R)]">
              2018
            </span>
            <p className="font-mono text-xs text-[var(--W55)] uppercase tracking-widest mt-1">
              Studio Founded
            </p>
          </div>
          <div>
            <span className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--W)]">
              3
            </span>
            <p className="font-mono text-xs text-[var(--W55)] uppercase tracking-widest mt-1">
              Countries (NG · CA · UK)
            </p>
          </div>
          <div>
            <span className="font-display font-extrabold text-4xl sm:text-5xl text-[var(--W)]">
              100%
            </span>
            <p className="font-mono text-xs text-[var(--W55)] uppercase tracking-widest mt-1">
              Diagnose Before Design
            </p>
          </div>
        </div>
      </div>

      {/* 02 Founder Block */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-[var(--K3)] border-2 border-[var(--W15)] p-6 sm:p-12">
          <div className="md:col-span-5 relative aspect-square w-full max-w-md mx-auto overflow-hidden border-2 border-[var(--W15)] bg-[var(--K4)]">
            <Image
              src="/images/team/divine.webp"
              alt="Divine Owoyemi — Founder & Creative Director"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-[var(--e1)]"
            />
          </div>

          <div className="md:col-span-7 space-y-6">
            <div className="space-y-2">
              <Label>LEADERSHIP // FOUNDER</Label>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[var(--W)]">
                Divine Owoyemi
              </h2>
              <p className="font-mono text-xs text-[var(--R)] uppercase tracking-widest">
                Founder & Strategy Director
              </p>
            </div>

            <div className="type-body text-base text-[var(--W55)] space-y-4">
              <p>
                &ldquo;We spot what others walk past — the silent gap between what an ambitious
                business is capable of and how it presents itself to the market.&rdquo;
              </p>
              <p>
                &ldquo;Our promise to every founder and executive we partner with is singular:
                we will never build for vanity. We diagnose the commercial bottleneck first,
                and then execute with uncompromising craft.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 03 Six Principles (Bento Grid) */}
      <section className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="space-y-3">
          <Label>OPERATING SYSTEM // SIX PRINCIPLES</Label>
          <Reveal>
            <h2 className="type-h2 text-[var(--W)]">
              How We Work.
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {PRINCIPLES.map((principle) => (
            <Card key={principle.num} className="space-y-4">
              <span className="font-mono text-lg font-bold text-[var(--R)]">
                {principle.num}
              </span>
              <h3 className="font-display font-bold text-2xl text-[var(--W)]">
                {principle.title}
              </h3>
              <p className="type-body text-sm text-[var(--W55)] leading-relaxed">
                {principle.desc}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* 04 Global Presence & Live Clocks */}
      <section className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="space-y-2">
          <Label>GLOBAL FOOTPRINT // REAL-TIME PRESENCE</Label>
          <h2 className="font-display font-bold text-2xl text-[var(--W)]">
            Distributed Across Three Time Zones
          </h2>
        </div>
        <LiveClocks />
      </section>

      {/* Bottom CTA */}
      <CtaBand />
    </div>
  );
}
