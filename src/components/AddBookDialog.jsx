// components/AddBookDialog.jsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Book, Plus } from "lucide-react";
import AddBook from "./AddBook";

export default function AddBookDialog() {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="bg-neutral-950 text-white cursor-pointer rounded-md px-3 py-2 text-sm font-medium shadow-sm hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neutral-500 w-fit flex items-center gap-2">
        <Plus /> Add Book
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 font-semibold text-lg">
            <Book /> Add Book
          </DialogTitle>
          <DialogDescription>
            Fill in the details to add a new book.
          </DialogDescription>
        </DialogHeader>
        <AddBook onClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
