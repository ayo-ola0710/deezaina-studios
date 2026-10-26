import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface Project {
  slug: string;
  title: string;
  client: string;
  sector: "startups" | "fintech" | "hospitality" | "institutions" | "lifestyle" | string;
  year: number;
  services: string[];
  summary: string;
  cover: string;
  liveUrl?: string;
  featured: boolean;
  kind: "client" | "concept";
  deliverables: string[];
  downloadUrl?: string;
  order: number;
  content: string;
}

const projectsDirectory = path.join(process.cwd(), "src/content/projects");

export function getAllProjects(): Project[] {
  if (!fs.existsSync(projectsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(projectsDirectory);
  const projects = fileNames
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(projectsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || fileName.replace(/\.mdx?$/, ""),
        title: data.title || "Untitled Project",
        client: data.client || "",
        sector: data.sector || "startups",
        year: Number(data.year) || new Date().getFullYear(),
        services: Array.isArray(data.services) ? data.services : [],
        summary: data.summary || "",
        cover: data.cover || "/images/projects/velcro-finance/cover.webp",
        liveUrl: data.liveUrl || "",
        featured: Boolean(data.featured),
        kind: (data.kind as "client" | "concept") || "client",
        deliverables: Array.isArray(data.deliverables) ? data.deliverables : [],
        downloadUrl: data.downloadUrl || "",
        order: Number(data.order) || 99,
        content,
      } as Project;
    })
    .sort((a, b) => a.order - b.order);

  return projects;
}

export function getFeaturedProjects(): Project[] {
  return getAllProjects().filter((project) => project.featured);
}

export function getProjectBySlug(slug: string): Project | null {
  const projects = getAllProjects();
  return projects.find((project) => project.slug === slug) || null;
}
