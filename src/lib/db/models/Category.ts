import mongoose, { Schema, Document, Model } from "mongoose";
import { generateSlug } from "@/lib/utils";

export interface ICategoryDocument extends Document {
  name: string;
  slug: string;
  icon: string;
  description: string;
  image?: {
    fileId: string;
    url: string;
  };
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategorySchema = new Schema<ICategoryDocument>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
      maxlength: [100, "Name must be under 100 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    icon: {
      type: String,
      default: "📦",
      maxlength: 10,
    },
    description: {
      type: String,
      default: "",
      maxlength: [500, "Description too long"],
    },
    image: {
      fileId: { type: String },
      url: { type: String },
    },
    sortOrder: {
      type: Number,
      default: 0,
      min: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

CategorySchema.pre("save", function (next) {
  if (!this.slug || this.isModified("name")) {
    this.slug = generateSlug(this.name);
  }
  next();
});

CategorySchema.index({ sortOrder: 1 });
CategorySchema.index({ isActive: 1 });

const Category: Model<ICategoryDocument> =
  mongoose.models.Category || mongoose.model<ICategoryDocument>("Category", CategorySchema);

export default Category;
