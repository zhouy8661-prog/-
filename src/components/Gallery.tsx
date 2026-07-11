"use client";

import { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage } from "@/data/projects";

interface GalleryProps {
  images: GalleryImage[];
}

export default function Gallery({ images }: GalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const open = useCallback((index: number) => setSelectedIndex(index), []);
  const close = useCallback(() => setSelectedIndex(null), []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev + 1) % images.length;
    });
  }, [images.length]);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      return (prev - 1 + images.length) % images.length;
    });
  }, [images.length]);

  // Keyboard events
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, close, goNext, goPrev]);

  // Group by category
  const categories = [...new Set(images.map((img) => img.category))];

  return (
    <>
      {/* Grid */}
      <div className="space-y-8">
        {categories.map((category) => {
          const categoryImages = images.filter((img) => img.category === category);
          return (
            <div key={category}>
              <h3 className="text-xs font-medium text-[#a0a0a0] uppercase tracking-wider mb-3">
                {category}
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {categoryImages.map((image, idx) => {
                  const globalIndex = images.indexOf(image);
                  return (
                    <button
                      key={idx}
                      onClick={() => open(globalIndex)}
                      className="aspect-video bg-[#1a1a1a] border border-[#2a2a2a] rounded-md overflow-hidden cursor-pointer hover:border-[#3a3a3a] transition-all duration-150 group"
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-200"
                        loading="lazy"
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center">
          {/* Backdrop click to close */}
          <div className="absolute inset-0" onClick={close} />

          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-4 left-4 text-sm text-white/60 z-10">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Previous */}
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-4 text-white/60 hover:text-white transition-colors z-10 p-2"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          {/* Image */}
          <div className="max-w-[90vw] max-h-[85vh] flex items-center justify-center z-10">
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
          >
            <ChevronRight className="w-8 h-8" />
          </button>

          {/* Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/60 z-10">
            {images[selectedIndex].alt}
          </div>
        </div>
      )}
    </>
  );
}
