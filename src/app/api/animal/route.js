import { NextResponse } from 'next/server';
import { connectToDb } from '@/lib/utils';
import { Animal } from '@/lib/models';

export async function GET(request) {
  await connectToDb();

  try {
    // Retrieve all animals from the database
    const animals = await Animal.find({});

    return NextResponse.json({ success: true, data: animals }, { status: 200 });
  } catch (error) {
    console.error("Error retrieving animals:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
