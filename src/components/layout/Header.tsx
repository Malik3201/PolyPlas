"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, ShoppingBag } from "lucide-react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { cn, buildWhatsAppUrl } from "@/lib/utils";
import type { SiteSettingsLean } from "@/types";

interface HeaderProps {
  settings: SiteSettingsLean | null;
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ settings }: HeaderProps) {
  // Solid header — no scroll-dependent styling
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const whatsappUrl = settings
    ? buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappDefaultMessage)
    : "#";

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const headerBg = "bg-white/95 backdrop-blur-md shadow-soft border-b border-cream-200/60";
  const textColor = "text-ink";
  const mutedColor = "text-ink-muted";

  return (
    <>
      <header className={cn("transition-all duration-500", headerBg)}>
        <div className="container-site">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              {settings?.logo?.url ? (
                <img
                  src={settings.logo.url}
                  alt={settings.websiteName}
                  className="h-14 sm:h-16 lg:h-[4.5rem] w-auto max-w-[220px] object-contain object-left"
                />
              ) : (
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 lg:w-12 lg:h-12 rounded-full bg-brand-600 flex items-center justify-center">
                    <span className="text-base font-bold font-display text-white">L</span>
                  </div>
                  <div className="hidden sm:block">
                    <span className={cn("font-display text-2xl font-semibold tracking-tight", textColor)}>
                      {settings?.websiteName?.split(" ")[0] || "Lasani"}
                    </span>
                    <span className={cn("block text-2xs font-semibold tracking-[0.15em] uppercase -mt-0.5", mutedColor)}>
                      Disposables
                    </span>
                  </div>
                </div>
              )}
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-5 py-2 text-sm font-semibold transition-colors duration-200",
                    pathname === link.href ? textColor : cn(mutedColor, "hover:text-brand-700")
                  )}
                >
                  {link.label}
                  {pathname === link.href && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-brand-500" />
                  )}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2.5 rounded-full hover:bg-brand-50 text-ink-muted hover:text-brand-700 transition-colors"
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <Link
                href="/products"
                className="hidden sm:flex p-2.5 rounded-full hover:bg-brand-50 text-ink-muted hover:text-brand-700 transition-colors"
                aria-label="Shop"
              >
                <ShoppingBag size={18} />
              </Link>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-300 hover:scale-105 shadow-md"
              >
                <WhatsAppIcon size={15} />
                Get Quote
              </a>

              <button
                className="lg:hidden p-2.5 rounded-full hover:bg-brand-50 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? (
                  <X size={20} className={textColor} />
                ) : (
                  <Menu size={20} className={textColor} />
                )}
              </button>
            </div>
          </div>

          {/* Search bar */}
          {searchOpen && (
            <div className="pb-4 animate-fade-in">
              <form onSubmit={handleSearch} className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-faint" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-cream-100 border border-cream-300 text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand-300/50 focus:border-brand-400"
                  autoFocus
                />
              </form>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          menuOpen ? "visible" : "invisible"
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-brand-950/60 backdrop-blur-sm transition-opacity duration-500",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white shadow-soft-xl transition-transform duration-500 ease-out",
            menuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full pt-20 pb-8 px-6">
            <nav className="flex-1 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center px-4 py-4 rounded-2xl text-base font-semibold transition-colors",
                    pathname === link.href
                      ? "bg-brand-50 text-brand-800"
                      : "text-ink-muted hover:bg-cream-100 hover:text-ink"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-4 rounded-2xl transition-all duration-200"
            >
              <WhatsAppIcon size={18} />
              Get a Quote on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
