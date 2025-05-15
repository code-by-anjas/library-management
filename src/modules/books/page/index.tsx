import { auth } from "@/auth";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { BookOverview } from "@/modules/homepage/components";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { BooksVideo } from "../components";

export const ModulePageBooks = async ({ id }: { id: string }) => {
  const session = await auth();

  const [booksDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!booksDetails) redirect("/404");

  return (
    <>
      <BookOverview {...booksDetails} userId={session?.user?.id as string} />
      <div className='book-details'>
        <div className='flex-[1.5]'>
          <section className='flex flex-col gap-7'>
            <h3>VIDEO</h3>
            <BooksVideo videoUrl={booksDetails.videoUrl} />
          </section>

          <section className='mt-10 flex flex-col gap-7'>
            <h3>SUMMARY</h3>
            <div className='space-y-5 text-xl text-light-100'>
              {booksDetails.summary.split("\n").map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </section>
        </div>

        {/* similars */}
      </div>
    </>
  );
};
