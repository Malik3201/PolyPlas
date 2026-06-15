export const dynamic = "force-dynamic";

import { getCategories } from "@/app/actions/categories";
import ProductForm from "@/components/admin/ProductForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function NewProductPage() {
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
          <h1 className="font-serif text-2xl text-charcoal">Add New Product</h1>
          <p className="text-stone-500 text-sm mt-0.5">Fill in the details below</p>
        </div>
      </div>
      <ProductForm categories={categories} />
    </div>
  );
}
