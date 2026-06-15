"use client";

import Image from "next/image";
import { useState } from "react";
import { cn, formatImageKitUrl } from "@/lib/utils";
import { ImageIcon } from "lucide-react";

interface ImageKitImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  quality?: number;
  priority?: boolean;
  objectFit?: "cover" | "contain" | "fill";
  transforms?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "avif" | "jpg" | "png";
    crop?: "maintain_ratio" | "force" | "at_max" | "at_least";
  };
}

export default function ImageKitImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  quality = 85,
  priority = false,
  objectFit = "cover",
  transforms,
}: ImageKitImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const optimizedSrc = src
    ? formatImageKitUrl(src, transforms || { quality })
    : "";

  if (error || !src) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-stone-100",
          fill ? "absolute inset-0" : "",
          className
        )}
        style={!fill && width && height ? { width, height } : undefined}
      >
        <ImageIcon size={32} className="text-stone-300" />
      </div>
    );
  }

  return (
    <div className={cn("relative overflow-hidden", fill ? "w-full h-full" : "", className)}>
      {!loaded && (
        <div className="absolute inset-0 shimmer" />
      )}
      <Image
        src={optimizedSrc}
        alt={alt}
        {...(fill ? { fill: true } : { width: width || 400, height: height || 400 })}
        quality={quality}
        priority={priority}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          fill ? `object-${objectFit}` : ""
        )}
      />
    </div>
  );
}
