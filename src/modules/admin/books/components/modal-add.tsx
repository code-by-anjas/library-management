"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useModal } from "@/contexts";
import { BookForm } from "./book-form";

export const ModalAddBook = () => {
  const { isOpen, toggleOpen } = useModal();

  const modalId = "modal-add-book";

  return (
    <Dialog
      open={isOpen.includes(modalId)}
      onOpenChange={() => toggleOpen(modalId)}
    >
      <DialogTrigger asChild>
        <Button className='bg-primary-admin text-light-100'>
          + Create a new book
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-xl [&>button]:hidden'>
        <DialogHeader>
          <DialogTitle>Add a new book</DialogTitle>
          <DialogDescription>
            Just a few steps to add your new book. Enter the information below.
          </DialogDescription>
        </DialogHeader>

        <BookForm modalId={modalId} />
      </DialogContent>
    </Dialog>
  );
};
