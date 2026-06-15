"use client";

import Link from "next/link";
import Image from "next/image";
import SectionSwiper from "@/components/ui/SectionSwiper";
import { getCategoryImage } from "@/lib/images";
import type { CategoryLean } from "@/types";

interface CategoryCarouselProps {
  items: CategoryLean[];
  defaultLabels: Record<string, string>;
}

export default function CategoryCarousel({
  items,
  defaultLabels,
}: CategoryCarouselProps) {
  return (
    <SectionSwiper
      showNavigation={items.length > 6}
      spaceBetween={20}
      slidesPerView={2.2}
      breakpoints={{
        480: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 28,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 32,
        },
      }}
      className="px-2 sm:px-6 lg:px-8"
      swiperClassName="category-swiper"
    >
      {items.map((cat) => {
        const imageUrl = getCategoryImage(cat.slug, cat.image?.url);
        const label = cat.name || defaultLabels[cat.slug] || "Category";

        return (
          <Link
            key={cat._id as string}
            href={`/categories/${cat.slug}`}
            className="group flex flex-col items-center gap-4 mx-auto w-full max-w-[160px]"
          >
            <div className="relative w-[120px] h-[120px] sm:w-[130px] sm:h-[130px] lg:w-[140px] lg:h-[140px]">
              <div className="absolute inset-0 rounded-full bg-brand-50 scale-100 group-hover:scale-110 transition-transform duration-500 ease-out" />
              <div className="absolute inset-[3px] rounded-full overflow-hidden border-2 border-cream-200 group-hover:border-brand-400 transition-colors duration-300 shadow-soft group-hover:shadow-soft-md">
                <Image
                  src={imageUrl}
                  alt={label}
                  fill
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                  sizes="140px"
                />
              </div>
              <div className="absolute inset-0 rounded-full ring-0 group-hover:ring-4 group-hover:ring-brand-200/60 transition-all duration-300 pointer-events-none" />
            </div>
            <span className="text-sm sm:text-base font-semibold text-ink text-center leading-tight group-hover:text-brand-600 transition-colors duration-300 px-1">
              {label}
            </span>
          </Link>
        );
      })}
    </SectionSwiper>
  );
}
