"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";

export const ActionAddBook = async (payload: IPayloadAddBook) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...payload,
        availableCopies: payload.totalCopies,
      })
      .returning();

    return {
      success: true,
      data: JSON.parse(JSON.stringify(newBook[0])),
      message: "Book has been added successfully!",
    };
  } catch (error) {
    console.log(`add books error: ${error}`);
    return {
      success: false,
      message: "An error occured while creating the book",
    };
  }
};
