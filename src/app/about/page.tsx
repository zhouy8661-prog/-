import Navbar from "@/components/Navbar";
import { getAssetUrl } from "@/config/video";
import { portfolioData } from "@/data/projects";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-12">
        <div className="max-w-3xl mx-auto px-6 py-16">
          <h1 className="text-2xl font-medium text-white mb-6">About</h1>

          <p className="text-sm text-[#a0a0a0] leading-relaxed max-w-lg mb-10">
            {portfolioData.about}
          </p>

          <div className="flex items-center gap-6 pt-6 border-t border-[#2a2a2a]">
            <a
              href={portfolioData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150"
            >
              Github
            </a>
            <a
              href={getAssetUrl(portfolioData.resume)}
              className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150"
            >
              Resume
            </a>
            <a
              href={`mailto:${portfolioData.email}`}
              className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150"
            >
              Email
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
