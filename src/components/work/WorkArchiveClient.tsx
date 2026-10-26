"use client";

import { useState } from "react";
import { type Project } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import ProjectFilter from "./ProjectFilter";

interface WorkArchiveClientProps {
  initialProjects: Project[];
}

export default function WorkArchiveClient({
  initialProjects,
}: WorkArchiveClientProps) {
  const [activeSector, setActiveSector] = useState("all");

  const filteredProjects =
    activeSector === "all"
      ? initialProjects
      : initialProjects.filter(
          (p) => p.sector.toLowerCase() === activeSector.toLowerCase()
        );

  return (
    <div className="space-y-12">
      {/* Sticky Filter Bar */}
      <ProjectFilter
        activeSector={activeSector}
        onSelect={(sector) => setActiveSector(sector)}
      />

      {/* Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="p-16 border-2 border-[var(--W15)] bg-[var(--K3)] text-center space-y-4">
          <p className="font-display font-bold text-2xl text-[var(--W)]">
            No projects in this category yet.
          </p>
          <p className="type-body text-sm text-[var(--W55)]">
            We are continuously updating case studies from our studio archives.
          </p>
          <button
            type="button"
            onClick={() => setActiveSector("all")}
            className="btn-ghost !py-2 !px-4 text-xs"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
