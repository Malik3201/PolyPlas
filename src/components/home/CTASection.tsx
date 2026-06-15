import { ArrowRight, Phone } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import Link from "next/link";
import { buildWhatsAppUrl } from "@/lib/utils";
import type { SiteSettingsLean } from "@/types";

interface CTASectionProps {
  settings: SiteSettingsLean | null;
}

export default function CTASection({ settings }: CTASectionProps) {
  const whatsappUrl = settings
    ? buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappDefaultMessage)
    : "#";

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="relative rounded-4xl overflow-hidden bg-brand-gradient">
          <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
            <p className="text-brand-100 text-xs font-bold tracking-[0.2em] uppercase mb-4">
              Start Your Order
            </p>
            <h2 className="heading-display text-3xl sm:text-5xl text-white mb-5 max-w-2xl mx-auto leading-tight">
              Get a custom quote in{" "}
              <span className="italic text-brand-100">under 24 hours</span>
            </h2>
            <p className="text-white/80 text-base leading-relaxed mb-10 max-w-lg mx-auto">
              Tell us what you need — product, quantity, delivery location — and we&apos;ll
              send competitive pricing directly to your WhatsApp.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-10 py-4 rounded-full transition-colors"
              >
                <WhatsAppIcon size={20} />
                Chat on WhatsApp
              </a>
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 text-white font-semibold px-10 py-4 rounded-full border-2 border-white/30 hover:bg-white/10 transition-colors"
              >
                Browse Products
                <ArrowRight size={16} />
              </Link>
            </div>

            {settings?.phone && (
              <p className="mt-8 text-white/60 text-sm flex items-center justify-center gap-2">
                <Phone size={14} />
                Or call us at {settings.phone}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
