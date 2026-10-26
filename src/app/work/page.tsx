import type { Metadata } from "next";
import { getAllProjects } from "@/lib/projects";
import WorkArchiveClient from "@/components/work/WorkArchiveClient";
import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";
import CtaBand from "@/components/home/CtaBand";

export const metadata: Metadata = {
  title: "Selected Work — Deezaina Studios",
  description:
    "Explore strategic branding, visual identity systems, and digital web experiences delivered across Nigeria, Canada, and the UK.",
};

export default function WorkPage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-16 pt-12 pb-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <Label>THE PROOF // CLIENT & CONCEPT PORTFOLIO</Label>

        <Reveal>
          <h1 className="type-h1 text-[var(--W)]">
            Work That Started With a Diagnosis.
          </h1>
        </Reveal>

        <p className="type-body text-lg text-[var(--W55)] max-w-2xl">
          Strategic identity systems, digital platforms, and brand frameworks
          built for ambitious businesses across Nigeria, Canada, and the UK.
        </p>
      </div>

      {/* Main Grid with Sticky Filter */}
      <div className="max-w-7xl mx-auto px-6">
        <WorkArchiveClient initialProjects={projects} />
      </div>

      {/* Bottom CTA Band */}
      <CtaBand />
    </div>
  );
}
