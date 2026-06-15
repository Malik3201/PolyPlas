export const dynamic = "force-dynamic";

import Link from "next/link";
import { Plus, Edit2, Eye } from "lucide-react";
import connectDB from "@/lib/db/mongoose";
import Product from "@/lib/db/models/Product";
import { serializeDocument } from "@/lib/utils";
import DeleteProductButton from "@/components/admin/DeleteProductButton";
import ToggleFeaturedButton from "@/components/admin/ToggleFeaturedButton";
import Badge from "@/components/ui/Badge";
import type { ProductLean, CategoryLean } from "@/types";

async function getAdminProducts(): Promise<ProductLean[]> {
  await connectDB();
  const docs = await Product.find()
    .populate("category")
    .sort({ createdAt: -1 })
    .lean();
  return serializeDocument(docs) as ProductLean[];
}

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl text-charcoal">Products</h1>
          <p className="text-stone-500 text-sm mt-0.5">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          <Plus size={16} />
          Add Product
        </Link>
      </div>

      {/* Table */}
      {products.length > 0 ? (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-warm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-stone-50 border-b border-stone-100">
                <tr>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium w-16">Image</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Product</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Category</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-stone-500 font-medium">Featured</th>
                  <th className="text-right px-4 py-3 text-stone-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-50">
                {products.map((product) => {
                  const primaryImg = product.images.find((i) => i.isPrimary) || product.images[0];
                  const category = product.category as CategoryLean;
                  return (
                    <tr key={product._id as string} className="hover:bg-stone-50/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="w-10 h-10 rounded-xl overflow-hidden bg-stone-100 shrink-0">
                          {primaryImg ? (
                            <img
                              src={primaryImg.url}
                              alt={product.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-stone-300">
                              📦
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-charcoal line-clamp-1">{product.title}</div>
                        <div className="text-stone-400 text-xs mt-0.5">/{product.slug}</div>
                      </td>
                      <td className="px-4 py-3">
                        {category && typeof category === "object" ? (
                          <span className="badge-category inline-flex items-center gap-1.5">
                            <span className="w-4 h-4 flex items-center justify-center overflow-hidden rounded-sm shrink-0">
                              {category.image?.url ? (
                                <img
                                  src={category.image.url}
                                  alt={category.name}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                category.icon || "📦"
                              )}
                            </span>
                            {category.name}
                          </span>
                        ) : (
                          <span className="text-stone-400 text-xs">Uncategorized</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            product.status === "active"
                              ? "success"
                              : product.status === "draft"
                              ? "warning"
                              : "danger"
                          }
                        >
                          {product.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <ToggleFeaturedButton
                          productId={product._id as string}
                          isFeatured={product.isFeatured}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${product.slug}`}
                            target="_blank"
                            className="p-1.5 rounded-lg text-stone-400 hover:text-charcoal hover:bg-stone-100 transition-colors"
                            title="View"
                          >
                            <Eye size={15} />
                          </Link>
                          <Link
                            href={`/admin/products/${product._id}/edit`}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-charcoal hover:bg-stone-100 transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={15} />
                          </Link>
                          <DeleteProductButton
                            productId={product._id as string}
                            productTitle={product.title}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-stone-100 shadow-warm text-center py-16">
          <p className="text-stone-400 mb-4">No products yet</p>
          <Link href="/admin/products/new" className="btn-primary">
            <Plus size={16} />
            Add your first product
          </Link>
        </div>
      )}
    </div>
  );
}
