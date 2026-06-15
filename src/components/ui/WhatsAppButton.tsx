"use client";

import WhatsAppIcon from "@/components/ui/WhatsAppIcon";
import { cn, buildWhatsAppUrl } from "@/lib/utils";

interface WhatsAppButtonProps {
  number: string;
  message: string;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  variant?: "default" | "outline" | "minimal";
}

export default function WhatsAppButton({
  number,
  message,
  label = "Enquire on WhatsApp",
  size = "md",
  className,
  variant = "default",
}: WhatsAppButtonProps) {
  const url = buildWhatsAppUrl(number, message);

  const sizes = {
    sm: "px-3.5 py-2 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-6 py-3 text-base gap-2.5",
  };

  const iconSizes = { sm: 14, md: 16, lg: 18 };

  const variants = {
    default: "bg-[#25D366] hover:bg-[#1ebe5d] text-white shadow-sm hover:shadow-md",
    outline: "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white",
    minimal: "text-[#25D366] hover:text-[#1ebe5d] underline underline-offset-2",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-300 active:scale-[0.98] hover:scale-[1.02]",
        variants[variant],
        sizes[size],
        className
      )}
    >
      <WhatsAppIcon size={iconSizes[size]} />
      {label}
    </a>
  );
}
