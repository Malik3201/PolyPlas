import Link from "next/link";
import { ArrowRight } from "lucide-react";
import CategoryCarousel from "@/components/home/CategoryCarousel";
import type { CategoryLean } from "@/types";

interface CategorySectionProps {
  categories: CategoryLean[];
}

const defaultCategories = [
  { slug: "disposable-glasses", name: "Glasses" },
  { slug: "disposable-cups", name: "Cups" },
  { slug: "disposable-plates", name: "Plates" },
  { slug: "disposable-spoons", name: "Cutlery" },
  { slug: "disposable-straws", name: "Straws" },
  { slug: "food-packaging", name: "Packaging" },
  { slug: "custom-products", name: "Custom" },
];

const defaultLabels = Object.fromEntries(
  defaultCategories.map((c) => [c.slug, c.name])
);

export default function CategorySection({ categories }: CategorySectionProps) {
  const items =
    categories.length > 0
      ? categories
      : (defaultCategories.map((c, i) => ({
          ...c,
          _id: String(i),
          description: "",
          sortOrder: i,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        })) as CategoryLean[]);

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-14">
          <div className="text-center sm:text-left w-full sm:w-auto">
            <p className="section-label justify-center sm:justify-start mb-3">Collections</p>
            <h2 className="heading-display text-3xl sm:text-4xl text-ink">
              Shop by Category
            </h2>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors group"
          >
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <CategoryCarousel items={items} defaultLabels={defaultLabels} />

        <div className="flex justify-center mt-10 sm:hidden">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600"
          >
            View All Products
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
