import Image from "next/image";
import { ArrowRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/utils";
import { HERO_SIDE_IMAGE } from "@/lib/images";
import type { SiteSettingsLean } from "@/types";

interface HeroSectionProps {
  settings: SiteSettingsLean | null;
}

export default function HeroSection({ settings }: HeroSectionProps) {
  const whatsappUrl = settings
    ? buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappDefaultMessage)
    : "#";

  const heroTitle = settings?.heroTitle || "Premium Disposable Products";
  const heroSubtitle =
    settings?.heroSubtitle ||
    "Cups, plates, glasses, cutlery, and food packaging for restaurants, caterers, and events. Bulk pricing with fast WhatsApp quotes.";

  const heroBgImage = settings?.heroImage?.url;

  return (
    <section className="relative overflow-hidden border-b border-brand-100 min-h-[520px] lg:min-h-[600px] flex items-center">
      {/* Base tint — visible when no admin image */}
      <div className="absolute inset-0 bg-brand-50 pointer-events-none" aria-hidden />

      {/* Admin background image */}
      {heroBgImage && (
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <Image
            src={heroBgImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* Light orange overlay — always on */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden
        style={{
          background:
            "linear-gradient(105deg, rgba(255,237,213,0.94) 0%, rgba(254,215,170,0.88) 42%, rgba(253,186,116,0.72) 100%)",
        }}
      />

      <div className="container-site relative z-10 w-full py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="max-w-xl order-2 lg:order-1">
            <p className="inline-flex items-center gap-2 text-brand-700 text-xs font-bold uppercase tracking-[0.2em] mb-5 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-brand-200">
              Wholesale &amp; Retail Supply
            </p>

            <h1 className="heading-display text-4xl sm:text-5xl lg:text-[3.25rem] text-ink mb-6 leading-[1.08]">
              {heroTitle}
            </h1>

            <p className="text-ink-light text-base sm:text-lg leading-relaxed mb-9 max-w-lg">
              {heroSubtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-md"
              >
                <WhatsAppIcon size={18} />
                Get a Quote
              </a>
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-7 py-3.5 rounded-full transition-colors shadow-md"
              >
                Shop Products
                <ArrowRight size={16} />
              </Link>
            </div>

            <ul className="mt-10 pt-8 border-t border-brand-200/80 flex flex-wrap gap-x-8 gap-y-2 text-sm font-medium text-ink-muted">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                Food-safe materials
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                Bulk order pricing
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                Custom branding
              </li>
            </ul>
          </div>

          {/* Product showcase */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              <div className="absolute -inset-3 rounded-[2rem] bg-white/40 blur-sm pointer-events-none" />
              <div className="relative rounded-3xl bg-white p-6 sm:p-8 shadow-soft-lg border border-white/90">
                <Image
                  src={HERO_SIDE_IMAGE}
                  alt="Disposable cups, plates, containers and packaging"
                  width={640}
                  height={480}
                  priority
                  unoptimized
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
