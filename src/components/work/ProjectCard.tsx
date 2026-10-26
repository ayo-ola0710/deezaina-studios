import Image from "next/image";
import Link from "next/link";
import { type Project } from "@/lib/projects";
import Card from "@/components/ui/Card";
import Label from "@/components/ui/Label";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}`}
      className="group block focus-visible:outline-none"
      data-cursor="view"
      data-cursor-label="EXPLORE CASE"
    >
      <Card className="p-0 overflow-hidden group-hover:border-[var(--R)] group-hover:shadow-[4px_4px_0_var(--R)] transition-all duration-200">
        {/* Cover Image Container */}
        <div className="relative aspect-[16/10] w-full bg-[var(--K4)] border-b-2 border-[var(--W15)] overflow-hidden">
          <Image
            src={project.cover}
            alt={`${project.title} - ${project.summary}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-500 ease-[var(--e1)] group-hover:scale-105"
            priority={project.order <= 2}
          />

          {/* Concept Badge */}
          {project.kind === "concept" && (
            <div className="absolute top-4 left-4 z-10 bg-[var(--K)] border-2 border-[var(--W15)] px-3 py-1 text-[10px] font-mono uppercase tracking-widest text-[var(--W55)]">
              Concept / Self-Initiated
            </div>
          )}

          {/* Year Badge */}
          <div className="absolute top-4 right-4 z-10 bg-[var(--K)] border-2 border-[var(--W15)] px-3 py-1 text-[11px] font-mono text-[var(--W)]">
            {project.year}
          </div>
        </div>

        {/* Card Footer Details */}
        <div className="p-6 sm:p-8 space-y-3 bg-[var(--K3)]">
          <div className="flex items-center justify-between gap-4">
            <Label className="text-[11px]">
              {project.sector} · {project.services.join(" / ")}
            </Label>
            <span className="font-mono text-xs text-[var(--W35)] group-hover:text-[var(--R)] transition-colors">
              VIEW →
            </span>
          </div>

          <h3 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-[var(--W)] group-hover:text-[var(--R)] transition-colors">
            {project.title}
          </h3>

          <p className="type-body text-sm text-[var(--W55)] line-clamp-2">
            {project.summary}
          </p>
        </div>
      </Card>
    </Link>
  );
}
