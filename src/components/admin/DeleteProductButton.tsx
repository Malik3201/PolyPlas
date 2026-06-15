"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { deleteProduct } from "@/app/actions/products";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface Props {
  productId: string;
  productTitle: string;
}

export default function DeleteProductButton({ productId, productTitle }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm(`Delete "${productTitle}"? This action cannot be undone.`)) return;
    setLoading(true);
    const result = await deleteProduct(productId);
    if (result.success) {
      toast.success("Product deleted");
      router.refresh();
    } else {
      toast.error(result.error || "Failed to delete");
    }
    setLoading(false);
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50"
      title="Delete"
    >
      {loading ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />}
    </button>
  );
}
