import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { connectToDb } from '@/lib/utils';
import { Animal } from '@/lib/models';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_secret,
});

export async function POST(request) {


  await connectToDb();

  try {
    const body = await request.json();  
    console.log('Request Body:', body); // Log request body for debugging

    // Ensure body.image is correctly formatted
    const imageBase64 = body.image; // Assuming body.image is a base64 string

    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: "animals", // Changed to 'animals' from 'image' to match your initial code
      width: 150,
      crop: "scale",
    });

    const animal = await Animal.create({
      title:body.title,
      name: body.name,
      image: {
        public_id: uploadResponse.public_id,
        url: uploadResponse.secure_url,
      },
    });

    return NextResponse.json({ success: true, data: animal }, { status: 201 });
  } catch (error) {
    console.error("Error creating animal:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
