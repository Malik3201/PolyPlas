export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getCategoryBySlug } from "@/app/actions/categories";
import { getProductsByCategorySlug } from "@/app/actions/products";
import { getSiteSettings } from "@/app/actions/settings";
import ProductCard from "@/components/products/ProductCard";
import EmptyState from "@/components/ui/EmptyState";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getCategoryImage } from "@/lib/images";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: category.name,
    description: category.description || `Browse our ${category.name} collection.`,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const sp = await searchParams;
  const currentPage = parseInt(sp.page || "1");

  const [category, settings] = await Promise.all([
    getCategoryBySlug(slug),
    getSiteSettings(),
  ]);

  if (!category) notFound();

  const { items: products, total, totalPages } = await getProductsByCategorySlug(
    slug,
    currentPage,
    12
  );

  const bannerImage = getCategoryImage(slug, category.image?.url);

  return (
    <>
      {/* Category hero */}
      <div className="relative h-56 sm:h-72 overflow-hidden -mt-[120px] lg:-mt-[140px] pt-[120px] lg:pt-[140px]">
        <Image
          src={bannerImage}
          alt={category.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/80 via-brand-800/60 to-transparent" />
        <div className="container-site relative z-10 h-full flex flex-col justify-end pb-8">
          <nav className="flex items-center gap-2 text-sm text-cream-200/60 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="heading-display text-4xl sm:text-5xl text-white mb-2">{category.name}</h1>
          {category.description && (
            <p className="text-cream-200/70 max-w-lg">{category.description}</p>
          )}
          <p className="text-cream-300/50 text-sm mt-2">
            {total} product{total !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="container-site py-12">
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
                    href={`/categories/${slug}?page=${currentPage - 1}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full border-2 border-cream-300 text-sm font-semibold text-ink-muted hover:border-brand-400 hover:text-brand-700 transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Previous
                  </Link>
                )}
                <span className="text-sm text-ink-faint font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                {currentPage < totalPages && (
                  <Link
                    href={`/categories/${slug}?page=${currentPage + 1}`}
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
            title="No products yet"
            description="Products in this category will appear here soon."
          />
        )}
      </div>
    </>
  );
}
