"use client";

import { useState, useRef, useEffect } from "react";
import { ExternalLink } from "lucide-react";

interface BilibiliPlayerProps {
  bvid: string;
  poster?: string;
  className?: string;
}

/**
 * B站视频嵌入播放器
 * 使用 B站官方 iframe 播放器，国内访问速度极快
 */
export default function BilibiliPlayer({
  bvid,
  poster,
  className,
}: BilibiliPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const embedUrl = `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`;

  useEffect(() => {
    setLoaded(false);
    setError(false);
  }, [bvid]);

  if (error) {
    return (
      <div
        ref={containerRef}
        className={`relative bg-[#0a0a0a] rounded-lg overflow-hidden border border-[#2a2a2a] flex items-center justify-center ${className || ""}`}
      >
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm text-[#6a6a6a]">视频加载失败</p>
          <a
            href={`https://www.bilibili.com/video/${bvid}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#8a8a8a] hover:text-white transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            在B站观看
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden ${className || ""}`}
    >
      {/* Poster / Loading placeholder */}
      {!loaded && (
        <div className="absolute inset-0 z-10 bg-[#0a0a0a] flex items-center justify-center">
          {poster ? (
            <img
              src={poster}
              alt="Video poster"
              className="w-full h-full object-cover opacity-50"
            />
          ) : null}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-white/30 border-t-white animate-spin" />
          </div>
        </div>
      )}

      {/* B站 iframe */}
      <iframe
        src={embedUrl}
        className="w-full h-full"
        style={{ border: "none", minHeight: "400px" }}
        allowFullScreen
        allow="autoplay; fullscreen"
        sandbox="allow-scripts allow-same-origin allow-popups allow-presentation"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        title="Bilibili video player"
      />
    </div>
  );
}

/**
 * 检查字符串是否为有效的 B站 BV号
 */
export function isBilibiliBvid(value: string | undefined): boolean {
  if (!value) return false;
  return /^BV[a-zA-Z0-9]{8,12}$/.test(value);
}

/**
 * 生成 B站视频封面 URL
 */
export function getBilibiliEmbedUrl(bvid: string): string {
  return `https://player.bilibili.com/player.html?bvid=${bvid}&page=1&high_quality=1&danmaku=0&autoplay=0`;
}
