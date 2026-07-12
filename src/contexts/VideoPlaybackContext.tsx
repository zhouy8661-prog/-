"use client";

import { createContext, useContext, useRef, useCallback, type ReactNode } from "react";

interface VideoPlaybackContextType {
  requestPlay: (videoEl: HTMLVideoElement) => void;
  releaseVideo: (videoEl: HTMLVideoElement) => void;
}

const VideoPlaybackContext = createContext<VideoPlaybackContextType | null>(null);

export function VideoPlaybackProvider({ children }: { children: ReactNode }) {
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);

  const requestPlay = useCallback((videoEl: HTMLVideoElement) => {
    if (activeVideoRef.current && activeVideoRef.current !== videoEl) {
      activeVideoRef.current.pause();
    }
    videoEl.play().catch(() => {});
    activeVideoRef.current = videoEl;
  }, []);

  const releaseVideo = useCallback((videoEl: HTMLVideoElement) => {
    if (activeVideoRef.current === videoEl) {
      activeVideoRef.current = null;
    }
  }, []);

  return (
    <VideoPlaybackContext.Provider value={{ requestPlay, releaseVideo }}>
      {children}
    </VideoPlaybackContext.Provider>
  );
}

export function useVideoPlayback() {
  const context = useContext(VideoPlaybackContext);
  if (!context) {
    throw new Error("useVideoPlayback must be used within <VideoPlaybackProvider>");
  }
  return context;
}
