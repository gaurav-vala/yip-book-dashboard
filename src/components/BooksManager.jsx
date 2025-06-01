// src/components/BooksManager.tsx
"use client";

import { useEffect, useState } from "react";
import AddBookDialog from "@/components/AddBookDialog";
import { SectionCards } from "./section-cards";
import { DataTable } from "./data-table";

export default function BooksManager() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    setLoading(true);
    const res = await fetch("/api/books");
    const data = await res.json();
    setBooks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <SectionCards booksData={books} />
      <div className="px-4 lg:px-6">
        <AddBookDialog onSuccess={fetchBooks} />
      </div>
      <DataTable booksData={books} onDelete={fetchBooks} />
    </div>
  );
}
