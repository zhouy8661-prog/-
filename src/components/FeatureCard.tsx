"use client";

import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import type { FeatureClip } from "@/data/projects";

interface FeatureCardProps {
  clip: FeatureClip;
}

function isVideoFile(src: string): boolean {
  const videoExts = [".mp4", ".webm", ".mov", ".avi", ".mkv", ".m4v"];
  return videoExts.some((ext) => src.toLowerCase().endsWith(ext));
}

export default function FeatureCard({ clip }: FeatureCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const isVideo = isVideoFile(clip.video);

  const togglePlay = () => {
    if (!videoRef.current || !isVideo) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="group border border-[#2a2a2a] rounded-lg overflow-hidden bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all duration-150">
      {/* Media */}
      <div
        className="relative aspect-video bg-black cursor-pointer"
        onClick={togglePlay}
      >
        {isVideo && !videoError ? (
          <video
            ref={videoRef}
            src={clip.video}
            poster={clip.thumbnail}
            className="w-full h-full object-cover"
            onError={() => setVideoError(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
            playsInline
            preload="metadata"
            muted
          />
        ) : (
          <img
            src={clip.thumbnail}
            alt={clip.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Play overlay — only for video files */}
        {isVideo && !videoError && !isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors duration-150">
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors duration-150">
              <Play className="w-4 h-4 text-black ml-0.5" />
            </div>
          </div>
        )}

        {/* Playing indicator */}
        {isVideo && !videoError && isPlaying && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/60">
            <Pause className="w-3 h-3 text-white" />
            <span className="text-[10px] text-white/80">{clip.duration}</span>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60">
          <span className="text-[10px] text-white/80">{clip.duration}</span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3">
        <h4 className="text-sm font-medium text-white mb-0.5">{clip.title}</h4>
        <p className="text-xs text-[#a0a0a0] leading-relaxed">{clip.description}</p>
      </div>
    </div>
  );
}
