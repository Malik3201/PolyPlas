"use client";

import { buildWhatsAppUrl, buildProductWhatsAppMessage } from "@/lib/utils";

export function useWhatsApp(number: string, defaultMessage: string) {
  function openWhatsApp(customMessage?: string) {
    const message = customMessage || defaultMessage;
    const url = buildWhatsAppUrl(number, message);
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function openForProduct(productTitle: string) {
    const message = buildProductWhatsAppMessage(productTitle, defaultMessage);
    openWhatsApp(message);
  }

  return { openWhatsApp, openForProduct };
}
