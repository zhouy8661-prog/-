"use client";

import { useState, useCallback } from "react";
import FeatureCard from "@/components/FeatureCard";
import VideoModal from "@/components/VideoModal";
import type { FeatureClip } from "@/data/projects";

interface FeatureClipsSectionProps {
  clips: FeatureClip[];
}

export default function FeatureClipsSection({ clips }: FeatureClipsSectionProps) {
  const [lightboxClip, setLightboxClip] = useState<FeatureClip | null>(null);

  const handleOpenLightbox = useCallback((clip: FeatureClip) => {
    setLightboxClip(clip);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setLightboxClip(null);
  }, []);

  return (
    <>
      <section id="features" className="mb-16">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-0.5 h-4 bg-white" />
          <h2 className="text-base font-medium text-white">Feature Clips</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {clips.map((clip) => (
            <FeatureCard
              key={clip.id}
              clip={clip}
              onOpenLightbox={handleOpenLightbox}
            />
          ))}
        </div>
      </section>

      <VideoModal clip={lightboxClip} onClose={handleCloseLightbox} />
    </>
  );
}
