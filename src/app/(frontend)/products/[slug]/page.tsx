export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Star, Wrench, Tag, Shield, Truck, CheckCircle } from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/app/actions/products";
import { getSiteSettings } from "@/app/actions/settings";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import ProductCard from "@/components/products/ProductCard";
import ProductImageGallery from "@/components/products/ProductImageGallery";
import Badge from "@/components/ui/Badge";
import { buildProductWhatsAppMessage } from "@/lib/utils";
import type { CategoryLean } from "@/types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  const image = product.images.find((i) => i.isPrimary) || product.images[0];
  return {
    title: product.title,
    description: product.shortDescription || product.description.slice(0, 160),
    openGraph: image ? { images: [{ url: image.url }] } : undefined,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) notFound();

  const category = product.category as CategoryLean;
  const relatedProducts = await getRelatedProducts(
    product._id as string,
    typeof category === "object" ? (category._id as string) : (category as string),
    4
  );

  const whatsappMessage = buildProductWhatsAppMessage(
    product.title,
    settings?.whatsappDefaultMessage || "Hello! I'd like to enquire about a product."
  );
  const whatsappNumber = settings?.whatsappNumber || "";

  return (
    <div className="pb-20">
      <div className="container-site pt-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-ink-faint mb-10">
          <Link href="/" className="hover:text-brand-700 transition-colors">Home</Link>
          <span className="text-cream-400">/</span>
          <Link href="/products" className="hover:text-brand-700 transition-colors">Shop</Link>
          {category && typeof category === "object" && (
            <>
              <span className="text-cream-400">/</span>
              <Link
                href={`/categories/${category.slug}`}
                className="hover:text-brand-700 transition-colors"
              >
                {category.name}
              </Link>
            </>
          )}
          <span className="text-cream-400">/</span>
          <span className="text-ink font-medium truncate max-w-[200px]">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          <ProductImageGallery images={product.images} title={product.title} />

          <div className="lg:pt-4">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {category && typeof category === "object" && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="badge-category hover:bg-brand-100 transition-colors"
                >
                  {category.name}
                </Link>
              )}
              {product.isFeatured && (
                <Badge variant="warning">
                  <Star size={10} />
                  Featured
                </Badge>
              )}
              {product.isCustomItem && (
                <Badge variant="info">
                  <Wrench size={10} />
                  Custom Available
                </Badge>
              )}
            </div>

            <h1 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-ink mb-5 leading-tight">
              {product.title}
            </h1>

            {product.shortDescription && (
              <p className="text-ink-muted text-lg leading-relaxed mb-8">
                {product.shortDescription}
              </p>
            )}

            {/* Trust badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              {[
                { icon: Shield, text: "Food Safe" },
                { icon: Truck, text: "Bulk Delivery" },
                { icon: CheckCircle, text: "Quality Assured" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-sm text-ink-muted">
                  <item.icon size={16} className="text-brand-500" />
                  {item.text}
                </div>
              ))}
            </div>

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-brand-50 to-cream-100 rounded-3xl p-6 mb-8 border border-brand-100">
              <p className="text-sm font-semibold text-brand-800 mb-1">Interested in this product?</p>
              <p className="text-ink-muted text-sm mb-4">
                Get instant pricing and availability via WhatsApp.
              </p>
              <WhatsAppButton
                number={whatsappNumber}
                message={whatsappMessage}
                label="Enquire on WhatsApp"
                size="lg"
                className="w-full rounded-full"
              />
            </div>

            {product.tags.length > 0 && (
              <div className="flex flex-wrap items-center gap-2">
                <Tag size={14} className="text-ink-faint" />
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-cream-200 text-ink-muted text-xs font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {product.description && (
          <div className="mb-20 max-w-3xl">
            <h2 className="font-display text-2xl text-ink mb-6">Product Details</h2>
            <div className="prose prose-stone max-w-none text-ink-muted leading-relaxed">
              {product.description.split("\n").map((para, i) => (
                <p key={i} className="mb-3 last:mb-0">
                  {para}
                </p>
              ))}
            </div>
          </div>
        )}

        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-display text-3xl text-ink">You May Also Like</h2>
              {category && typeof category === "object" && (
                <Link
                  href={`/categories/${category.slug}`}
                  className="text-sm font-semibold text-brand-600 hover:text-brand-800 transition-colors"
                >
                  View all in {category.name} →
                </Link>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <ProductCard key={p._id as string} product={p} settings={settings} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
