import Link from "next/link";
import { Star, Wrench, ArrowUpRight } from "lucide-react";
import { buildWhatsAppUrl, buildProductWhatsAppMessage, truncate } from "@/lib/utils";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import ImageKitImage from "@/components/ui/ImageKitImage";
import type { ProductLean, SiteSettingsLean, CategoryLean } from "@/types";

interface ProductCardProps {
  product: ProductLean;
  settings: SiteSettingsLean | null;
}

export default function ProductCard({ product, settings }: ProductCardProps) {
  const primaryImage = product.images.find((img) => img.isPrimary) || product.images[0];
  const category = product.category as CategoryLean;

  const whatsappMessage = settings
    ? buildProductWhatsAppMessage(product.title, settings.whatsappDefaultMessage)
    : `Hello! I'd like to enquire about: ${product.title}`;
  const whatsappUrl = settings
    ? buildWhatsAppUrl(settings.whatsappNumber, whatsappMessage)
    : "#";

  return (
    <article className="group flex flex-col rounded-2xl overflow-hidden border border-brand-200/70 bg-gradient-to-b from-brand-100/70 via-brand-50/40 to-white shadow-[0_4px_24px_rgba(234,88,12,0.1)] hover:shadow-[0_12px_40px_rgba(234,88,12,0.18)] hover:border-brand-400/80 transition-all duration-300 hover:-translate-y-1.5">
      {/* Top accent */}
      <div className="h-1 w-full bg-brand-gradient shrink-0" />

      {/* Image */}
      <Link href={`/products/${product.slug}`} className="block p-4 pb-0">
        <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-brand-200/50 via-orange-100 to-brand-100 ring-1 ring-inset ring-brand-300/30">
          {primaryImage ? (
            <ImageKitImage
              src={primaryImage.url}
              alt={primaryImage.alt || product.title}
              fill
              objectFit="contain"
              transforms={{ width: 600, height: 600, quality: 88, crop: "maintain_ratio" }}
              className="p-4 sm:p-5 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-5xl text-brand-300/80">L</span>
            </div>
          )}

          <div className="absolute inset-0 bg-brand-700/0 group-hover:bg-brand-700/5 transition-colors duration-300" />

          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
            {product.isFeatured && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-600 text-white text-2xs font-semibold shadow-md">
                <Star size={10} className="fill-white" />
                Featured
              </span>
            )}
            {product.isCustomItem && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-brand-700 text-2xs font-semibold border border-brand-300 shadow-sm">
                <Wrench size={10} />
                Custom
              </span>
            )}
          </div>

          <div className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-brand-600 text-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight size={16} />
          </div>
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1 p-5 pt-4">
        {category && typeof category === "object" && (
          <Link
            href={`/categories/${category.slug}`}
            className="inline-flex w-fit items-center px-2.5 py-0.5 rounded-md bg-brand-600/10 text-2xs font-bold text-brand-700 uppercase tracking-[0.12em] hover:bg-brand-600/15 transition-colors"
          >
            {category.name}
          </Link>
        )}

        <Link href={`/products/${product.slug}`} className="mt-2.5 block flex-1">
          <h3 className="font-display text-lg text-ink leading-snug line-clamp-2 group-hover:text-brand-700 transition-colors">
            {product.title}
          </h3>
          {product.shortDescription && (
            <p className="text-ink-muted text-sm leading-relaxed mt-2 line-clamp-2">
              {truncate(product.shortDescription, 85)}
            </p>
          )}
        </Link>

        <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/70 backdrop-blur-sm border border-brand-200/60 p-2 shadow-sm">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold py-2.5 rounded-lg transition-colors shadow-sm"
          >
            <WhatsAppIcon size={15} />
            Get Quote
          </a>
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center px-4 py-2.5 rounded-lg bg-brand-100 hover:bg-brand-200 text-sm font-semibold text-brand-800 border border-brand-200 transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </article>
  );
}
