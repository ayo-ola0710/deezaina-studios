import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import ProjectCard from "@/components/work/ProjectCard";
import Label from "@/components/ui/Label";
import Reveal from "@/components/ui/Reveal";

export default function SelectedWorks() {
  const projects = getAllProjects();

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto space-y-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-[var(--W15)] pb-8">
        <div className="space-y-3 max-w-xl">
          <Label>SELECTED WORKS // THE PROOF</Label>
          <Reveal>
            <h2 className="type-h2 text-[var(--W)]">
              Work That Started With a Diagnosis.
            </h2>
          </Reveal>
        </div>

        <Link
          href="/work"
          className="btn-ghost !py-3 !px-6 !text-xs whitespace-nowrap"
        >
          View All Work ({projects.length}) →
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
