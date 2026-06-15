"use client";

import { useId } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { cn } from "@/lib/utils";
import type { SwiperOptions } from "swiper/types";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface SectionSwiperProps {
  children: React.ReactNode[];
  showNavigation?: boolean;
  className?: string;
  swiperClassName?: string;
  breakpoints?: SwiperOptions["breakpoints"];
  slidesPerView?: number | "auto";
  spaceBetween?: number;
}

export default function SectionSwiper({
  children,
  showNavigation = true,
  className,
  swiperClassName,
  breakpoints,
  slidesPerView = 1,
  spaceBetween = 24,
}: SectionSwiperProps) {
  const id = useId().replace(/:/g, "");
  const prevClass = `swiper-prev-${id}`;
  const nextClass = `swiper-next-${id}`;

  if (!children.length) return null;

  return (
    <div className={cn("relative", className)}>
      {showNavigation && children.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            className={cn(
              prevClass,
              "absolute left-0 top-[42%] -translate-y-1/2 z-10 w-10 h-10 rounded-full",
              "bg-white border border-brand-200 shadow-soft-md flex items-center justify-center",
              "text-brand-600 hover:bg-brand-50 hover:border-brand-300 transition-colors",
              "-translate-x-1 sm:-translate-x-4 lg:-translate-x-5",
              "disabled:opacity-0 disabled:pointer-events-none"
            )}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className={cn(
              nextClass,
              "absolute right-0 top-[42%] -translate-y-1/2 z-10 w-10 h-10 rounded-full",
              "bg-white border border-brand-200 shadow-soft-md flex items-center justify-center",
              "text-brand-600 hover:bg-brand-50 hover:border-brand-300 transition-colors",
              "translate-x-1 sm:translate-x-4 lg:translate-x-5",
              "disabled:opacity-0 disabled:pointer-events-none"
            )}
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      <Swiper
        modules={[Navigation, Pagination]}
        navigation={
          showNavigation
            ? { prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }
            : undefined
        }
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        className={cn("!pb-12", swiperClassName)}
        watchOverflow
      >
        {children.map((child, i) => (
          <SwiperSlide key={i} className="!h-auto">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
