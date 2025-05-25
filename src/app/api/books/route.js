import { connectToDB } from "@/lib/mongodb";
import Book from "@/models/Book";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    // Get form data (works with Next.js App Router)
    const formData = await req.formData();

    const name = formData.get("name");
    const author = formData.get("author");
    const isbn = formData.get("isbn");
    const file = formData.get("image");

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary
    const uploadRes = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ resource_type: "image" }, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        })
        .end(buffer);
    });

    // Save book to MongoDB
    await connectToDB();
    const newBook = await Book.create({
      name,
      author,
      isbn,
      image: uploadRes.secure_url,
    });

    return Response.json({ success: true, book: newBook });
  } catch (err) {
    console.error("Error uploading book:", err);
    return Response.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
};
