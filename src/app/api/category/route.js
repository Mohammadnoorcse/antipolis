import { NextResponse } from 'next/server';
import { connectToDb } from '@/lib/utils';
import { Category } from '@/lib/models'; // Assuming you have a Category model

export async function GET(request) {
  await connectToDb();

  try {
    // Retrieve all categories from the database
    const categories = await Category.find({});

    return NextResponse.json({ success: true, data: categories }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving categories:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
