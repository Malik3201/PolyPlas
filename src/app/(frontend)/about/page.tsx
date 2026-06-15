import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Package, Truck, Users } from "lucide-react";
import { getSiteSettings } from "@/app/actions/settings";
import { buildWhatsAppUrl } from "@/lib/utils";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { ABOUT_IMAGE, HERO_IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Lasani Disposables — your trusted source for premium disposable products.",
};

const values = [
  {
    icon: ShieldCheck,
    title: "Uncompromising Quality",
    description:
      "Every product is carefully sourced to meet food safety standards. We never compromise on material quality.",
  },
  {
    icon: Package,
    title: "Wide Product Range",
    description:
      "From delicate disposable glassware to heavy-duty food packaging — everything in one place.",
  },
  {
    icon: Truck,
    title: "Reliable Supply",
    description:
      "Consistent stock levels and fast turnaround for bulk orders. Your operations never stop.",
  },
  {
    icon: Users,
    title: "Customer-First",
    description:
      "Custom orders, flexible quantities, and direct support via WhatsApp. We treat every client as a partner.",
  },
];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const whatsappUrl = settings
    ? buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappDefaultMessage)
    : "#";

  return (
    <>
      {/* Hero */}
      <div className="relative h-72 sm:h-96 overflow-hidden -mt-[120px] lg:-mt-[140px] pt-[120px] lg:pt-[140px]">
        <Image
          src={ABOUT_IMAGE}
          alt="About Lasani Disposables"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-900/85 to-brand-600/50" />
        <div className="container-site relative z-10 h-full flex flex-col justify-center">
          <p className="section-label mb-3">Our Story</p>
          <h1 className="heading-display text-4xl sm:text-6xl text-white mb-4 max-w-2xl">
            Built on Trust, Quality & Service
          </h1>
          <p className="text-cream-200/70 text-lg max-w-xl leading-relaxed">
            Lasani Disposables was founded to provide businesses and households with
            premium disposable products at fair prices.
          </p>
        </div>
      </div>

      <div className="container-site py-20">
        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28">
          <div className="relative rounded-4xl overflow-hidden aspect-[4/5] shadow-soft-xl">
            <Image
              src={HERO_IMAGES.packaging}
              alt="Our products"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="section-label mb-3">Our Mission</p>
            <h2 className="heading-display text-3xl sm:text-4xl text-ink mb-6 leading-snug">
              Making quality disposables accessible to everyone
            </h2>
            <p className="text-ink-muted leading-relaxed mb-4 text-lg">
              We started as a small supplier focused on the local market, and have grown into a
              trusted name for restaurants, caterers, event planners, and retail shops.
            </p>
            <p className="text-ink-muted leading-relaxed mb-8">
              Our philosophy: source great products, keep prices honest, and always be
              available when our customers need us.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
            >
              <WhatsAppIcon size={16} />
              Get in Touch
            </a>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
          {[
            { number: "500+", label: "Products in Stock" },
            { number: "1000+", label: "Happy Clients" },
            { number: "5+", label: "Years Experience" },
            { number: "24h", label: "Quote Response" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-8 rounded-3xl bg-cream-100 border border-cream-200"
            >
              <div className="font-display text-4xl font-bold text-brand-800 mb-1">
                {stat.number}
              </div>
              <div className="text-ink-muted text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="section-label justify-center mb-3">What We Stand For</p>
            <h2 className="heading-display text-3xl sm:text-4xl text-ink">Our Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="p-7 rounded-3xl bg-white border border-cream-200 hover:shadow-soft-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-50 flex items-center justify-center mb-5">
                  <v.icon size={22} className="text-brand-600" />
                </div>
                <h3 className="font-semibold text-ink mb-2">{v.title}</h3>
                <p className="text-ink-muted text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="relative rounded-4xl overflow-hidden">
          <div className="absolute inset-0 bg-brand-gradient" />
          <div className="relative z-10 p-12 sm:p-16 text-center">
            <h2 className="heading-display text-2xl sm:text-4xl text-white mb-4">
              Ready to work with us?
            </h2>
            <p className="text-cream-200/70 mb-8 max-w-md mx-auto">
              Reach out via WhatsApp for a custom quote on any product or bulk order.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp"
              >
                <WhatsAppIcon size={16} />
                Chat on WhatsApp
              </a>
              <Link href="/products" className="inline-flex items-center gap-2 text-white font-semibold px-7 py-3.5 rounded-full border-2 border-white/20 hover:bg-white/10 transition-all">
                Browse Products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
