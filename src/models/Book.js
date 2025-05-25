import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  isbn: String,
  image: String, // Cloudinary URL
});

export default mongoose.models.Book || mongoose.model("Book", BookSchema);
