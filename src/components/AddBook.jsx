"use client";

import React, { useState } from "react";
import { Upload, Book, User, Hash, Image, Plus, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export default function AddBook() {
  const [dragActive, setDragActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    author: "",
    isbn: "",
    description: "",
    image: null,
  });

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm({ ...form, image: e.dataTransfer.files[0] });
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setForm({ ...form, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const toastId = toast.loading("Uploading book...");

    const data = new FormData();
    data.append("name", form.name);
    data.append("author", form.author);
    data.append("isbn", form.isbn);
    data.append("description", form.description);
    data.append("image", form.image);

    try {
      const res = await fetch("/api/books", {
        method: "POST",
        body: data,
      });

      const result = await res.json();
      console.log(result);

      toast.dismiss(toastId); // Hide loading toast

      if (res.ok) {
        toast.success("Book added successfully!");
        setForm({
          name: "",
          author: "",
          isbn: "",
          description: "",
          image: null,
        });
      } else {
        toast.error(result.message || "Failed to add book.");
      }
    } catch (error) {
      toast.dismiss(toastId); // Hide loading toast on error
      toast.error("Something went wrong. Try again.");
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (!isLoading) {
      setForm({
        name: "",
        author: "",
        isbn: "",
        description: "",
        image: null,
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto w-full">
      <div>
        <div className="space-y-1 pb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-neutral-100 rounded-lg">
              <Book className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">Add New Book</h1>
          </div>
          <p className="text-slate-600">
            Fill in the details below to add a new book to your collection
          </p>
        </div>

        <div className="space-y-6 relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white/70 z-10 flex items-center justify-center rounded-lg">
              <div className="flex items-center gap-2 font-medium">
                <Loader2 className="h-4 w-4 animate-spin" />
                Adding Book...
              </div>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Book Name */}
            <div className="space-y-2">
              <label
                htmlFor="bookName"
                className="text-sm font-medium text-slate-700 flex items-center gap-2"
              >
                <Book className="h-4 w-4" />
                Book Title
              </label>
              <input
                id="bookName"
                type="text"
                placeholder="Enter the book title"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full h-11 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 disabled:bg-slate-50 disabled:text-slate-500"
                disabled={isLoading}
                required
              />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <label
                htmlFor="author"
                className="text-sm font-medium text-slate-700 flex items-center gap-2"
              >
                <User className="h-4 w-4" />
                Author
              </label>
              <input
                id="author"
                type="text"
                placeholder="Enter the author's name"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full h-11 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 disabled:bg-slate-50 disabled:text-slate-500"
                disabled={isLoading}
                required
              />
            </div>

            {/* ISBN */}
            <div className="space-y-2">
              <label
                htmlFor="isbn"
                className="text-sm font-medium text-slate-700 flex items-center gap-2"
              >
                <Hash className="h-4 w-4" />
                ISBN
              </label>
              <input
                id="isbn"
                type="text"
                placeholder="Enter the ISBN number"
                value={form.isbn}
                onChange={(e) => setForm({ ...form, isbn: e.target.value })}
                className="w-full h-11 px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 disabled:bg-slate-50 disabled:text-slate-500"
                disabled={isLoading}
                required
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="text-sm font-medium text-slate-700"
              >
                Description (Optional)
              </label>
              <textarea
                id="description"
                placeholder="Enter a brief description of the book"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="w-full min-h-[80px] px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-neutral-500 resize-none disabled:bg-slate-50 disabled:text-slate-500"
                disabled={isLoading}
              />
            </div>

            {/* Cover Image Upload */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Image className="h-4 w-4" />
                Cover Image
              </label>
              <div
                className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                  isLoading
                    ? "border-slate-200 bg-slate-50 cursor-not-allowed"
                    : dragActive
                    ? "border-neutral-500 bg-neutral-50"
                    : "border-slate-300 hover:border-slate-400"
                }`}
                onDragEnter={!isLoading ? handleDrag : undefined}
                onDragLeave={!isLoading ? handleDrag : undefined}
                onDragOver={!isLoading ? handleDrag : undefined}
                onDrop={!isLoading ? handleDrop : undefined}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                  disabled={isLoading}
                />
                <div className="text-center">
                  <Upload
                    className={`mx-auto h-8 w-8 mb-2 ${
                      isLoading ? "text-slate-300" : "text-slate-400"
                    }`}
                  />
                  {form.image ? (
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isLoading ? "text-slate-400" : "text-slate-700"
                        }`}
                      >
                        {form.image.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {isLoading
                          ? "Uploading..."
                          : "Click to change or drag a new file"}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p
                        className={`text-sm font-medium ${
                          isLoading ? "text-slate-400" : "text-slate-700"
                        }`}
                      >
                        {isLoading
                          ? "Upload disabled during submission"
                          : "Drop your cover image here, or click to browse"}
                      </p>
                      <p className="text-xs text-slate-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 h-11 px-4 py-2 border border-slate-200 rounded-md hover:bg-slate-50 transition-colors font-medium text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white"
                disabled={isLoading}
              >
                Cancel
              </button>
              <Button
                type="submit"
                className="flex-1 h-11 px-4 py-2  text-white rounded-md transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-neutral-600"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Adding Book...
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    Add Book
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
