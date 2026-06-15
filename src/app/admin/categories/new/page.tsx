export const dynamic = "force-dynamic";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import CategoryForm from "@/components/admin/CategoryForm";

export default function NewCategoryPage() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Link
          href="/admin/categories"
          className="p-2 rounded-xl hover:bg-stone-100 transition-colors text-stone-500 hover:text-charcoal"
        >
          <ArrowLeft size={18} />
        </Link>
        <h1 className="font-serif text-2xl text-charcoal">Add Category</h1>
      </div>
      <div className="bg-white rounded-2xl border border-stone-100 shadow-warm p-6">
        <CategoryForm />
      </div>
    </div>
  );
}
