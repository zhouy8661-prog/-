import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出：生成纯静态文件，可直接托管到 GitHub Pages（无需 Node 服务器）
  output: "export",

  // GitHub Pages 项目页子路径（如 /-/）。构建时通过 NEXT_PUBLIC_BASE_PATH 注入，
  // 仓库改名后（如 portfolio）URL 会自动变为 /portfolio/。
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",

  // 让子路径下的相对资源解析更稳定
  trailingSlash: true,

  images: {
    unoptimized: true,
  },
};

export default nextConfig;
