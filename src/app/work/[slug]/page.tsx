import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import CtaBand from "@/components/home/CtaBand";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found — Deezaina Studios",
    };
  }

  return {
    title: `${project.title} — Case Study | Deezaina Studios`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Deezaina Studios`,
      description: project.summary,
      images: [project.cover],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const nextProject =
    allProjects[(currentIndex + 1) % allProjects.length] || allProjects[0];

  return (
    <article className="pt-12 pb-24 space-y-20">
      {/* 01 Case Study Header */}
      <header className="max-w-7xl mx-auto px-6 space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--W15)] pb-6">
          <Link
            href="/work"
            className="text-xs font-mono text-[var(--W55)] hover:text-[var(--W)] transition-colors inline-flex items-center gap-2"
          >
            <span>←</span>
            <span>BACK TO ALL WORK</span>
          </Link>

          <div className="flex items-center gap-3">
            {project.kind === "concept" && (
              <span className="text-[10px] font-mono uppercase bg-[var(--K3)] border border-[var(--W15)] px-2.5 py-1 text-[var(--W55)]">
                Concept / Self-Initiated
              </span>
            )}
            <span className="text-xs font-mono text-[var(--R)] uppercase">
              {project.sector} · {project.year}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <Label>CASE STUDY // {project.client.toUpperCase()}</Label>
          <Reveal>
            <h1 className="type-h1 text-[var(--W)]">
              {project.title}
            </h1>
          </Reveal>
          <p className="type-body text-xl text-[var(--W55)] max-w-3xl">
            {project.summary}
          </p>
        </div>

        {/* Project Meta Bento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="p-4 bg-[var(--K3)] border-2 border-[var(--W15)] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--W35)]">
              Client
            </span>
            <div className="font-bold text-sm text-[var(--W)]">{project.client}</div>
          </div>

          <div className="p-4 bg-[var(--K3)] border-2 border-[var(--W15)] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--W35)]">
              Year
            </span>
            <div className="font-bold text-sm text-[var(--W)]">{project.year}</div>
          </div>

          <div className="p-4 bg-[var(--K3)] border-2 border-[var(--W15)] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--W35)]">
              Services
            </span>
            <div className="font-bold text-sm text-[var(--W)]">
              {project.services.join(", ")}
            </div>
          </div>

          <div className="p-4 bg-[var(--K3)] border-2 border-[var(--W15)] space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--W35)]">
              External Link
            </span>
            <div>
              {project.downloadUrl ? (
                <a
                  href={project.downloadUrl}
                  download
                  className="text-xs font-mono font-bold text-[var(--R)] hover:underline inline-flex items-center gap-1"
                >
                  Download PDF ↓
                </a>
              ) : project.liveUrl ? (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-[var(--R)] hover:underline inline-flex items-center gap-1"
                >
                  Visit Project ↗
                </a>
              ) : (
                <span className="text-xs font-mono text-[var(--W35)]">Archived</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 02 Hero Cover Image */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="relative aspect-[16/9] w-full border-2 border-[var(--W15)] bg-[var(--K4)] overflow-hidden shadow-2xl">
          <Image
            src={project.cover}
            alt={project.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      {/* 03 Case Study Breakdown (5 Diagnostic Steps) */}
      <section className="max-w-5xl mx-auto px-6 space-y-16">
        {/* Deliverables Section */}
        {project.deliverables && project.deliverables.length > 0 && (
          <Card className="space-y-4">
            <Label>DELIVERABLES PRODUCED</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {project.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-[var(--K)] border border-[var(--W15)] text-xs font-mono text-[var(--W)] flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 bg-[var(--R)] inline-block" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Narrative Chapters */}
        <div className="space-y-12">
          {/* 01 The Problem */}
          <div className="border-t-2 border-[var(--W15)] pt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[var(--R)] block">01 // CONTEXT</span>
              <h2 className="font-display font-bold text-2xl text-[var(--W)]">
                The Problem
              </h2>
            </div>
            <div className="md:col-span-8 type-body text-base text-[var(--W55)] space-y-4">
              <p>
                Every brand project starts with identifying what the client actually needed
                solved commercially — examining the friction in market perception, customer conversion,
                or communication clarity.
              </p>
            </div>
          </div>

          {/* 02 The Diagnostic */}
          <div className="border-t-2 border-[var(--W15)] pt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[var(--R)] block">02 // AUDIT</span>
              <h2 className="font-display font-bold text-2xl text-[var(--W)]">
                The Diagnostic
              </h2>
            </div>
            <div className="md:col-span-8 type-body text-base text-[var(--W55)] space-y-4">
              <p>
                Our diagnostic audit analyzed the existing market landscape and competitive positioning.
                We uncovered discrepancies between company capability and visual execution.
              </p>
            </div>
          </div>

          {/* 03 The Strategy & Identity */}
          <div className="border-t-2 border-[var(--W15)] pt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4">
              <span className="text-xs font-mono text-[var(--R)] block">03 // SOLUTION</span>
              <h2 className="font-display font-bold text-2xl text-[var(--W)]">
                The Strategy & Identity
              </h2>
            </div>
            <div className="md:col-span-8 type-body text-base text-[var(--W55)] space-y-4">
              <p>
                {project.summary} Built upon precision, clarity, and system-level coherence
                to command trust and immediate recognition in its target sector.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 04 Next Project Banner */}
      <section className="max-w-7xl mx-auto px-6 border-t-2 border-[var(--W15)] pt-16">
        <Link
          href={`/work/${nextProject.slug}`}
          className="group block p-8 sm:p-12 border-2 border-[var(--W15)] bg-[var(--K3)] hover:border-[var(--R)] hover:shadow-[4px_4px_0_var(--R)] transition-all duration-200"
        >
          <div className="flex justify-between items-center mb-4">
            <Label>NEXT CASE STUDY →</Label>
            <span className="font-mono text-xs text-[var(--W35)]">
              {nextProject.sector.toUpperCase()} · {nextProject.year}
            </span>
          </div>
          <h3 className="font-display font-extrabold text-3xl sm:text-5xl text-[var(--W)] group-hover:text-[var(--R)] transition-colors">
            {nextProject.title}
          </h3>
          <p className="type-body text-sm text-[var(--W55)] mt-3">
            {nextProject.summary}
          </p>
        </Link>
      </section>

      {/* Bottom CTA */}
      <CtaBand />
    </article>
  );
}
