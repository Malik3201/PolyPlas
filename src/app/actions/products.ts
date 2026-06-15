"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/lib/db/mongoose";
import Product from "@/lib/db/models/Product";
import { productSchema, productUpdateSchema } from "@/lib/validations/product";
import { generateSlug, serializeDocument } from "@/lib/utils";
import { deleteImageKitFiles } from "@/lib/imagekit";
import type { ActionResult, ProductLean, PaginatedResult } from "@/types";

interface GetProductsOptions {
  category?: string;
  status?: string;
  featured?: boolean;
  page?: number;
  pageSize?: number;
  search?: string;
}

export async function getProducts(
  options: GetProductsOptions = {}
): Promise<PaginatedResult<ProductLean>> {
  await connectDB();
  const { category, status = "active", featured, page = 1, pageSize = 12, search } = options;

  const query: Record<string, unknown> = {};
  if (status !== "all") query.status = status;
  if (category) query.category = category;
  if (featured !== undefined) query.isFeatured = featured;
  if (search) query.title = { $regex: search, $options: "i" };

  const skip = (page - 1) * pageSize;
  const [docs, total] = await Promise.all([
    Product.find(query)
      .populate("category")
      .sort({ sortOrder: 1, createdAt: -1 })
      .skip(skip)
      .limit(pageSize)
      .lean(),
    Product.countDocuments(query),
  ]);

  return {
    items: serializeDocument(docs) as ProductLean[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

export async function getFeaturedProducts(limit = 6): Promise<ProductLean[]> {
  await connectDB();
  const docs = await Product.find({ status: "active", isFeatured: true })
    .populate("category")
    .sort({ sortOrder: 1, createdAt: -1 })
    .limit(limit)
    .lean();
  return serializeDocument(docs) as ProductLean[];
}

export async function getProductBySlug(slug: string): Promise<ProductLean | null> {
  await connectDB();
  const doc = await Product.findOne({ slug, status: "active" })
    .populate("category")
    .lean();
  return doc ? (serializeDocument(doc) as ProductLean) : null;
}

export async function getRelatedProducts(
  productId: string,
  categoryId: string,
  limit = 4
): Promise<ProductLean[]> {
  await connectDB();
  const docs = await Product.find({
    _id: { $ne: productId },
    category: categoryId,
    status: "active",
  })
    .populate("category")
    .sort({ sortOrder: 1 })
    .limit(limit)
    .lean();
  return serializeDocument(docs) as ProductLean[];
}

export async function getProductsByCategorySlug(
  slug: string,
  page = 1,
  pageSize = 12
): Promise<PaginatedResult<ProductLean>> {
  await connectDB();
  const { default: Category } = await import("@/lib/db/models/Category");
  const category = await Category.findOne({ slug });
  if (!category) return { items: [], total: 0, page, pageSize, totalPages: 0 };

  return getProducts({ category: String(category._id), page, pageSize });
}

export async function createProduct(
  formData: unknown
): Promise<ActionResult<ProductLean>> {
  const parsed = productSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const data = parsed.data;
  if (!data.slug) data.slug = generateSlug(data.title);

  await connectDB();
  const product = await Product.create(data);
  await product.populate("category");

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");

  return { success: true, data: serializeDocument(product.toObject()) as ProductLean };
}

export async function updateProduct(
  id: string,
  formData: unknown
): Promise<ActionResult<ProductLean>> {
  const parsed = productUpdateSchema.safeParse(formData);
  if (!parsed.success) {
    return {
      success: false,
      error: "Validation failed",
      fieldErrors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  await connectDB();
  const product = await Product.findByIdAndUpdate(id, parsed.data, {
    new: true,
    runValidators: true,
  }).populate("category");

  if (!product) return { success: false, error: "Product not found" };

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath(`/products/${product.slug}`);
  revalidatePath("/admin/products");

  return { success: true, data: serializeDocument(product.toObject()) as ProductLean };
}

export async function deleteProduct(id: string): Promise<ActionResult> {
  await connectDB();
  const product = await Product.findById(id);
  if (!product) return { success: false, error: "Product not found" };

  const fileIds = product.images.map((img) => img.fileId).filter(Boolean);
  if (fileIds.length) await deleteImageKitFiles(fileIds).catch(() => {});

  await Product.findByIdAndDelete(id);
  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");

  return { success: true };
}

export async function toggleFeatured(
  id: string,
  isFeatured: boolean
): Promise<ActionResult> {
  await connectDB();
  await Product.findByIdAndUpdate(id, { isFeatured });
  revalidatePath("/");
  revalidatePath("/admin/products");
  return { success: true };
}
