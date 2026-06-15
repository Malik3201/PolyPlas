"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { productSchema, type ProductFormValues } from "@/lib/validations/product";
import { createProduct, updateProduct } from "@/app/actions/products";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/admin/ImageUpload";
import { generateSlug } from "@/lib/utils";
import toast from "react-hot-toast";
import type { CategoryLean, ProductLean } from "@/types";

interface ProductFormProps {
  product?: ProductLean;
  categories: CategoryLean[];
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const isEdit = !!product;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: product
      ? {
          title: product.title,
          slug: product.slug,
          description: product.description,
          shortDescription: product.shortDescription || "",
          category: typeof product.category === "object"
            ? (product.category._id as string)
            : (product.category as string),
          images: product.images,
          isFeatured: product.isFeatured,
          isCustomItem: product.isCustomItem,
          status: product.status,
          sortOrder: product.sortOrder,
          tags: product.tags,
        }
      : {
          images: [],
          isFeatured: false,
          isCustomItem: false,
          status: "active",
          sortOrder: 0,
          tags: [],
        },
  });

  async function onSubmit(data: ProductFormValues) {
    const result = isEdit
      ? await updateProduct(product._id as string, data)
      : await createProduct(data);

    if (result.success) {
      toast.success(isEdit ? "Product updated!" : "Product created!");
      router.push("/admin/products");
    } else {
      toast.error(result.error || "Something went wrong");
    }
  }

  const categoryOptions = categories.map((c) => ({
    value: c._id as string,
    label: c.name,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Basic Info */}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-warm">
        <h2 className="font-semibold text-charcoal mb-5">Basic Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Title"
              required
              error={errors.title?.message}
              {...register("title", {
                onChange: (e) => {
                  if (!isEdit) setValue("slug", generateSlug(e.target.value));
                },
              })}
            />
            <Input
              label="Slug"
              hint="Auto-generated from title"
              error={errors.slug?.message}
              {...register("slug")}
            />
          </div>

          <Select
            label="Category"
            required
            options={categoryOptions}
            placeholder="Select a category"
            error={errors.category?.message}
            {...register("category")}
          />

          <Textarea
            label="Short Description"
            rows={2}
            hint="Brief summary shown on product cards (max 300 chars)"
            error={errors.shortDescription?.message}
            {...register("shortDescription")}
          />

          <Textarea
            label="Full Description"
            required
            rows={5}
            error={errors.description?.message}
            {...register("description")}
          />
        </div>
      </div>

      {/* Images */}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-warm">
        <h2 className="font-semibold text-charcoal mb-2">Product Images</h2>
        <p className="text-stone-500 text-sm mb-4">Upload one or more images. Click ☆ to set the primary image.</p>
        <Controller
          name="images"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={(v) => field.onChange(v || [])}
              multiple
              folder="/products"
            />
          )}
        />
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-warm">
        <h2 className="font-semibold text-charcoal mb-5">Settings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            label="Status"
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
              { value: "draft", label: "Draft" },
            ]}
            error={errors.status?.message}
            {...register("status")}
          />

          <Input
            label="Sort Order"
            type="number"
            hint="Lower = shown first"
            {...register("sortOrder", { valueAsNumber: true })}
          />

          <div className="space-y-3 pt-6">
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-stone-300 text-charcoal"
                {...register("isFeatured")}
              />
              <span className="text-sm font-medium text-charcoal">Featured product</span>
            </label>
            <label className="flex items-center gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-stone-300 text-charcoal"
                {...register("isCustomItem")}
              />
              <span className="text-sm font-medium text-charcoal">Custom item available</span>
            </label>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isEdit ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
