"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Maximize2 } from "lucide-react";
import { useVideoPlayback } from "@/contexts/VideoPlaybackContext";
import { getVideoUrl } from "@/config/video";
import BilibiliPlayer, { isBilibiliBvid } from "@/components/BilibiliPlayer";
import type { FeatureClip } from "@/data/projects";

interface FeatureCardProps {
  clip: FeatureClip;
  onOpenLightbox?: (clip: FeatureClip) => void;
}

function isVideoFile(src: string): boolean {
  const videoExts = [".mp4", ".webm", ".mov", ".avi", ".mkv", ".m4v"];
  return videoExts.some((ext) => src.toLowerCase().endsWith(ext));
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

function formatTime(time: number): string {
  if (!isFinite(time) || time < 0) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function FeatureCard({ clip, onOpenLightbox }: FeatureCardProps) {
  // --- B站优先 ---
  const effectiveBvid = isBilibiliBvid(clip.bilibiliBvid) ? clip.bilibiliBvid! : undefined;

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Real-time video state
  const [currentTime, setCurrentTime] = useState(0);

  const { requestPlay, releaseVideo } = useVideoPlayback();
  const isVideo = isVideoFile(clip.video);
  const resolvedVideo = getVideoUrl(clip.video);
  const resolvedThumb = getVideoUrl(clip.thumbnail);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  // Release video on unmount
  useEffect(() => {
    const el = videoRef.current;
    return () => {
      if (el) releaseVideo(el);
    };
  }, [releaseVideo]);

  // Track current time
  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  }, []);

  const doPlay = useCallback(() => {
    if (!videoRef.current || !isVideo) return;
    if (isTouch) {
      // Mobile: let native controls handle it
      videoRef.current.controls = true;
      const p = videoRef.current.play();
      if (p) p.catch(() => {});
    } else {
      requestPlay(videoRef.current);
    }
    setIsPlaying(true);
  }, [isTouch, isVideo, requestPlay]);

  const doPause = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    releaseVideo(videoRef.current);
    setIsPlaying(false);
  }, [releaseVideo]);

  const togglePlay = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current || !isVideo) return;
    if (isPlaying) {
      doPause();
    } else {
      doPlay();
    }
  }, [isPlaying, isVideo, doPlay, doPause]);

  // Desktop: clicking the card opens the lightbox
  const handleCardClick = useCallback(() => {
    if (!isTouch && isVideo && !videoError && onOpenLightbox) {
      if (videoRef.current) videoRef.current.pause();
      setIsPlaying(false);
      onOpenLightbox(clip);
    }
  }, [isTouch, isVideo, videoError, onOpenLightbox, clip]);

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (videoRef.current) {
      releaseVideo(videoRef.current);
      videoRef.current.controls = false;
    }
  };

  // Duration display: now accurate from ffprobe scan
  const displayDuration = clip.duration;

  return (
    <div
      className="group border border-[#2a2a2a] rounded-lg overflow-hidden bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all duration-150"
    >
      {/* Media */}
      <div
        className={`relative aspect-video bg-black ${!isTouch && isVideo && !videoError && !effectiveBvid ? "cursor-pointer" : ""}`}
        onClick={effectiveBvid ? undefined : handleCardClick}
      >
        {effectiveBvid ? (
          <div className="w-full h-full">
            <BilibiliPlayer bvid={effectiveBvid} poster={resolvedThumb} className="aspect-video" />
          </div>
        ) : isVideo && !videoError ? (
          <video
            ref={videoRef}
            src={resolvedVideo}
            poster={resolvedThumb}
            className="w-full h-full object-cover"
            onError={() => setVideoError(true)}
            onPlay={() => setIsPlaying(true)}
            onPause={() => { setIsPlaying(false); if (videoRef.current) videoRef.current.controls = false; }}
            onEnded={handleEnded}
            onTimeUpdate={handleTimeUpdate}
            playsInline
            disablePictureInPicture
            controlsList="nodownload"
            preload="metadata"
            muted
          />
        ) : (
          <img
            src={resolvedThumb}
            alt={clip.title}
            className="w-full h-full object-cover"
          />
        )}

        {/* Play overlay — desktop only (only for native video) */}
        {!effectiveBvid && isVideo && !videoError && !isPlaying && !isTouch && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors duration-150" onClick={togglePlay}>
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white/90 group-hover:bg-white transition-colors duration-150">
              <Play className="w-4 h-4 text-black ml-0.5" />
            </div>
          </div>
        )}

        {/* Mobile play hint (only for native video) */}
        {!effectiveBvid && isVideo && !videoError && !isPlaying && isTouch && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer" onClick={togglePlay}>
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white/90">
              <Play className="w-5 h-5 text-black ml-0.5" />
            </div>
          </div>
        )}

        {/* Desktop hover: maximize button (only for native video) */}
        {!effectiveBvid && isVideo && !videoError && !isTouch && (
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-black/60">
              <Maximize2 className="w-3 h-3 text-white/70" />
              <span className="text-[10px] text-white/70">放大</span>
            </div>
          </div>
        )}

        {/* Playing indicator with real time (only for native video) */}
        {!effectiveBvid && isVideo && !videoError && isPlaying && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded bg-black/60">
            <Pause className="w-3 h-3 text-white" />
            <span className="text-[10px] text-white/80 tabular-nums">
              {formatTime(currentTime)} / {displayDuration}
            </span>
          </div>
        )}

        {/* Duration badge — bottom-right, shows real length */}
        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-black/60">
          <span className="text-[10px] text-white/80 tabular-nums">{displayDuration}</span>
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
