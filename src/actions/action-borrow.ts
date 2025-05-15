"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

export const ActionBorrowBook = async ({
  bookId,
  userId,
}: IBorrowBookParams) => {
  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return {
        success: false,
        message: "Book is not available for borrowing",
      };
    }

    const dueDate = dayjs().add(7, "day").toDate().toDateString();

    const newRecord = await db.insert(borrowRecords).values({
      userId,
      bookId: bookId,
      dueDate,
      status: "BORROWED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newRecord)),
      message: "You seccesfully borrow this book",
    };
  } catch (error) {
    console.log(`sign in error: ${error}`);
    return {
      success: false,
      message: "An error occurred while borrowing the book",
    };
  }
};
