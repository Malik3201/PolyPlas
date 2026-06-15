"use client";

import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { siteSettingsSchema, type SiteSettingsFormValues } from "@/lib/validations/settings";
import { updateSiteSettings } from "@/app/actions/settings";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import ImageUpload from "@/components/admin/ImageUpload";
import { Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import type { SiteSettingsLean } from "@/types";

interface SettingsFormProps {
  settings: SiteSettingsLean | null;
}

export default function SettingsForm({ settings }: SettingsFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SiteSettingsFormValues>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: settings
      ? {
          websiteName: settings.websiteName,
          logo: settings.logo,
          heroTitle: settings.heroTitle,
          heroSubtitle: settings.heroSubtitle,
          heroImage: settings.heroImage,
          whatsappNumber: settings.whatsappNumber,
          whatsappDefaultMessage: settings.whatsappDefaultMessage,
          address: settings.address || "",
          email: settings.email || "",
          phone: settings.phone || "",
          socialLinks: settings.socialLinks || {},
          footerLinks: settings.footerLinks || [],
          metaTitle: settings.metaTitle || "",
          metaDescription: settings.metaDescription || "",
        }
      : {
          websiteName: "Lasani Disposables",
          heroTitle: "Premium Disposable Products",
          heroSubtitle: "Quality you can trust for every occasion",
          whatsappNumber: "",
          whatsappDefaultMessage: "Hello! I would like to get a quote for your products.",
          address: "",
          email: "",
          phone: "",
          socialLinks: {},
          footerLinks: [],
        },
  });

  const { fields: footerFields, append: appendFooter, remove: removeFooter } = useFieldArray({
    control,
    name: "footerLinks",
  });

  async function onSubmit(data: SiteSettingsFormValues) {
    const result = await updateSiteSettings(data);
    if (result.success) {
      toast.success("Settings saved!");
    } else {
      toast.error(result.error || "Failed to save settings");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Brand */}
      <Section title="Brand">
        <Input
          label="Website Name"
          required
          error={errors.websiteName?.message}
          {...register("websiteName")}
        />
        <div>
          <label className="label-base">Logo</label>
          <Controller
            name="logo"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={(v) => field.onChange(v)}
                multiple={false}
                folder="/brand"
              />
            )}
          />
        </div>
      </Section>

      {/* Hero */}
      <Section title="Hero Section">
        <Input
          label="Hero Title"
          required
          error={errors.heroTitle?.message}
          {...register("heroTitle")}
        />
        <Textarea
          label="Hero Subtitle"
          rows={2}
          error={errors.heroSubtitle?.message}
          {...register("heroSubtitle")}
        />
        <div>
          <label className="label-base">Hero Background Image</label>
          <Controller
            name="heroImage"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={(v) => field.onChange(v)}
                multiple={false}
                folder="/hero"
              />
            )}
          />
        </div>
      </Section>

      {/* Contact */}
      <Section title="Contact & WhatsApp">
        <Input
          label="WhatsApp Number"
          required
          hint="Include country code, e.g. +923001234567"
          error={errors.whatsappNumber?.message}
          {...register("whatsappNumber")}
        />
        <Textarea
          label="Default WhatsApp Message"
          rows={2}
          hint="Sent when customers click 'Get a Quote'"
          error={errors.whatsappDefaultMessage?.message}
          {...register("whatsappDefaultMessage")}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Phone"
            error={errors.phone?.message}
            {...register("phone")}
          />
          <Input
            label="Email"
            type="email"
            error={errors.email?.message}
            {...register("email")}
          />
        </div>
        <Textarea
          label="Address"
          rows={2}
          {...register("address")}
        />
      </Section>

      {/* Social */}
      <Section title="Social Links">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(["instagram", "facebook", "youtube", "linkedin"] as const).map((key) => (
            <Input
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              placeholder={`https://${key}.com/...`}
              error={(errors.socialLinks as Record<string, { message?: string }>)?.[key]?.message}
              {...register(`socialLinks.${key}`)}
            />
          ))}
        </div>
      </Section>

      {/* SEO */}
      <Section title="SEO">
        <Input
          label="Meta Title"
          hint="Shown in browser tab and search results (max 70 chars)"
          error={errors.metaTitle?.message}
          {...register("metaTitle")}
        />
        <Textarea
          label="Meta Description"
          rows={2}
          hint="Shown in search results (max 160 chars)"
          error={errors.metaDescription?.message}
          {...register("metaDescription")}
        />
      </Section>

      {/* Footer Links */}
      <Section title="Footer Links">
        <div className="space-y-2">
          {footerFields.map((field, i) => (
            <div key={field.id} className="flex gap-2">
              <Input placeholder="Label" {...register(`footerLinks.${i}.label`)} />
              <Input placeholder="/path or https://..." {...register(`footerLinks.${i}.href`)} />
              <button
                type="button"
                onClick={() => removeFooter(i)}
                className="p-2.5 rounded-xl text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors shrink-0"
              >
                <Trash2 size={15} />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendFooter({ label: "", href: "" })}
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-charcoal transition-colors py-2"
          >
            <Plus size={15} />
            Add link
          </button>
        </div>
      </Section>

      <div className="flex justify-end">
        <Button type="submit" loading={isSubmitting}>
          Save Settings
        </Button>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-stone-100 shadow-warm">
      <h2 className="font-semibold text-charcoal mb-5">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
