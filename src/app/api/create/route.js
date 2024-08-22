import { Category } from "@/lib/models";
import { connectToDb } from "@/lib/utils";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectToDb();
  try {
    const body = await request.json();  // Correct way to access the request body
    const category = await Category.create(body);  // Create the category
    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
