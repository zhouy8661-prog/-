/**
 * Video CDN Configuration
 *
 * 未来接入对象存储时，只需修改 baseUrl：
 *   1. Cloudflare R2:  "https://<bucket>.<account>.r2.cloudflarestorage.com"
 *   2. AWS S3:         "https://<bucket>.s3.<region>.amazonaws.com"
 *   3. 阿里云 OSS:      "https://<bucket>.<region>.aliyuncs.com"
 *   4. 腾讯云 COS:      "https://<bucket>.cos.<region>.myqcloud.com"
 *
 * 或通过环境变量 NEXT_PUBLIC_VIDEO_CDN_URL 动态设置，无需改代码。
 *
 * 用法：
 *   import { getVideoUrl } from "@/config/video";
 *   <VideoPlayer src={getVideoUrl("/projects/guiyuan/trailer.mp4")} />
 *
 * 所有视频 URL 都通过此函数解析，统一管理，方便替换。
 */

export const videoConfig = {
  /** 对象存储 / CDN 基础 URL，留空则使用本地 public 目录 */
  baseUrl: process.env.NEXT_PUBLIC_VIDEO_CDN_URL || "",

  /** 视频是否启用流式加载 (Range requests) */
  streaming: true,

  /** 视频预加载策略 */
  preload: "metadata" as const,
} as const;

/**
 * 解析视频完整 URL
 * - 已是绝对 URL → 直接返回
 * - 配置了 CDN → 拼接 CDN baseUrl
 * - 否则 → 返回本地路径
 */
export function getVideoUrl(path: string): string {
  if (!path) return "";
  if (/^https?:\/\//.test(path)) return path;

  const base = videoConfig.baseUrl;
  if (base) {
    const cleanBase = base.replace(/\/+$/, "");
    const cleanPath = path.replace(/^\/+/, "");
    return `${cleanBase}/${cleanPath}`;
  }

  return path;
}

/**
 * 获取视频海报/缩略图 URL（复用同一 CDN 规则）
 */
export function getThumbnailUrl(path: string): string {
  return getVideoUrl(path);
}
