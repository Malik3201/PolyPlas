"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage, SimpleImage } from "@/types";
import toast from "react-hot-toast";

interface ImageUploadProps {
  value?: ProductImage[] | SimpleImage;
  onChange: (value: ProductImage[] | SimpleImage | undefined) => void;
  multiple?: boolean;
  folder?: string;
  className?: string;
}

interface IKAuthParams {
  token: string;
  expire: number;
  signature: string;
}

async function getAuthParams(): Promise<IKAuthParams> {
  const res = await fetch("/api/imagekit/auth");
  if (!res.ok) throw new Error("Failed to get upload auth");
  return res.json();
}

async function uploadToImageKit(
  file: File,
  folder: string,
  auth: IKAuthParams
): Promise<{ fileId: string; url: string }> {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("fileName", `${Date.now()}-${file.name}`);
  formData.append("folder", folder);
  formData.append("publicKey", process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!);
  formData.append("signature", auth.signature);
  formData.append("expire", String(auth.expire));
  formData.append("token", auth.token);

  const uploadUrl = `https://upload.imagekit.io/api/v1/files/upload`;

  const res = await fetch(uploadUrl, { method: "POST", body: formData });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Upload failed");
  }
  const data = await res.json();
  return { fileId: data.fileId, url: data.url };
}

export default function ImageUpload({
  value,
  onChange,
  multiple = false,
  folder = "/products",
  className,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const images = multiple
    ? (value as ProductImage[] | undefined) || []
    : value
    ? [{ ...(value as SimpleImage), alt: "", isPrimary: true }]
    : [];

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);

    try {
      const auth = await getAuthParams();
      const uploads = await Promise.all(
        Array.from(files).map((f) => uploadToImageKit(f, folder, auth))
      );

      if (multiple) {
        const current = (value as ProductImage[]) || [];
        const newImages: ProductImage[] = uploads.map((u, i) => ({
          fileId: u.fileId,
          url: u.url,
          alt: "",
          isPrimary: current.length === 0 && i === 0,
        }));
        onChange([...current, ...newImages]);
      } else {
        onChange({ fileId: uploads[0].fileId, url: uploads[0].url });
      }
      toast.success(`${uploads.length} image${uploads.length > 1 ? "s" : ""} uploaded`);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  function removeImage(index: number) {
    if (multiple) {
      const current = (value as ProductImage[]) || [];
      const updated = current.filter((_, i) => i !== index);
      if (updated.length > 0 && !updated.some((img) => img.isPrimary)) {
        updated[0].isPrimary = true;
      }
      onChange(updated.length > 0 ? updated : undefined);
    } else {
      onChange(undefined);
    }
  }

  function setPrimary(index: number) {
    if (!multiple) return;
    const current = (value as ProductImage[]) || [];
    const updated = current.map((img, i) => ({ ...img, isPrimary: i === index }));
    onChange(updated);
  }

  return (
    <div className={cn("space-y-3", className)}>
      {/* Upload zone */}
      <div
        onClick={() => !uploading && fileRef.current?.click()}
        className={cn(
          "border-2 border-dashed border-stone-200 rounded-xl p-6 text-center cursor-pointer",
          "hover:border-stone-400 hover:bg-stone-50 transition-all",
          uploading && "opacity-50 cursor-wait"
        )}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={22} className="animate-spin text-stone-400" />
            <span className="text-sm text-stone-500">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload size={22} className="text-stone-400" />
            <span className="text-sm font-medium text-stone-600">Click to upload</span>
            <span className="text-xs text-stone-400">PNG, JPG, WEBP up to 10MB</span>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* Preview */}
      {images.length > 0 && (
        <div className={cn("grid gap-2", multiple ? "grid-cols-3 sm:grid-cols-4" : "grid-cols-2")}>
          {images.map((img, i) => (
            <div key={i} className="relative group aspect-square rounded-xl overflow-hidden bg-stone-100">
              <img
                src={img.url}
                alt={img.alt || "Uploaded image"}
                className="w-full h-full object-cover"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
                {multiple && (
                  <button
                    type="button"
                    onClick={() => setPrimary(i)}
                    className={cn(
                      "p-1.5 rounded-lg text-xs font-medium transition-colors",
                      (img as ProductImage).isPrimary
                        ? "bg-amber-400 text-amber-900"
                        : "bg-white/20 text-white hover:bg-white/30"
                    )}
                    title={`${(img as ProductImage).isPrimary ? "Primary" : "Set as primary"}`}
                  >
                    {(img as ProductImage).isPrimary ? "★" : "☆"}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
              {multiple && (img as ProductImage).isPrimary && (
                <div className="absolute bottom-1 left-1 px-1.5 py-0.5 bg-amber-400 text-amber-900 text-2xs rounded-md font-medium text-[10px]">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
