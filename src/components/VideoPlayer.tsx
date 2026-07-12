"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Maximize, Minimize, VideoOff } from "lucide-react";
import { useVideoPlayback } from "@/contexts/VideoPlaybackContext";
import { getVideoUrl } from "@/config/video";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

function isVideoFile(src: string): boolean {
  const videoExts = [".mp4", ".webm", ".mov", ".avi", ".mkv", ".m4v"];
  return videoExts.some((ext) => src.toLowerCase().endsWith(ext));
}

function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export default function VideoPlayer({ src, poster, className }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showRateMenu, setShowRateMenu] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const { requestPlay, releaseVideo } = useVideoPlayback();
  const resolvedSrc = getVideoUrl(src);
  const resolvedPoster = poster ? getVideoUrl(poster) : undefined;
  const isVideo = isVideoFile(src);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  useEffect(() => {
    setVideoError(false);
  }, [src]);

  // Release video on unmount
  useEffect(() => {
    const el = videoRef.current;
    return () => {
      if (el) releaseVideo(el);
    };
  }, [releaseVideo]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current || !isVideo) return;
    if (isPlaying) {
      videoRef.current.pause();
      releaseVideo(videoRef.current);
      setIsPlaying(false);
    } else {
      requestPlay(videoRef.current);
      setIsPlaying(true);
    }
  }, [isPlaying, isVideo, requestPlay, releaseVideo]);

  const handleEnded = () => {
    setIsPlaying(false);
    if (videoRef.current) releaseVideo(videoRef.current);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!isFullscreen) {
      containerRef.current.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleError = () => {
    setVideoError(true);
  };

  const setRate = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
      setShowRateMenu(false);
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = x / rect.width;
    videoRef.current.currentTime = percentage * duration;
  };

  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];

  // Placeholder state for non-video files
  if (!isVideo || videoError) {
    return (
      <div
        ref={containerRef}
        className={`relative bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#2a2a2a] ${className || ""}`}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <VideoOff className="w-8 h-8 text-[#3a3a3a]" />
          <p className="text-xs text-[#6a6a6a]">
            {videoError ? "Video failed to load" : "Placeholder — add .mp4 file"}
          </p>
          {resolvedPoster && (
            <img
              src={resolvedPoster}
              alt="Video poster"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative group bg-black rounded-lg overflow-hidden ${className || ""}`}
    >
      <video
        ref={videoRef}
        src={resolvedSrc}
        poster={resolvedPoster}
        className="w-full h-full object-contain cursor-pointer"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onError={handleError}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={handleEnded}
        onClick={togglePlay}
        playsInline
        disablePictureInPicture
        controlsList="nodownload"
        preload="metadata"
      />

      {/* Big play button overlay */}
      {!isPlaying && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
          onClick={togglePlay}
        >
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/90 hover:bg-white transition-colors duration-150">
            <Play className="w-6 h-6 text-black ml-0.5" />
          </div>
        </div>
      )}

      {/* Controls bar — hover on desktop, always visible on touch */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 transition-opacity duration-200 ${
          isTouch ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
      >
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-white/20 rounded-full mb-2 cursor-pointer"
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
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>

            <span className="text-xs text-white/80 tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Playback rate */}
            <div className="relative">
              <button
                onClick={() => setShowRateMenu(!showRateMenu)}
                className="text-xs text-white/80 hover:text-white transition-colors px-1.5 py-0.5 rounded"
              >
                {playbackRate}x
              </button>
              {showRateMenu && (
                <div className="absolute bottom-full right-0 mb-2 bg-[#1a1a1a] border border-[#2a2a2a] rounded-md py-1 min-w-[60px]">
                  {playbackRates.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setRate(rate)}
                      className={`block w-full text-left px-3 py-1 text-xs hover:bg-[#262626] transition-colors ${
                        playbackRate === rate ? "text-white" : "text-[#a0a0a0]"
                      }`}
                    >
                      {rate}x
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="text-white/80 hover:text-white transition-colors"
            >
              {isFullscreen ? (
                <Minimize className="w-4 h-4" />
              ) : (
                <Maximize className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
