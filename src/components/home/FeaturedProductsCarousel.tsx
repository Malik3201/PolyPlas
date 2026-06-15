"use client";

import ProductCard from "@/components/products/ProductCard";
import SectionSwiper from "@/components/ui/SectionSwiper";
import type { ProductLean, SiteSettingsLean } from "@/types";

interface FeaturedProductsCarouselProps {
  products: ProductLean[];
  settings: SiteSettingsLean | null;
}

export default function FeaturedProductsCarousel({
  products,
  settings,
}: FeaturedProductsCarouselProps) {
  return (
    <SectionSwiper
      showNavigation={products.length > 3}
      spaceBetween={28}
      slidesPerView={1}
      breakpoints={{
        640: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 28,
        },
      }}
      className="px-2 sm:px-6 lg:px-8"
    >
      {products.map((product) => (
        <ProductCard
          key={product._id as string}
          product={product}
          settings={settings}
        />
      ))}
    </SectionSwiper>
  );
}
