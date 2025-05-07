import { SAMPLE_BOOKS } from "@/constants";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { BookList, BookOverview } from "../components";

export const ModulPageHomepage = async () => {
  const result = await db.select().from(users);
  console.log(JSON.stringify(result, null, 2));

  return (
    <>
      <BookOverview {...SAMPLE_BOOKS[0]} /> {/* hero section */}
      <BookList
        title='Popular Books'
        books={SAMPLE_BOOKS}
        containerClassName='mt-28'
      />
    </>
  );
};
