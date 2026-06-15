"use client";

import { useState } from "react";
import ImageKitImage from "@/components/ui/ImageKitImage";
import { cn } from "@/lib/utils";
import { ZoomIn } from "lucide-react";

interface SimpleImage {
  fileId: string;
  url: string;
  alt?: string;
  isPrimary?: boolean;
}

interface ProductImageGalleryProps {
  images: SimpleImage[];
  title: string;
}

export default function ProductImageGallery({ images, title }: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<SimpleImage>(() => {
    return images.find((img) => img.isPrimary) || images[0];
  });

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square rounded-4xl overflow-hidden bg-gradient-to-br from-cream-200 to-cream-300 flex items-center justify-center">
        <span className="font-display text-8xl text-brand-200">L</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-square rounded-4xl overflow-hidden bg-cream-200 group">
        <ImageKitImage
          src={selectedImage.url}
          alt={selectedImage.alt || title}
          fill
          objectFit="cover"
          priority
          transforms={{ width: 900, height: 900, quality: 90 }}
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <ZoomIn size={16} className="text-ink-muted" />
        </div>
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-none">
          {images.map((img, i) => {
            const isSelected = selectedImage.fileId === img.fileId;
            return (
              <button
                key={img.fileId || i}
                onClick={() => setSelectedImage(img)}
                className={cn(
                  "relative w-20 h-20 shrink-0 rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 outline-none",
                  isSelected
                    ? "ring-2 ring-brand-600 ring-offset-2 opacity-100"
                    : "opacity-50 hover:opacity-80"
                )}
              >
                <ImageKitImage
                  src={img.url}
                  alt={img.alt || `${title} thumbnail ${i + 1}`}
                  fill
                  objectFit="cover"
                  transforms={{ width: 200, height: 200, quality: 75 }}
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
