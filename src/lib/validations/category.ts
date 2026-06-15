import { z } from "zod";

const simpleImageSchema = z.object({
  fileId: z.string().min(1, "Image is required"),
  url: z.string().url("Invalid image URL"),
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, and hyphens only")
    .optional(),
  icon: z.string().max(10, "Icon too long").default("📦"),
  description: z.string().max(500, "Description too long").default(""),
  image: simpleImageSchema,
  sortOrder: z.number().int().min(0).default(0),
  isActive: z.boolean().default(true),
});

export const categoryUpdateSchema = categorySchema.partial().extend({
  name: z.string().min(2).max(100),
  image: simpleImageSchema,
});

export type CategoryFormValues = z.infer<typeof categorySchema>;
export type CategoryUpdateValues = z.infer<typeof categoryUpdateSchema>;
