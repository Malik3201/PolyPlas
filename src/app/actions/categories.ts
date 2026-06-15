"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db/mongoose";
import Category from "@/lib/db/models/Category";
import { categorySchema, categoryUpdateSchema } from "@/lib/validations/category";
import { generateSlug, serializeDocument } from "@/lib/utils";
import { deleteImageKitFile } from "@/lib/imagekit";
import type { ActionResult, CategoryLean } from "@/types";

export async function getCategories(activeOnly = true): Promise<CategoryLean[]> {
  await connectDB();
  const query = activeOnly ? { isActive: true } : {};
  const docs = await Category.find(query).sort({ sortOrder: 1, name: 1 }).lean();
  return serializeDocument(docs) as CategoryLean[];
}

export async function getCategoryBySlug(slug: string): Promise<CategoryLean | null> {
  await connectDB();
  const doc = await Category.findOne({ slug, isActive: true }).lean();
  return doc ? (serializeDocument(doc) as CategoryLean) : null;
}

export async function createCategory(
  formData: unknown
): Promise<ActionResult<CategoryLean>> {
  try {
    const parsed = categorySchema.safeParse(formData);
    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    const data = parsed.data;
    if (!data.slug) data.slug = generateSlug(data.name);

    await connectDB();

    const existing = await Category.findOne({ slug: data.slug });
    if (existing) {
      return { success: false, error: "A category with this slug already exists" };
    }

    const category = await Category.create(data);
    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/admin/categories");

    return { success: true, data: serializeDocument(category.toObject()) as CategoryLean };
  } catch (error: any) {
    console.error("Error creating category:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function updateCategory(
  id: string,
  formData: unknown
): Promise<ActionResult<CategoryLean>> {
  try {
    const parsed = categoryUpdateSchema.safeParse(formData);
    if (!parsed.success) {
      return {
        success: false,
        error: "Validation failed",
        fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
      };
    }

    await connectDB();
    const category = await Category.findByIdAndUpdate(id, parsed.data, {
      new: true,
      runValidators: true,
    });

    if (!category) return { success: false, error: "Category not found" };

    revalidatePath("/");
    revalidatePath("/products");
    revalidatePath("/admin/categories");

    return { success: true, data: serializeDocument(category.toObject()) as CategoryLean };
  } catch (error: any) {
    console.error("Error updating category:", error);
    return {
      success: false,
      error: error.message || "An unexpected error occurred",
    };
  }
}

export async function deleteCategory(id: string): Promise<ActionResult> {
  await connectDB();
  const category = await Category.findById(id);
  if (!category) return { success: false, error: "Category not found" };

  if (category.image?.fileId) {
    await deleteImageKitFile(category.image.fileId).catch(() => {});
  }

  await Category.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");

  return { success: true };
}
