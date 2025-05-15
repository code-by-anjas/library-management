import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { BookList } from "@/modules/homepage/components";
import { eq, inArray } from "drizzle-orm";

export const ModulePageMyProfile = async () => {
  const session = await auth();

  if (!session?.user?.id) return null;

  const borrowedBook = await db
    .select()
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, session.user?.id));

  const borrowedBookIds = borrowedBook.map((record) => record.bookId);

  const latestBooks = await db
    .select()
    .from(books)
    .where(inArray(books.id, borrowedBookIds))
    .limit(10)
    .orderBy(books.createdAt);

  return (
    <>
      <BookList title='Borrowed Books' books={latestBooks} />
    </>
  );
};
