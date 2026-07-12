import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import { portfolioData } from "@/data/projects";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-12">
        <div className="max-w-3xl mx-auto px-6 py-16">
          {/* Header */}
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl font-medium text-white">Demo Library</h1>
              <span className="text-[10px] text-[#6a6a6a] bg-[#1a1a1a] border border-[#2a2a2a] px-2 py-0.5 rounded-full">
                PRIVATE
              </span>
            </div>
            <p className="text-sm text-[#a0a0a0]">
              Interview-only demo reel
            </p>
            <p className="text-sm text-[#6a6a6a] mt-1">
              Not for public distribution. All rights reserved.
            </p>
          </div>

          {/* Project List */}
          <div className="divide-y-0">
            {portfolioData.projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-[#2a2a2a]">
            <div className="flex items-center gap-6">
              <a
                href={portfolioData.github}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150"
              >
                Github
              </a>
              <a
                href={portfolioData.resume}
                rel="nofollow"
                className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150"
              >
                Resume
              </a>
              <a
                href={`mailto:${portfolioData.email}`}
                rel="nofollow"
                className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150"
              >
                Email
              </a>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
