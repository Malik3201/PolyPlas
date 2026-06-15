import { z } from "zod";

const simpleImageSchema = z.object({
  fileId: z.string().min(1),
  url: z.string().url(),
});

const footerLinkSchema = z.object({
  label: z.string().min(1, "Label required"),
  href: z.string().min(1, "Link required"),
});

const socialLinksSchema = z.object({
  facebook: z.string().url("Invalid URL").optional().or(z.literal("")),
  instagram: z.string().url("Invalid URL").optional().or(z.literal("")),
  twitter: z.string().url("Invalid URL").optional().or(z.literal("")),
  youtube: z.string().url("Invalid URL").optional().or(z.literal("")),
  linkedin: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export const siteSettingsSchema = z.object({
  websiteName: z
    .string()
    .min(1, "Website name required")
    .max(100, "Website name too long"),
  logo: simpleImageSchema.optional(),
  heroTitle: z
    .string()
    .min(1, "Hero title required")
    .max(200, "Hero title too long"),
  heroSubtitle: z
    .string()
    .max(500, "Hero subtitle too long")
    .default(""),
  heroImage: simpleImageSchema.optional(),
  whatsappNumber: z
    .string()
    .min(7, "WhatsApp number too short")
    .max(20, "WhatsApp number too long")
    .regex(/^\+?[0-9\s-]+$/, "Invalid phone number format"),
  whatsappDefaultMessage: z
    .string()
    .max(500, "Message too long")
    .default("Hello! I would like to get a quote for your products."),
  address: z.string().max(500, "Address too long").default(""),
  email: z
    .string()
    .email("Invalid email address")
    .max(200)
    .or(z.literal("")),
  phone: z.string().max(20).optional().or(z.literal("")),
  socialLinks: socialLinksSchema.default({}),
  footerLinks: z.array(footerLinkSchema).default([]),
  metaTitle: z.string().max(70, "Meta title too long (max 70 chars)").optional(),
  metaDescription: z.string().max(160, "Meta description too long (max 160 chars)").optional(),
});

export type SiteSettingsFormValues = z.infer<typeof siteSettingsSchema>;
