import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { BookList, BookOverview } from "../components";

export const ModulePageHomepage = async () => {
  const session = await auth();

  const latestBooks: IBookDetail[] = await db
    .select()
    .from(books)
    .limit(10)
    .orderBy(books.createdAt);

  return (
    <>
      <BookOverview {...latestBooks[0]} userId={session?.user?.id as string} />
      <BookList
        title='Popular Books'
        books={latestBooks.slice(1)}
        containerClassName='mt-28'
      />
    </>
  );
};
