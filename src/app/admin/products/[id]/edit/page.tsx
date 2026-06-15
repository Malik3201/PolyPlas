export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import connectDB from "@/lib/db/mongoose";
import Product from "@/lib/db/models/Product";
import { getCategories } from "@/app/actions/categories";
import { serializeDocument } from "@/lib/utils";
import ProductForm from "@/components/admin/ProductForm";
import type { ProductLean } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();
  const doc = await Product.findById(id).populate("category").lean();
  if (!doc) notFound();

  const product = serializeDocument(doc) as ProductLean;
  const categories = await getCategories(false);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/products"
          className="p-2 rounded-xl hover:bg-stone-100 transition-colors text-stone-500 hover:text-charcoal"
        >
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h1 className="font-serif text-2xl text-charcoal">Edit Product</h1>
          <p className="text-stone-500 text-sm mt-0.5 line-clamp-1">{product.title}</p>
        </div>
      </div>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}
