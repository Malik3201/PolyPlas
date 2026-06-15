export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import connectDB from "@/lib/db/mongoose";
import Category from "@/lib/db/models/Category";
import { serializeDocument } from "@/lib/utils";
import CategoryForm from "@/components/admin/CategoryForm";
import type { CategoryLean } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditCategoryPage({ params }: PageProps) {
  const { id } = await params;

  await connectDB();
  const doc = await Category.findById(id).lean();
  if (!doc) notFound();

  const category = serializeDocument(doc) as CategoryLean;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/categories"
          className="p-2 rounded-xl hover:bg-stone-100 transition-colors text-stone-500 hover:text-charcoal"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-serif text-2xl text-charcoal">Edit Category</h1>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 shadow-warm p-6">
        <CategoryForm category={category} />
      </div>
    </div>
  );
}
