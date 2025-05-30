import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { connectToDB } from "@/lib/mongodb";
import Book from "@/models/Book";

export const revalidate = 0; // Disable cache for this page

async function getBooks() {
  try {
    await connectToDB();
    const books = await Book.find({}).lean();

    // Convert MongoDB objects to plain objects
    const serializedBooks = books.map((book) => ({
      id: book._id.toString(), // Convert ObjectId to string
      name: book.name,
      author: book.author,
      isbn: book.isbn,
      image: book.image,
      createdAt: book.createdAt ? book.createdAt.toISOString() : null, // Convert Date to string
      updatedAt: book.updatedAt ? book.updatedAt.toISOString() : null, // Convert Date to string
      // Remove __v and _id since we're using 'id' instead
    }));

    return serializedBooks;
  } catch (error) {
    console.error("Failed to fetch books:", error);
    return [];
  }
}

export default async function DashboardPage() {
  const books = await getBooks();

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards booksData={books} />
      <DataTable data={books} />
    </div>
  );
}
