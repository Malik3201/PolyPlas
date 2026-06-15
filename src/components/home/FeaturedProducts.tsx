import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FeaturedProductsCarousel from "@/components/home/FeaturedProductsCarousel";
import type { ProductLean, SiteSettingsLean } from "@/types";

interface FeaturedProductsProps {
  products: ProductLean[];
  settings: SiteSettingsLean | null;
}

export default function FeaturedProducts({ products, settings }: FeaturedProductsProps) {
  if (!products.length) return null;

  return (
    <section className="section-padding bg-gradient-to-b from-brand-50/60 to-white relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, #F97316 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container-site relative z-10">
        <div className="text-center mb-14">
          <p className="section-label justify-center mb-3">Curated Selection</p>
          <h2 className="heading-display text-4xl sm:text-5xl text-ink mb-4">
            Featured Products
          </h2>
          <p className="text-ink-muted max-w-lg mx-auto">
            Handpicked essentials loved by restaurants, caterers, and event professionals.
          </p>
        </div>

        <FeaturedProductsCarousel products={products} settings={settings} />

        <div className="flex justify-center mt-10">
          <Link href="/products" className="btn-outline group">
            View Full Collection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
