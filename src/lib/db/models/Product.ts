import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { generateSlug } from "@/lib/utils";

export interface IProductImage {
  fileId: string;
  url: string;
  alt: string;
  isPrimary: boolean;
}

export interface IProductDocument extends Document {
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: Types.ObjectId;
  images: IProductImage[];
  isFeatured: boolean;
  isCustomItem: boolean;
  status: "active" | "inactive" | "draft";
  sortOrder: number;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProductImageSchema = new Schema<IProductImage>(
  {
    fileId: { type: String, required: true },
    url: { type: String, required: true },
    alt: { type: String, default: "" },
    isPrimary: { type: Boolean, default: false },
  },
  { _id: false }
);

const ProductSchema = new Schema<IProductDocument>(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
      maxlength: [200, "Title must be under 200 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [5000, "Description too long"],
    },
    shortDescription: {
      type: String,
      default: "",
      maxlength: [300, "Short description too long"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },
    images: {
      type: [ProductImageSchema],
      default: [],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isCustomItem: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "draft"],
      default: "active",
    },
    sortOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

ProductSchema.pre("save", async function (next) {
  if (!this.slug || this.isModified("title")) {
    const baseSlug = generateSlug(this.title);
    let slug = baseSlug;
    let counter = 1;

    while (
      await mongoose.models.Product?.findOne({ slug, _id: { $ne: this._id } })
    ) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
  }
  next();
});

ProductSchema.index({ category: 1, status: 1 });
ProductSchema.index({ isFeatured: 1, status: 1 });
ProductSchema.index({ sortOrder: 1 });
ProductSchema.index({ status: 1 });
ProductSchema.index({ tags: 1 });

const Product: Model<IProductDocument> =
  mongoose.models.Product || mongoose.model<IProductDocument>("Product", ProductSchema);

export default Product;
