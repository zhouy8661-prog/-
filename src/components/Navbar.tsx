"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Library" },
  { href: "/about", label: "About" },
];

const externalLinks = [
  { href: "https://github.com", label: "Github" },
  { href: "/resume.pdf", label: "Resume" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#111111]/80 backdrop-blur-sm border-b border-[#2a2a2a]">
      <nav className="max-w-5xl mx-auto px-6 h-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors duration-150 ${
                pathname === link.href
                  ? "text-white"
                  : "text-[#a0a0a0] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-6">
          {externalLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={link.href.startsWith("http") ? "noopener noreferrer nofollow" : "nofollow"}
              className="text-sm text-[#a0a0a0] hover:text-white transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}
