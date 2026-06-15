import { NextResponse } from "next/server";
import { getCategories } from "@/app/actions/categories";

export async function GET() {
  try {
    const categories = await getCategories(true);
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}
