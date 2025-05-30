// app/api/books/[id]/route.js
import { connectToDB } from "@/lib/mongodb";
import Book from "@/models/Book";
import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const DELETE = async (req, { params }) => {
  try {
    const { id } = params;

    await connectToDB();

    // Find the book first to get the image URL
    const book = await Book.findById(id);
    if (!book) {
      return Response.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }

    // Extract public_id from Cloudinary URL to delete the image
    if (book.image) {
      try {
        const publicId = book.image.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId);
      } catch (imageError) {
        console.warn("Failed to delete image from Cloudinary:", imageError);
        // Continue with book deletion even if image deletion fails
      }
    }

    // Delete the book from database
    await Book.findByIdAndDelete(id);

    return Response.json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
};
