import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateSlug(text: string): string {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
    replacement: "-",
  });
}

export function buildWhatsAppUrl(number: string, message: string): string {
  const cleaned = number.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${cleaned}?text=${encoded}`;
}

export function buildProductWhatsAppMessage(
  productTitle: string,
  defaultMessage: string
): string {
  return `${defaultMessage}\n\nProduct: *${productTitle}*`;
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength - 3) + "...";
}

export function formatImageKitUrl(
  url: string,
  transforms?: {
    width?: number;
    height?: number;
    quality?: number;
    format?: "webp" | "avif" | "jpg" | "png";
    crop?: "maintain_ratio" | "force" | "at_max" | "at_least";
  }
): string {
  if (!url || !url.includes("ik.imagekit.io")) return url;

  const parts: string[] = [];
  if (transforms?.width) parts.push(`w-${transforms.width}`);
  if (transforms?.height) parts.push(`h-${transforms.height}`);
  if (transforms?.quality) parts.push(`q-${transforms.quality}`);
  if (transforms?.format) parts.push(`f-${transforms.format}`);
  if (transforms?.crop) parts.push(`c-${transforms.crop}`);

  if (!parts.length) return url;

  const transformStr = `tr:${parts.join(",")}`;

  const urlObj = new URL(url);
  const pathParts = urlObj.pathname.split("/");
  pathParts.splice(2, 0, transformStr);
  urlObj.pathname = pathParts.join("/");

  return urlObj.toString();
}

export function getImageKitThumbnail(url: string): string {
  return formatImageKitUrl(url, { width: 400, height: 400, quality: 80, crop: "maintain_ratio" });
}

export function serializeDocument<T>(doc: unknown): T {
  return JSON.parse(JSON.stringify(doc)) as T;
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(date));
}
