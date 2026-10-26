"use client";

import { cn } from "@/lib/cn";

export const SECTORS = [
  { id: "all", label: "All Work" },
  { id: "startups", label: "Startups" },
  { id: "fintech", label: "Fintech" },
  { id: "hospitality", label: "Hospitality" },
  { id: "institutions", label: "Institutions" },
  { id: "lifestyle", label: "Lifestyle" },
];

interface ProjectFilterProps {
  activeSector: string;
  onSelect: (sector: string) => void;
}

export default function ProjectFilter({
  activeSector,
  onSelect,
}: ProjectFilterProps) {
  return (
    <div className="sticky top-20 z-20 py-4 bg-[var(--K)]/90 backdrop-blur-md border-y-2 border-[var(--W15)]">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        {SECTORS.map((sector) => {
          const isActive = activeSector === sector.id;
          return (
            <button
              key={sector.id}
              type="button"
              onClick={() => onSelect(sector.id)}
              className={cn(
                "px-4 py-2 text-xs font-mono uppercase tracking-wider transition-all whitespace-nowrap border-2",
                isActive
                  ? "bg-[var(--R)] text-[var(--W)] border-[var(--W)] shadow-[3px_3px_0_var(--W)]"
                  : "bg-[var(--K3)] text-[var(--W55)] border-[var(--W15)] hover:border-[var(--W)] hover:text-[var(--W)]"
              )}
            >
              {sector.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
