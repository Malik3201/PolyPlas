import { z } from "zod";

const productImageSchema = z.object({
  fileId: z.string().min(1, "File ID required"),
  url: z.string().url("Invalid image URL"),
  alt: z.string().default(""),
  isPrimary: z.boolean().default(false),
});

export const productSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(200, "Title must be under 200 characters"),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only")
    .optional(),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(5000, "Description too long"),
  shortDescription: z
    .string()
    .max(300, "Short description must be under 300 characters")
    .default(""),
  category: z.string().min(1, "Category is required"),
  images: z.array(productImageSchema).default([]),
  isFeatured: z.boolean().default(false),
  isCustomItem: z.boolean().default(false),
  status: z.enum(["active", "inactive", "draft"]).default("active"),
  sortOrder: z.number().int().min(0).default(0),
  tags: z.array(z.string()).default([]),
});

export const productUpdateSchema = productSchema.partial().extend({
  title: z.string().min(2).max(200),
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type ProductUpdateValues = z.infer<typeof productUpdateSchema>;
