"use client";

import { useState, useEffect } from "react";
import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { cn, buildWhatsAppUrl } from "@/lib/utils";
import type { SiteSettingsLean } from "@/types";

interface FloatingWhatsAppProps {
  settings: SiteSettingsLean | null;
}

export default function FloatingWhatsApp({ settings }: FloatingWhatsAppProps) {
  const [visible, setVisible] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 1500);
    const pulseTimer = setInterval(() => setPulse((p) => !p), 3000);
    return () => {
      clearTimeout(timer);
      clearInterval(pulseTimer);
    };
  }, []);

  const whatsappUrl = settings
    ? buildWhatsAppUrl(settings.whatsappNumber, settings.whatsappDefaultMessage)
    : "#";

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 transition-all duration-500",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      )}
      aria-label="Chat on WhatsApp"
    >
      <span className="hidden sm:block bg-white text-ink text-sm font-semibold px-4 py-2.5 rounded-full shadow-soft-lg border border-cream-200">
        Need help? Chat with us
      </span>
      <div className="relative">
        {pulse && (
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        )}
        <div className="relative w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1ebe5d] flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300">
          <WhatsAppIcon size={26} className="text-white" />
        </div>
      </div>
    </a>
  );
}
