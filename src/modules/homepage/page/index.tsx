import { SAMPLE_BOOKS } from "@/constants";
import { BookList, BookOverview } from "../components";

export const ModulPageHomepage = async () => {
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
