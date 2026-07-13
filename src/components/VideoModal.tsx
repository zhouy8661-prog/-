"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { X, Play, Pause } from "lucide-react";
import { getVideoUrl } from "@/config/video";
import BilibiliPlayer, { isBilibiliBvid } from "@/components/BilibiliPlayer";
import type { FeatureClip } from "@/data/projects";

interface VideoModalProps {
  clip: FeatureClip | null;
  onClose: () => void;
}

function formatTime(time: number): string {
  if (!isFinite(time) || time < 0) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function VideoModal({ clip, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const resolvedSrc = clip ? getVideoUrl(clip.video) : "";
  const resolvedPoster = clip ? getVideoUrl(clip.thumbnail) : "";
  const effectiveBvid = clip && isBilibiliBvid(clip.bilibiliBvid) ? clip.bilibiliBvid! : undefined;

  // Stop body scroll & listen for ESC
  useEffect(() => {
    if (!clip) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [clip, onClose]);

  // Pause on close
  useEffect(() => {
    if (!clip && videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, [clip]);

  const handleLoadedMetadata = useCallback(() => {
    if (videoRef.current && videoRef.current.duration && isFinite(videoRef.current.duration)) {
      setDuration(videoRef.current.duration);
    }
  }, []);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }, []);

  const handleSeek = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * duration;
  }, [duration]);

  const handleVideoEnded = useCallback(() => {
    setIsPlaying(false);
  }, []);

  if (!clip) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-20"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Feature clip title */}
      <div className="absolute top-4 left-4 text-sm text-white/80 z-20 max-w-[60%] truncate">
        {clip.title}
      </div>

      {/* Video container */}
      <div
        className="relative max-w-[90vw] max-h-[85vh] w-full aspect-video z-10 bg-black rounded-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {effectiveBvid ? (
          <BilibiliPlayer bvid={effectiveBvid} poster={resolvedPoster} className="w-full h-full" />
        ) : (
          <>
            <video
              ref={videoRef}
              src={resolvedSrc}
              poster={resolvedPoster}
              className="w-full h-full object-contain cursor-pointer"
              onLoadedMetadata={handleLoadedMetadata}
              onTimeUpdate={handleTimeUpdate}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={handleVideoEnded}
              onClick={togglePlay}
              playsInline
              controls={false}
              preload="auto"
              muted
            />

            {/* Center play button */}
            {!isPlaying && (
              <div
                className="absolute inset-0 flex items-center justify-center bg-black/20 cursor-pointer"
                onClick={togglePlay}
              >
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors">
                  <Play className="w-7 h-7 text-black ml-0.5" />
                </div>
              </div>
            )}

            {/* Bottom controls bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 pt-8">
              {/* Progress bar */}
              <div
                className="w-full h-1.5 bg-white/20 rounded-full mb-3 cursor-pointer hover:h-2 transition-all"
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-white rounded-full transition-all duration-100"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    className="text-white hover:text-white/80 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5" />
                    ) : (
                      <Play className="w-5 h-5" />
                    )}
                  </button>

                  <span className="text-sm text-white/80 tabular-nums">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
