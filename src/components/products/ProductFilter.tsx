"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import type { CategoryLean } from "@/types";

interface ProductFilterProps {
  categories: CategoryLean[];
  activeCategory?: string;
}

export default function ProductFilter({ categories, activeCategory }: ProductFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleCategory = useCallback(
    (slug: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (slug === "all") {
        params.delete("category");
      } else {
        params.set("category", slug);
      }
      params.delete("page");
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  return (
    <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-1">
      <button
        onClick={() => handleCategory("all")}
        className={cn(
          "shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
          !activeCategory
            ? "bg-brand-600 text-white shadow-soft"
            : "bg-white text-ink-muted border border-cream-300 hover:border-brand-300 hover:text-brand-700"
        )}
      >
        All Products
      </button>
      {categories.map((cat) => (
        <button
          key={cat._id as string}
          onClick={() => handleCategory(cat.slug)}
          className={cn(
            "shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
            activeCategory === cat.slug
              ? "bg-brand-600 text-white shadow-soft"
              : "bg-white text-ink-muted border border-cream-300 hover:border-brand-300 hover:text-brand-700"
          )}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
