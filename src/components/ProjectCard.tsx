import Link from "next/link";
import { ArrowRight, Play, FolderOpen } from "lucide-react";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group border-b border-[#2a2a2a] py-10 first:pt-0 last:border-b-0">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-medium text-white mb-1.5">
              <Link
                href={`/project/${project.id}`}
                className="hover:text-[#e5e5e5] transition-colors duration-150"
              >
                {project.title}
              </Link>
            </h2>
            <p className="text-sm text-[#a0a0a0] max-w-lg leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 text-[11px] text-[#a0a0a0] bg-[#1a1a1a] border border-[#2a2a2a] rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/project/${project.id}`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-white text-black rounded-md hover:bg-[#e5e5e5] transition-all duration-150"
          >
            <Play className="w-3.5 h-3.5" />
            Demo Reel
          </Link>
          <Link
            href={`/project/${project.id}#features`}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-white border border-[#2a2a2a] rounded-md hover:bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all duration-150"
          >
            <FolderOpen className="w-3.5 h-3.5" />
            Feature Clips
          </Link>
          <Link
            href={`/project/${project.id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150"
          >
            View Details
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
