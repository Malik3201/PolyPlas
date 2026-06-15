"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db/mongoose";
import SiteSettings from "@/lib/db/models/SiteSettings";
import { siteSettingsSchema } from "@/lib/validations/settings";
import { serializeDocument } from "@/lib/utils";
import type { ActionResult, SiteSettingsLean } from "@/types";

export async function getSiteSettings(): Promise<SiteSettingsLean | null> {
  await connectDB();
  const existing = await SiteSettings.findOne().lean();
  if (existing) return serializeDocument<SiteSettingsLean>(existing);

  const created = await SiteSettings.create({});
  return serializeDocument<SiteSettingsLean>(created.toObject());
}

export async function updateSiteSettings(
  formData: unknown
): Promise<ActionResult<SiteSettingsLean>> {
  const parsed = siteSettingsSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await connectDB();
  const settings = await SiteSettings.findOneAndUpdate({}, parsed.data, {
    new: true,
    upsert: true,
    runValidators: true,
  });

  revalidatePath("/");
  revalidatePath("/admin/settings");

  return {
    success: true,
    data: serializeDocument(settings.toObject()) as SiteSettingsLean,
  };
}
