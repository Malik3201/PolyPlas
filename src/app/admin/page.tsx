export const dynamic = "force-dynamic";

import { Package, FolderOpen, Star, Eye } from "lucide-react";
import Link from "next/link";
import connectDB from "@/lib/db/mongoose";
import Product from "@/lib/db/models/Product";
import Category from "@/lib/db/models/Category";

async function getDashboardStats() {
  await connectDB();
  const [totalProducts, activeProducts, featuredProducts, totalCategories] = await Promise.all([
    Product.countDocuments(),
    Product.countDocuments({ status: "active" }),
    Product.countDocuments({ isFeatured: true }),
    Category.countDocuments({ isActive: true }),
  ]);
  return { totalProducts, activeProducts, featuredProducts, totalCategories };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      href: "/admin/products",
      color: "text-blue-600 bg-blue-50",
    },
    {
      label: "Active Products",
      value: stats.activeProducts,
      icon: Eye,
      href: "/admin/products",
      color: "text-green-600 bg-green-50",
    },
    {
      label: "Featured",
      value: stats.featuredProducts,
      icon: Star,
      href: "/admin/products",
      color: "text-amber-600 bg-amber-50",
    },
    {
      label: "Categories",
      value: stats.totalCategories,
      icon: FolderOpen,
      href: "/admin/categories",
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-serif text-2xl text-charcoal">Dashboard</h1>
        <p className="text-stone-500 text-sm mt-0.5">Overview of your store</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-white rounded-2xl p-5 border border-stone-100 shadow-warm hover:shadow-warm-lg transition-all hover:-translate-y-0.5"
          >
            <div className={`inline-flex p-2 rounded-xl mb-3 ${card.color}`}>
              <card.icon size={18} />
            </div>
            <div className="text-2xl font-bold text-charcoal font-serif">{card.value}</div>
            <div className="text-stone-500 text-xs mt-0.5">{card.label}</div>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-warm p-6">
        <h2 className="font-semibold text-charcoal mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/admin/products/new"
            className="flex items-center gap-2.5 p-4 rounded-xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50 transition-colors text-sm font-medium text-charcoal"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
              <Package size={15} className="text-blue-600" />
            </div>
            Add New Product
          </Link>
          <Link
            href="/admin/categories"
            className="flex items-center gap-2.5 p-4 rounded-xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50 transition-colors text-sm font-medium text-charcoal"
          >
            <div className="w-8 h-8 rounded-lg bg-purple-50 flex items-center justify-center">
              <FolderOpen size={15} className="text-purple-600" />
            </div>
            Manage Categories
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center gap-2.5 p-4 rounded-xl border border-stone-100 hover:border-stone-200 hover:bg-stone-50 transition-colors text-sm font-medium text-charcoal"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center">
              <Eye size={15} className="text-stone-600" />
            </div>
            Site Settings
          </Link>
        </div>
      </div>
    </div>
  );
}
