import { Types } from "mongoose";

// ─── Image ──────────────────────────────────────────────────────────────────

export interface ProductImage {
  fileId: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface SimpleImage {
  fileId: string;
  url: string;
}

// ─── Category ───────────────────────────────────────────────────────────────

export interface ICategory {
  _id: string | Types.ObjectId;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image?: SimpleImage;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type CategoryLean = {
  _id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image?: SimpleImage;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

// ─── Product ─────────────────────────────────────────────────────────────────

export type ProductStatus = "active" | "inactive" | "draft";

export interface IProduct {
  _id: string | Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ICategory | string | Types.ObjectId;
  images: ProductImage[];
  isFeatured: boolean;
  isCustomItem: boolean;
  status: ProductStatus;
  sortOrder: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type ProductLean = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: CategoryLean | string;
  images: ProductImage[];
  isFeatured: boolean;
  isCustomItem: boolean;
  status: ProductStatus;
  sortOrder: number;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

// ─── Site Settings ───────────────────────────────────────────────────────────

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  youtube?: string;
  linkedin?: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface ISiteSettings {
  _id: string | Types.ObjectId;
  websiteName: string;
  logo?: SimpleImage;
  favicon?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: SimpleImage;
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  address: string;
  email: string;
  phone?: string;
  socialLinks: SocialLinks;
  footerLinks: FooterLink[];
  metaTitle?: string;
  metaDescription?: string;
  updatedAt: Date;
}

export type SiteSettingsLean = Omit<ISiteSettings, "_id" | "updatedAt"> & {
  _id: string;
  updatedAt: string;
};

// ─── Server Action Results ───────────────────────────────────────────────────

export interface ActionResult<T = void> {
  success: boolean;
  data?: T;
  error?: string;
  fieldErrors?: Record<string, string[]>;
}

// ─── Pagination ──────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ─── WhatsApp ────────────────────────────────────────────────────────────────

export interface WhatsAppOptions {
  number: string;
  message: string;
}
