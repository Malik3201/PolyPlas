import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { getProducts } from "@/app/actions/products";
import { getCategories } from "@/app/actions/categories";
import { getSiteSettings } from "@/app/actions/settings";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import EmptyState from "@/components/ui/EmptyState";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { HERO_FALLBACK_IMAGE } from "@/lib/images";

export const metadata: Metadata = {
  title: "Shop All Products",
  description: "Browse our complete range of premium disposable products.",
};

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{
    category?: string;
    page?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || "1");
  const categorySlug = params.category;
  const search = params.search;

  const [categories, settings] = await Promise.all([
    getCategories(true),
    getSiteSettings(),
  ]);

  let categoryId: string | undefined;
  if (categorySlug) {
    const cat = categories.find((c) => c.slug === categorySlug);
    categoryId = cat?._id as string;
  }

  const { items: products, total, totalPages } = await getProducts({
    category: categoryId,
    page: currentPage,
    pageSize: 12,
    status: "active",
    search,
  });

  const activeCategory = categories.find((c) => c.slug === categorySlug);

  return (
    <>
      {/* Hero banner */}
      <div className="relative h-64 sm:h-80 overflow-hidden -mt-[120px] lg:-mt-[140px] pt-[120px] lg:pt-[140px]">
        <Image
          src={HERO_FALLBACK_IMAGE}
          alt="Products"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/85 via-brand-800/70 to-brand-600/50" />
        <div className="container-site relative z-10 h-full flex flex-col justify-end pb-10">
          <p className="section-label mb-2">Our Collection</p>
          <h1 className="heading-display text-4xl sm:text-5xl text-white mb-2">
            {activeCategory ? activeCategory.name : search ? `Results for "${search}"` : "All Products"}
          </h1>
          <p className="text-cream-200/70">
            {total} product{total !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <div className="container-site py-12 bg-gradient-to-b from-transparent to-brand-50/30">
        <div className="mb-8">
          <Suspense fallback={<div className="h-10" />}>
            <ProductFilter categories={categories} activeCategory={categorySlug} />
          </Suspense>
        </div>

        {products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {products.map((product) => (
                <ProductCard key={product._id as string} product={product} settings={settings} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-3 mt-16">
                {currentPage > 1 && (
                  <Link
                    href={`/products?${categorySlug ? `category=${categorySlug}&` : ""}${search ? `search=${search}&` : ""}page=${currentPage - 1}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-cream-300 text-sm font-semibold text-ink-muted hover:border-brand-400 hover:text-brand-700 transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </Link>
                )}
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Link
                      key={page}
                      href={`/products?${categorySlug ? `category=${categorySlug}&` : ""}${search ? `search=${search}&` : ""}page=${page}`}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                        page === currentPage
                          ? "bg-brand-600 text-white"
                          : "text-ink-muted hover:bg-cream-200"
                      }`}
                    >
                      {page}
                    </Link>
                  ))}
                </div>
                {currentPage < totalPages && (
                  <Link
                    href={`/products?${categorySlug ? `category=${categorySlug}&` : ""}${search ? `search=${search}&` : ""}page=${currentPage + 1}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-cream-300 text-sm font-semibold text-ink-muted hover:border-brand-400 hover:text-brand-700 transition-colors"
                  >
                    Next
                    <ChevronRight size={16} />
                  </Link>
                )}
              </div>
            )}
          </>
        ) : (
          <EmptyState
            title="No products found"
            description="Try a different category or check back later."
          />
        )}
      </div>
    </>
  );
}
