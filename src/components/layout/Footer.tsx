import Link from "next/link";
import { Mail, MapPin, Phone, Instagram, Facebook, Youtube, ArrowUpRight } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { buildWhatsAppUrl } from "@/lib/utils";
import type { SiteSettingsLean } from "@/types";

interface FooterProps {
  settings: SiteSettingsLean | null;
}

const defaultLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/products" },
  { label: "About Us", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const categories = [
  { label: "Disposable Cups", href: "/categories/disposable-cups" },
  { label: "Disposable Plates", href: "/categories/disposable-plates" },
  { label: "Disposable Glasses", href: "/categories/disposable-glasses" },
  { label: "Food Packaging", href: "/categories/food-packaging" },
  { label: "Custom Products", href: "/categories/custom-products" },
];

export default function Footer({ settings }: FooterProps) {
  const whatsappUrl = settings
    ? buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappDefaultMessage)
    : "#";

  const footerLinks =
    settings?.footerLinks && settings.footerLinks.length > 0
      ? settings.footerLinks
      : defaultLinks;

  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-950 text-cream-200 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-700/10 rounded-full blur-3xl pointer-events-none" />

      {/* Newsletter strip */}
      <div className="border-b border-white/5">
        <div className="container-site py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="font-display text-2xl sm:text-3xl text-white mb-2">
                Ready to place an order?
              </h3>
              <p className="text-cream-300 text-sm max-w-md">
                Message us on WhatsApp for instant quotes, bulk pricing, and custom product inquiries.
              </p>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shrink-0"
            >
              <WhatsAppIcon size={18} />
              Start a Conversation
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="container-site py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-4 mb-6">
              {settings?.logo?.url ? (
                <span className="inline-flex items-center justify-center bg-white rounded-xl px-4 py-3 shadow-sm">
                  <img
                    src={settings.logo.url}
                    alt={settings.websiteName}
                    className="h-14 sm:h-16 lg:h-[4.25rem] w-auto max-w-[240px] object-contain"
                  />
                </span>
              ) : (
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-brand-gradient flex items-center justify-center shrink-0">
                    <span className="text-white text-lg font-bold font-display">L</span>
                  </div>
                  <span className="font-display text-xl text-white font-semibold">
                    {settings?.websiteName || "Lasani Disposables"}
                  </span>
                </div>
              )}
            </Link>
            <p className="text-cream-300/80 text-sm leading-relaxed max-w-sm mb-6">
              Premium quality disposable products for restaurants, events, and businesses.
              Elegant design meets practical convenience.
            </p>
            {settings?.socialLinks && (
              <div className="flex gap-3">
                {settings.socialLinks.instagram && (
                  <a
                    href={settings.socialLinks.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Instagram"
                  >
                    <Instagram size={16} className="text-cream-200" />
                  </a>
                )}
                {settings.socialLinks.facebook && (
                  <a
                    href={settings.socialLinks.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="Facebook"
                  >
                    <Facebook size={16} className="text-cream-200" />
                  </a>
                )}
                {settings.socialLinks.youtube && (
                  <a
                    href={settings.socialLinks.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                    aria-label="YouTube"
                  >
                    <Youtube size={16} className="text-cream-200" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Shop */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">Shop</h4>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-300/70 hover:text-brand-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">Company</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-cream-300/70 hover:text-brand-300 text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase mb-5">Contact</h4>
            <ul className="space-y-4">
              {settings?.whatsappNumber && (
                <li>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-cream-300/70 hover:text-[#25D366] text-sm transition-colors group"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                      <WhatsAppIcon size={15} />
                    </div>
                    {settings.whatsappNumber}
                  </a>
                </li>
              )}
              {settings?.phone && (
                <li>
                  <a
                    href={`tel:${settings.phone}`}
                    className="flex items-center gap-3 text-cream-300/70 hover:text-brand-300 text-sm transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                      <Phone size={14} />
                    </div>
                    {settings.phone}
                  </a>
                </li>
              )}
              {settings?.email && (
                <li>
                  <a
                    href={`mailto:${settings.email}`}
                    className="flex items-center gap-3 text-cream-300/70 hover:text-brand-300 text-sm transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center">
                      <Mail size={14} />
                    </div>
                    {settings.email}
                  </a>
                </li>
              )}
              {settings?.address && (
                <li className="flex items-start gap-3 text-cream-300/70 text-sm">
                  <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                    <MapPin size={14} />
                  </div>
                  <span>{settings.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="container-site py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-cream-300/50 text-xs">
            © {year} {settings?.websiteName || "Lasani Disposables"}. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-cream-300/40 text-xs">
            <span>Crafted with care for</span>
            <span className="text-brand-300 font-semibold">premium experiences</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
