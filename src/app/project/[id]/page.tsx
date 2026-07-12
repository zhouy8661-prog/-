import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getAssetUrl } from "@/config/video";
import VideoPlayer from "@/components/VideoPlayer";
import FeatureClipsSection from "@/components/FeatureClipsSection";
import Gallery from "@/components/Gallery";
import VideoPlaybackWrapper from "@/components/VideoPlaybackWrapper";
import { portfolioData } from "@/data/projects";

export function generateStaticParams() {
  return portfolioData.projects.map((p) => ({ id: p.id }));
}

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = portfolioData.projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <VideoPlaybackWrapper>
        <main className="flex-1 pt-12">
          <div className="max-w-4xl mx-auto px-6 py-12">
          {/* Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150 mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Library
          </Link>

          {/* Project Header */}
          <div className="mb-12">
            <h1 className="text-2xl font-medium text-white mb-2">
              {project.title}
            </h1>
            <p className="text-sm text-[#a0a0a0] mb-4 max-w-lg leading-relaxed">
              {project.description}
            </p>

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
          </div>

          {/* Trailer Section */}
          {project.trailer && (
            <section className="mb-16">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-0.5 h-4 bg-white" />
                <h2 className="text-base font-medium text-white">
                  {project.trailer.label ?? "Official Trailer"}
                </h2>
              </div>
              <VideoPlayer
                src={project.trailer.video}
                poster={project.trailer.thumbnail}
                className="aspect-video"
              />
            </section>
          )}

          {/* Complete Gameplay Section */}
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-0.5 h-4 bg-white" />
              <h2 className="text-base font-medium text-white">Complete Gameplay</h2>
            </div>
            <VideoPlayer
              src={project.completeDemo.video}
              poster={project.completeDemo.thumbnail}
              className="aspect-video"
            />
          </section>

          {/* Feature Clips Section */}
          <FeatureClipsSection clips={project.featureClips} />

          {/* Gallery Section */}
          {project.gallery.length > 0 && (
            <section className="mb-16">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-0.5 h-4 bg-white" />
                <h2 className="text-base font-medium text-white">Gallery</h2>
              </div>
              <Gallery images={project.gallery} />
            </section>
          )}

          {/* Project PDF */}
          {project.pdf && (
            <section className="mb-16">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-0.5 h-4 bg-white" />
                <h2 className="text-base font-medium text-white">Project PDF</h2>
              </div>
              <a
                href={getAssetUrl(project.pdf)}
                rel="nofollow"
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm bg-white text-black rounded-md hover:bg-[#e5e5e5] transition-all duration-150"
              >
                <FileText className="w-4 h-4" />
                View Project PDF
              </a>
            </section>
          )}

          {/* Back to Library */}
          <div className="pt-8 border-t border-[#2a2a2a]">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Back to Library
            </Link>
          </div>
        </div>
      </main>
      </VideoPlaybackWrapper>
    </>
  );
}
