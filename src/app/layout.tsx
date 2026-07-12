import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Demo Library",
  description: "Private demo library — interview use only.",
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* noindex / nofollow */}
        <meta name="robots" content="noindex, nofollow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Noto+Sans+SC:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-[#111111] text-white">
        {children}
      </body>
    </html>
  );
}
