import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSettingsDocument extends Document {
  websiteName: string;
  logo?: { fileId: string; url: string };
  favicon?: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage?: { fileId: string; url: string };
  whatsappNumber: string;
  whatsappDefaultMessage: string;
  address: string;
  email: string;
  phone?: string;
  socialLinks: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  footerLinks: { label: string; href: string }[];
  metaTitle?: string;
  metaDescription?: string;
  updatedAt: Date;
}

const SiteSettingsSchema = new Schema<ISiteSettingsDocument>(
  {
    websiteName: {
      type: String,
      required: true,
      default: "Lasani Disposables",
      maxlength: 100,
    },
    logo: {
      fileId: { type: String },
      url: { type: String },
    },
    favicon: { type: String },
    heroTitle: {
      type: String,
      default: "Premium Disposable Products",
      maxlength: 200,
    },
    heroSubtitle: {
      type: String,
      default: "Quality you can trust for every occasion",
      maxlength: 500,
    },
    heroImage: {
      fileId: { type: String },
      url: { type: String },
    },
    whatsappNumber: {
      type: String,
      required: true,
      default: "+923001234567",
    },
    whatsappDefaultMessage: {
      type: String,
      default: "Hello! I would like to get a quote for your products.",
      maxlength: 500,
    },
    address: {
      type: String,
      default: "",
      maxlength: 500,
    },
    email: {
      type: String,
      default: "",
    },
    phone: { type: String },
    socialLinks: {
      facebook: { type: String },
      instagram: { type: String },
      twitter: { type: String },
      youtube: { type: String },
      linkedin: { type: String },
    },
    footerLinks: [
      {
        label: { type: String, required: true },
        href: { type: String, required: true },
        _id: false,
      },
    ],
    metaTitle: { type: String, maxlength: 70 },
    metaDescription: { type: String, maxlength: 160 },
  },
  { timestamps: true }
);

const SiteSettings: Model<ISiteSettingsDocument> =
  mongoose.models.SiteSettings ||
  mongoose.model<ISiteSettingsDocument>("SiteSettings", SiteSettingsSchema);

export default SiteSettings;
