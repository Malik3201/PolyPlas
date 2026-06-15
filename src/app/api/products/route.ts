import { NextRequest, NextResponse } from "next/server";
import { getProducts } from "@/app/actions/products";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || undefined;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "12");
    const search = searchParams.get("search") || undefined;

    const result = await getProducts({ category, page, pageSize, search, status: "active" });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}
