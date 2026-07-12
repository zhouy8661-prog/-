"use client";

import { VideoPlaybackProvider } from "@/contexts/VideoPlaybackContext";
import type { ReactNode } from "react";

export default function VideoPlaybackWrapper({ children }: { children: ReactNode }) {
  return <VideoPlaybackProvider>{children}</VideoPlaybackProvider>;
}
