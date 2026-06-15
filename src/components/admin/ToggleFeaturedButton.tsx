"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { toggleFeatured } from "@/app/actions/products";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface Props {
  productId: string;
  isFeatured: boolean;
}

export default function ToggleFeaturedButton({ productId, isFeatured }: Props) {
  const [featured, setFeatured] = useState(isFeatured);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function toggle() {
    setLoading(true);
    setFeatured(!featured);
    await toggleFeatured(productId, !featured);
    router.refresh();
    setLoading(false);
  }

  return (
    <button
      onClick={toggle}
      disabled={loading}
      className={cn(
        "p-1.5 rounded-lg transition-colors",
        featured
          ? "text-amber-500 bg-amber-50 hover:bg-amber-100"
          : "text-stone-300 hover:text-amber-400 hover:bg-amber-50"
      )}
      title={featured ? "Remove from featured" : "Mark as featured"}
    >
      <Star size={15} fill={featured ? "currentColor" : "none"} />
    </button>
  );
}
