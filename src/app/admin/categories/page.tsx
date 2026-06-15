export const dynamic = "force-dynamic";

import Link from "next/link";
import { Plus, Edit2 } from "lucide-react";
import { getCategories } from "@/app/actions/categories";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";
import Badge from "@/components/ui/Badge";

export default async function AdminCategoriesPage() {
  const categories = await getCategories(false);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-charcoal">Categories</h1>
          <p className="text-stone-500 text-sm mt-0.5">{categories.length} total categories</p>
        </div>
        <Link href="/admin/categories/new" className="btn-primary">
          <Plus size={16} />
          Add Category
        </Link>
      </div>

      {categories.length > 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Category</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Slug</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Sort</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Status</th>
                  <th className="text-right px-4 py-3 text-stone-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {categories.map((cat) => (
                  <tr key={cat._id as string} className="hover:bg-stone-50/50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center overflow-hidden shrink-0">
                          {cat.image?.url ? (
                            <img
                              src={cat.image.url}
                              alt={cat.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-lg">{cat.icon || "📦"}</span>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-charcoal">{cat.name}</div>
                          {cat.description && (
                            <div className="text-stone-400 text-xs mt-0.5 line-clamp-1">{cat.description}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-stone-500 text-xs font-mono">{cat.slug}</td>
                    <td className="px-4 py-3 text-stone-500">{cat.sortOrder}</td>
                    <td className="px-4 py-3">
                      <Badge variant={cat.isActive ? "success" : "danger"}>
                        {cat.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/categories/${cat._id}/edit`}
                          className="p-1.5 rounded-lg text-stone-400 hover:text-charcoal hover:bg-stone-100 transition-colors"
                        >
                          <Edit2 size={15} />
                        </Link>
                        <DeleteCategoryButton
                          categoryId={cat._id as string}
                          categoryName={cat.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-warm text-center py-16">
          <p className="text-stone-400 mb-4">No categories yet</p>
          <Link href="/admin/categories/new" className="btn-primary">
            <Plus size={16} />
            Add your first category
          </Link>
        </div>
      )}
    </div>
  );
}
