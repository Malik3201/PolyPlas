"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { categorySchema, type CategoryFormValues } from "@/lib/validations/category";
import { createCategory, updateCategory } from "@/app/actions/categories";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/admin/ImageUpload";
import { generateSlug } from "@/lib/utils";
import toast from "react-hot-toast";
import type { CategoryLean } from "@/types";

interface CategoryFormProps {
  category?: CategoryLean;
  onSuccess?: () => void;
}

export default function CategoryForm({ category, onSuccess }: CategoryFormProps) {
  const router = useRouter();
  const isEdit = !!category;

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: category
      ? {
          name: category.name,
          slug: category.slug,
          icon: category.icon,
          description: category.description,
          image: category.image,
          sortOrder: category.sortOrder,
          isActive: category.isActive,
        }
      : {
          icon: "📦",
          sortOrder: 0,
          isActive: true,
        },
  });

  async function onSubmit(data: CategoryFormValues) {
    try {
      const result = isEdit
        ? await updateCategory(category._id as string, data)
        : await createCategory(data);

      if (!result) {
        toast.error("No response received from the server");
        return;
      }

      if (result.success) {
        toast.success(isEdit ? "Category updated!" : "Category created!");
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/admin/categories");
          router.refresh();
        }
      } else {
        toast.error(result.error || "Something went wrong");
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err.message || "An unexpected error occurred");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <Input
        label="Category Name"
        required
        error={errors.name?.message}
        {...register("name", {
          onChange: (e) => {
            if (!isEdit) setValue("slug", generateSlug(e.target.value));
          },
        })}
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Slug"
          hint="URL-friendly identifier"
          error={errors.slug?.message}
          {...register("slug")}
        />
        <Input
          label="Sort Order"
          type="number"
          hint="Lower = shown first"
          {...register("sortOrder", { valueAsNumber: true })}
        />
      </div>

      <Textarea
        label="Description"
        rows={3}
        error={errors.description?.message}
        {...register("description")}
      />

      <div>
        <label className="label-base flex items-center gap-1">
          Category Image <span className="text-red-500">*</span>
        </label>
        <Controller
          name="image"
          control={control}
          render={({ field }) => (
            <ImageUpload
              value={field.value}
              onChange={(v) => field.onChange(v)}
              multiple={false}
              folder="/categories"
            />
          )}
        />
        {errors.image && (
          <p className="mt-1.5 text-xs text-red-500 font-medium">
            {errors.image.message || "Category image is required"}
          </p>
        )}
      </div>

      <label className="flex items-center gap-2.5 cursor-pointer">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-stone-300"
          {...register("isActive")}
        />
        <span className="text-sm font-medium text-charcoal">Active (visible on site)</span>
      </label>

      <div className="flex gap-3">
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button type="submit" loading={isSubmitting}>
          {isEdit ? "Update Category" : "Create Category"}
        </Button>
      </div>
    </form>
  );
}
