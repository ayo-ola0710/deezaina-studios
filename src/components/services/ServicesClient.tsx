"use client";

import { useState } from "react";
import Label from "@/components/ui/Label";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/cn";

interface CapabilityDrawer {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  services: string[];
}

const CAPABILITIES: CapabilityDrawer[] = [
  {
    id: "strategy",
    number: "01",
    title: "STRATEGY",
    subtitle: "Direction before execution",
    services: [
      "Brand Strategy & Audits",
      "Market Diagnosis",
      "Positioning & Core Narrative",
      "Audience Research & Insights",
      "Campaign & Launch Strategy",
      "Content Strategy Architecture",
      "Growth & Product Consulting",
      "Brand Architecture Systems",
    ],
  },
  {
    id: "branding",
    number: "02",
    title: "BRANDING",
    subtitle: "A system for how a brand looks, sounds, behaves",
    services: [
      "Visual Identity Systems",
      "Logo System & Iconography",
      "Typography & Color Standards",
      "Brand Guidelines & Manuals",
      "Pitch Decks & Corporate Profiles",
      "Packaging & Environmental Signage",
      "Social Media Design Systems",
      "Design Systems & Brand Governance",
    ],
  },
  {
    id: "web",
    number: "03",
    title: "WEB & DIGITAL",
    subtitle: "Digital experiences that make the brand useful",
    services: [
      "Bespoke Website Strategy",
      "UI & UX Product Design",
      "Modern Web Development (Next.js)",
      "High-Converting Landing Pages",
      "Web Applications & SaaS Interfaces",
      "SEO & Technical Performance Optimization",
      "Interactive 3D & Creative Development",
      "Digital Product Maintenance",
    ],
  },
];

const FAQS = [
  {
    q: "What makes Deezaina Studios different?",
    a: "Our core operating philosophy is 'Diagnose Before Design.' Most agencies sell deliverables (a logo, a generic website) without understanding the core commercial problem. We audit the friction in your market position first, ensuring that whatever we build solves a real business obstacle.",
  },
  {
    q: "I already have a logo. Do I need a full rebrand?",
    a: "A logo is not a brand. If your visual system is inconsistent across pitch decks, social media, and digital products, or if prospective clients don't immediately grasp what you do, your visual communication is leaking trust. Our Brand Diagnostic helps determine whether an evolution or complete overhaul is warranted.",
  },
  {
    q: "Do you work with clients internationally?",
    a: "Yes. While founded in Nigeria, Deezaina Studios has delivered projects for clients and institutional partners across Nigeria, Canada, and the United Kingdom. Our workflows are completely distributed and built for asynchronous, high-touch collaboration.",
  },
  {
    q: "How does pricing and scope work?",
    a: "Because we diagnose before recommending execution, every project scope is tailored to the business's actual stage and goals. We do not provide cookie-cutter packages or speculative estimates without first identifying what needs to be solved.",
  },
  {
    q: "How long does a typical project take?",
    a: "Timelines depend directly on the scope established during the diagnostic audit — ranging from focused 3-to-4 week sprints for visual identities to multi-month engagements for full-scale digital product development.",
  },
];

export default function ServicesClient() {
  const [openDrawer, setOpenDrawer] = useState<string>("strategy");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="space-y-24">
      {/* 01 Connected System Flow */}
      <section className="space-y-8">
        <Label>THE SYSTEM // HOW THE PIECES FIT TOGETHER</Label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-[var(--K3)] border-2 border-[var(--W15)] space-y-3">
            <span className="font-mono text-xs text-[var(--R)]">01 // CLARITY</span>
            <h3 className="font-display font-bold text-xl text-[var(--W)]">Strategy</h3>
            <p className="text-xs text-[var(--W55)] leading-relaxed">
              Direction, market positioning, and commercial focus.
            </p>
          </div>

          <div className="p-6 bg-[var(--K3)] border-2 border-[var(--W15)] space-y-3">
            <span className="font-mono text-xs text-[var(--R)]">02 // IDENTITY</span>
            <h3 className="font-display font-bold text-xl text-[var(--W)]">Branding</h3>
            <p className="text-xs text-[var(--W55)] leading-relaxed">
              A cohesive visual system for how your brand looks, speaks, and acts.
            </p>
          </div>

          <div className="p-6 bg-[var(--K3)] border-2 border-[var(--W15)] space-y-3">
            <span className="font-mono text-xs text-[var(--R)]">03 // UTILITY</span>
            <h3 className="font-display font-bold text-xl text-[var(--W)]">Web</h3>
            <p className="text-xs text-[var(--W55)] leading-relaxed">
              Fast, high-converting digital experiences that turn visitors into clients.
            </p>
          </div>

          <div className="p-6 bg-[var(--K3)] border-2 border-[var(--W15)] space-y-3">
            <span className="font-mono text-xs text-[var(--R)]">04 // OUTCOME</span>
            <h3 className="font-display font-bold text-xl text-[var(--W)]">Growth</h3>
            <p className="text-xs text-[var(--W55)] leading-relaxed">
              Heightened visibility, systemic credibility, and compounding market trust.
            </p>
          </div>
        </div>
      </section>

      {/* 02 Capability Drawers (Accordion) */}
      <section className="space-y-6">
        <Label>CAPABILITY DRAWERS // DEEP DIVE</Label>

        <div className="space-y-4">
          {CAPABILITIES.map((cap) => {
            const isOpen = openDrawer === cap.id;
            return (
              <div
                key={cap.id}
                className={cn(
                  "border-2 transition-all duration-200 bg-[var(--K3)]",
                  isOpen
                    ? "border-[var(--R)] shadow-[4px_4px_0_var(--R)]"
                    : "border-[var(--W15)] hover:border-[var(--W55)]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenDrawer(isOpen ? "" : cap.id)}
                  className="w-full p-6 sm:p-8 flex items-center justify-between text-left focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6">
                    <span className="font-mono text-xl font-bold text-[var(--R)]">
                      {cap.number}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--W)]">
                        {cap.title}
                      </h3>
                      <p className="text-xs text-[var(--W55)] font-mono mt-1">
                        {cap.subtitle}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-2xl text-[var(--W)]">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-8 sm:px-8 border-t border-[var(--W15)] pt-6 animate-in fade-in duration-150">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                      {cap.services.map((service, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-[var(--K)] border border-[var(--W15)] text-xs font-mono text-[var(--W)] flex items-center gap-2"
                        >
                          <span className="w-1.5 h-1.5 bg-[var(--R)] inline-block" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 03 Where We Are Going (5 Neo-Brutalist Tiles) */}
      <section className="space-y-6">
        <Label>WHERE WE ARE GOING // STUDIO TRAJECTORY</Label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {["Projects", "Retainers", "Consulting", "Products", "Training"].map(
            (item, index) => (
              <Card key={item} className="p-6 text-center space-y-2">
                <span className="text-[10px] font-mono text-[var(--R)]">
                  0{index + 1}
                </span>
                <h4 className="font-display font-bold text-lg text-[var(--W)]">
                  {item}
                </h4>
              </Card>
            )
          )}
        </div>
      </section>

      {/* 04 FAQ Accordion */}
      <section className="space-y-6">
        <Label>FREQUENTLY ASKED QUESTIONS // CLARITY FIRST</Label>
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className={cn(
                  "border-2 transition-all duration-200 bg-[var(--K3)]",
                  isOpen ? "border-[var(--W)]" : "border-[var(--W15)]"
                )}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left focus-visible:outline-none"
                  aria-expanded={isOpen}
                >
                  <h4 className="font-display font-bold text-lg sm:text-xl text-[var(--W)]">
                    {faq.q}
                  </h4>
                  <span className="font-mono text-xl text-[var(--R)] ml-4">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-[var(--W15)]">
                    <p className="type-body text-sm text-[var(--W55)] leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
